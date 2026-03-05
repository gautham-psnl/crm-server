"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jose_1 = require("jose");
const better_auth_1 = require("../../core/auth/better-auth");
const permissions_decorator_1 = require("../decorators/permissions.decorator");
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
const JWKS = (0, jose_1.createRemoteJWKSet)(new URL(`${BETTER_AUTH_URL}/api/auth/jwks`));
let PermissionGuard = class PermissionGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const requiredPermission = this.reflector.getAllAndOverride(permissions_decorator_1.PERMISSIONS_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredPermission)
            return true;
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers["authorization"];
        const rawHeader = Array.isArray(authHeader) ? authHeader[0] : authHeader;
        const token = rawHeader?.startsWith("Bearer ")
            ? rawHeader.slice(7)
            : undefined;
        if (!token) {
            throw new common_1.UnauthorizedException("Bearer token missing");
        }
        let payload;
        try {
            const { payload: raw } = await (0, jose_1.jwtVerify)(token, JWKS, {
                issuer: BETTER_AUTH_URL,
                audience: BETTER_AUTH_URL,
            });
            payload = raw;
        }
        catch {
            throw new common_1.UnauthorizedException("Invalid or expired JWT");
        }
        if (!payload.role) {
            throw new common_1.ForbiddenException("User has no role assigned");
        }
        const userRole = payload.role.toUpperCase();
        const roleConfig = better_auth_1.ROLE_PERMISSIONS[userRole] ?? {};
        const hasWildcard = roleConfig["*"]?.includes("*");
        const hasExplicit = roleConfig[requiredPermission.resource]?.includes(requiredPermission.action);
        if (!hasWildcard && !hasExplicit) {
            throw new common_1.ForbiddenException(`Role '${userRole}' cannot perform '${requiredPermission.action}' on '${requiredPermission.resource}'`);
        }
        request.user = payload;
        return true;
    }
};
exports.PermissionGuard = PermissionGuard;
exports.PermissionGuard = PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionGuard);
//# sourceMappingURL=permission.guard.js.map