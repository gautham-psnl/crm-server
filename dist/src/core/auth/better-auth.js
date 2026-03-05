"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.ROLE_PERMISSIONS = void 0;
const better_auth_1 = require("better-auth");
const plugins_1 = require("better-auth/plugins");
const pg_1 = require("pg");
exports.ROLE_PERMISSIONS = {
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
exports.auth = (0, better_auth_1.betterAuth)({
    database: new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? "http://localhost:3000",
    trustedOrigins: [process.env.FRONTEND_URL ?? "http://localhost:3001"],
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        (0, plugins_1.admin)(),
        (0, plugins_1.jwt)({
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
        (0, plugins_1.bearer)(),
    ],
});
//# sourceMappingURL=better-auth.js.map