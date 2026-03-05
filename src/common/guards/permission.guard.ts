import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { ROLE_PERMISSIONS } from "../../core/auth/better-auth";
import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";

// ─── Types ────────────────────────────────────────────────────────────────────

interface JwtPayload {
    id: string;
    email: string;
    role: string | null;
}

// ─── Remote JWKS (cached by jose automatically) ───────────────────────────────
const BETTER_AUTH_URL = (process.env.BETTER_AUTH_URL && process.env.BETTER_AUTH_URL !== '')
    ? process.env.BETTER_AUTH_URL
    : "http://localhost:3000";

// Ensure URL doesn't have double slashes if BETTER_AUTH_URL ends with /
const jwksUrl = new URL('/api/auth/jwks', BETTER_AUTH_URL.endsWith('/') ? BETTER_AUTH_URL : `${BETTER_AUTH_URL}/`);

const JWKS = createRemoteJWKSet(jwksUrl);

// ─── Guard ─────────────────────────────────────────────────────────────────────

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredPermission = this.reflector.getAllAndOverride<{
            resource: string;
            action: string;
        }>(PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);

        if (!requiredPermission) return true;

        const request = context.switchToHttp().getRequest<{
            headers: Record<string, string | string[] | undefined>;
            user?: JwtPayload;
        }>();

        // ── 1. Extract Bearer token ───────────────────────────────────────────────
        const authHeader = request.headers["authorization"];
        const rawHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;
        const token = rawHeader?.startsWith("Bearer ")
            ? rawHeader.slice(7)
            : undefined;

        if (!token) {
            throw new UnauthorizedException("Bearer token missing");
        }

        // ── 2. Verify token against remote JWKS ──────────────────────────────────
        let payload: JwtPayload;
        try {
            const { payload: raw } = await jwtVerify(token, JWKS, {
                issuer: BETTER_AUTH_URL,
                audience: BETTER_AUTH_URL,
            });
            payload = raw as unknown as JwtPayload;
        } catch {
            throw new UnauthorizedException("Invalid or expired JWT");
        }

        if (!payload.role) {
            throw new ForbiddenException("User has no role assigned");
        }

        // ── 3. Check permission map ───────────────────────────────────────────────
        const userRole = payload.role.toUpperCase();
        const roleConfig = ROLE_PERMISSIONS[userRole] ?? {};

        const hasWildcard = roleConfig["*"]?.includes("*");
        const hasExplicit = roleConfig[requiredPermission.resource]?.includes(
            requiredPermission.action
        );

        if (!hasWildcard && !hasExplicit) {
            throw new ForbiddenException(
                `Role '${userRole}' cannot perform '${requiredPermission.action}' on '${requiredPermission.resource}'`
            );
        }

        // ── 4. Attach decoded payload for use in controllers ─────────────────────
        request.user = payload;

        return true;
    }
}
