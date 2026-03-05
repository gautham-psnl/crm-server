import { betterAuth } from "better-auth";
import { admin, jwt, bearer } from "better-auth/plugins";
import { Pool } from "pg";

// ─── Role → Permission mapping (used by PermissionGuard) ─────────────────────
export const ROLE_PERMISSIONS: Record<string, Record<string, string[]>> = {
    SALES: {
        enquiry: ["create", "read", "update"],
        deal: ["create", "read", "update"],
        itinerary: ["create", "read"],
        quotation: ["read"],
    },
    FINANCE: {
        invoice: ["create", "read", "update", "delete"],
        payment: ["create", "read"],
    },
    OPS: {
        itinerary: ["create", "read", "update"],
        quotation: ["create", "read", "update"],
    },
    ADMIN: {
        "*": ["*"],
    },
};

// ─── Better Auth instance ─────────────────────────────────────────────────────
export const auth = betterAuth({
    database: new Pool({
        connectionString: process.env.DATABASE_URL,
    }),

    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",

    trustedOrigins: [process.env.FRONTEND_URL ?? "http://localhost:3001"],

    emailAndPassword: {
        enabled: true,
    },

    plugins: [
        admin(),

        jwt({
            jwks: {
                keyPairConfig: { alg: "EdDSA", crv: "Ed25519" },
                rotationInterval: 60 * 60 * 24 * 30,
                gracePeriod: 60 * 60 * 24 * 30,
            },
            jwt: {
                expirationTime: "15m",
                definePayload: ({ user }) => ({
                    id: user.id,
                    email: user.email,
                    role: user.role ?? null,
                }),
            },
        }),

        bearer(),
    ],
});
