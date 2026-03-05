import { Pool } from "pg";
export declare const ROLE_PERMISSIONS: Record<string, Record<string, string[]>>;
export declare const auth: import("better-auth", { with: { "resolution-mode": "import" } }).Auth<{
    database: Pool;
    secret: string | undefined;
    baseURL: string;
    trustedOrigins: string[];
    emailAndPassword: {
        enabled: true;
    };
    plugins: [{
        id: "admin";
        init(): {
            options: {
                databaseHooks: {
                    user: {
                        create: {
                            before(user: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                email: string;
                                emailVerified: boolean;
                                name: string;
                                image?: string | null | undefined;
                            } & Record<string, unknown>): Promise<{
                                data: {
                                    id: string;
                                    createdAt: Date;
                                    updatedAt: Date;
                                    email: string;
                                    emailVerified: boolean;
                                    name: string;
                                    image?: string | null | undefined;
                                    role: string;
                                };
                            }>;
                        };
                    };
                    session: {
                        create: {
                            before(session: {
                                id: string;
                                createdAt: Date;
                                updatedAt: Date;
                                userId: string;
                                expiresAt: Date;
                                token: string;
                                ipAddress?: string | null | undefined;
                                userAgent?: string | null | undefined;
                            } & Record<string, unknown>, ctx: import("better-auth", { with: { "resolution-mode": "import" } }).GenericEndpointContext | null): Promise<void>;
                        };
                    };
                };
            };
        };
        hooks: {
            after: {
                matcher(context: import("better-auth", { with: { "resolution-mode": "import" } }).HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<import("better-auth/plugins", { with: { "resolution-mode": "import" } }).SessionWithImpersonatedBy[] | undefined>;
            }[];
        };
        endpoints: {
            setRole: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/set-role", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                    role: import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<readonly [import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodArray<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>]>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                requireHeaders: true;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            userId: string;
                            role: "user" | "admin" | ("user" | "admin")[];
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
            }>;
            getUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/get-user", {
                method: "GET";
                query: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    id: import("better-auth", { with: { "resolution-mode": "import" } }).ZodString;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole>;
            createUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/create-user", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    email: import("better-auth", { with: { "resolution-mode": "import" } }).ZodString;
                    password: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                    name: import("better-auth", { with: { "resolution-mode": "import" } }).ZodString;
                    role: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<readonly [import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodArray<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>]>>;
                    data: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodRecord<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodAny>>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: {
                            email: string;
                            password?: string | undefined;
                            name: string;
                            role?: "user" | "admin" | ("user" | "admin")[] | undefined;
                            data?: Record<string, any> | undefined;
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
            }>;
            adminUpdateUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/update-user", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                    data: import("better-auth", { with: { "resolution-mode": "import" } }).ZodRecord<import("better-auth", { with: { "resolution-mode": "import" } }).ZodAny, import("better-auth", { with: { "resolution-mode": "import" } }).ZodAny>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole>;
            listUsers: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/list-users", {
                method: "GET";
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                query: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    searchValue: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                    searchField: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodEnum<{
                        name: "name";
                        email: "email";
                    }>>;
                    searchOperator: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodEnum<{
                        contains: "contains";
                        starts_with: "starts_with";
                        ends_with: "ends_with";
                    }>>;
                    limit: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<[import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodNumber]>>;
                    offset: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<[import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodNumber]>>;
                    sortBy: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                    sortDirection: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodEnum<{
                        asc: "asc";
                        desc: "desc";
                    }>>;
                    filterField: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                    filterValue: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<[import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<[import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodNumber]>, import("better-auth", { with: { "resolution-mode": "import" } }).ZodBoolean]>>;
                    filterOperator: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodEnum<{
                        eq: "eq";
                        ne: "ne";
                        lt: "lt";
                        lte: "lte";
                        gt: "gt";
                        gte: "gte";
                        contains: "contains";
                    }>>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                users: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                                total: {
                                                    type: string;
                                                };
                                                limit: {
                                                    type: string;
                                                };
                                                offset: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                users: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole[];
                total: number;
            }>;
            listUserSessions: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/list-user-sessions", {
                method: "POST";
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                sessions: {
                                                    type: string;
                                                    items: {
                                                        $ref: string;
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                sessions: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).SessionWithImpersonatedBy[];
            }>;
            unbanUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/unban-user", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
            }>;
            banUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/ban-user", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                    banReason: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                    banExpiresIn: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodNumber>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
            }>;
            impersonateUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/impersonate-user", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                session: {
                                                    $ref: string;
                                                };
                                                user: {
                                                    $ref: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                };
                user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
            }>;
            stopImpersonating: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/stop-impersonating", {
                method: "POST";
                requireHeaders: true;
            }, {
                session: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    userId: string;
                    expiresAt: Date;
                    token: string;
                    ipAddress?: string | null | undefined;
                    userAgent?: string | null | undefined;
                } & Record<string, any>;
                user: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    email: string;
                    emailVerified: boolean;
                    name: string;
                    image?: string | null | undefined;
                } & Record<string, any>;
            }>;
            revokeUserSession: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/revoke-user-session", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    sessionToken: import("better-auth", { with: { "resolution-mode": "import" } }).ZodString;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            revokeUserSessions: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/revoke-user-sessions", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            removeUser: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/remove-user", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                success: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                success: boolean;
            }>;
            setUserPassword: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/set-user-password", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    newPassword: import("better-auth", { with: { "resolution-mode": "import" } }).ZodString;
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        user: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).UserWithRole;
                        session: import("better-auth", { with: { "resolution-mode": "import" } }).Session;
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        summary: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                status: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                status: boolean;
            }>;
            userHasPermission: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/admin/has-permission", {
                method: "POST";
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodIntersection<import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    userId: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodCoercedString<unknown>>;
                    role: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>, import("better-auth", { with: { "resolution-mode": "import" } }).ZodUnion<readonly [import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    permission: import("better-auth", { with: { "resolution-mode": "import" } }).ZodRecord<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodArray<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>>;
                    permissions: import("better-auth", { with: { "resolution-mode": "import" } }).ZodUndefined;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>, import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    permission: import("better-auth", { with: { "resolution-mode": "import" } }).ZodUndefined;
                    permissions: import("better-auth", { with: { "resolution-mode": "import" } }).ZodRecord<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodArray<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>]>>;
                metadata: {
                    openapi: {
                        description: string;
                        requestBody: {
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object";
                                        properties: {
                                            permission: {
                                                type: string;
                                                description: string;
                                                deprecated: boolean;
                                            };
                                            permissions: {
                                                type: string;
                                                description: string;
                                            };
                                        };
                                        required: string[];
                                    };
                                };
                            };
                        };
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                error: {
                                                    type: string;
                                                };
                                                success: {
                                                    type: string;
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                    $Infer: {
                        body: ({
                            permission: {
                                readonly user?: ("list" | "create" | "update" | "delete" | "set-role" | "ban" | "impersonate" | "set-password" | "get")[] | undefined;
                                readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                            };
                            permissions?: never | undefined;
                        } | {
                            permissions: {
                                readonly user?: ("list" | "create" | "update" | "delete" | "set-role" | "ban" | "impersonate" | "set-password" | "get")[] | undefined;
                                readonly session?: ("list" | "delete" | "revoke")[] | undefined;
                            };
                            permission?: never | undefined;
                        }) & {
                            userId?: string | undefined;
                            role?: "user" | "admin" | undefined;
                        };
                    };
                };
            }, {
                error: null;
                success: boolean;
            }>;
        };
        $ERROR_CODES: {
            readonly FAILED_TO_CREATE_USER: "Failed to create user";
            readonly USER_ALREADY_EXISTS: "User already exists.";
            readonly USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: "User already exists. Use another email.";
            readonly YOU_CANNOT_BAN_YOURSELF: "You cannot ban yourself";
            readonly YOU_ARE_NOT_ALLOWED_TO_CHANGE_USERS_ROLE: "You are not allowed to change users role";
            readonly YOU_ARE_NOT_ALLOWED_TO_CREATE_USERS: "You are not allowed to create users";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS: "You are not allowed to list users";
            readonly YOU_ARE_NOT_ALLOWED_TO_LIST_USERS_SESSIONS: "You are not allowed to list users sessions";
            readonly YOU_ARE_NOT_ALLOWED_TO_BAN_USERS: "You are not allowed to ban users";
            readonly YOU_ARE_NOT_ALLOWED_TO_IMPERSONATE_USERS: "You are not allowed to impersonate users";
            readonly YOU_ARE_NOT_ALLOWED_TO_REVOKE_USERS_SESSIONS: "You are not allowed to revoke users sessions";
            readonly YOU_ARE_NOT_ALLOWED_TO_DELETE_USERS: "You are not allowed to delete users";
            readonly YOU_ARE_NOT_ALLOWED_TO_SET_USERS_PASSWORD: "You are not allowed to set users password";
            readonly BANNED_USER: "You have been banned from this application";
            readonly YOU_ARE_NOT_ALLOWED_TO_GET_USER: "You are not allowed to get user";
            readonly NO_DATA_TO_UPDATE: "No data to update";
            readonly YOU_ARE_NOT_ALLOWED_TO_UPDATE_USERS: "You are not allowed to update users";
            readonly YOU_CANNOT_REMOVE_YOURSELF: "You cannot remove yourself";
            readonly YOU_ARE_NOT_ALLOWED_TO_SET_NON_EXISTENT_VALUE: "You are not allowed to set a non-existent role value";
            readonly YOU_CANNOT_IMPERSONATE_ADMINS: "You cannot impersonate admins";
            readonly INVALID_ROLE_TYPE: "Invalid role type";
        };
        schema: {
            user: {
                fields: {
                    role: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banned: {
                        type: "boolean";
                        defaultValue: false;
                        required: false;
                        input: false;
                    };
                    banReason: {
                        type: "string";
                        required: false;
                        input: false;
                    };
                    banExpires: {
                        type: "date";
                        required: false;
                        input: false;
                    };
                };
            };
            session: {
                fields: {
                    impersonatedBy: {
                        type: "string";
                        required: false;
                    };
                };
            };
        };
        options: NoInfer<import("better-auth/plugins", { with: { "resolution-mode": "import" } }).AdminOptions>;
    }, {
        id: "jwt";
        options: NoInfer<{
            jwks: {
                keyPairConfig: {
                    alg: "EdDSA";
                    crv: "Ed25519";
                };
                rotationInterval: number;
                gracePeriod: number;
            };
            jwt: {
                expirationTime: string;
                definePayload: ({ user }: {
                    user: import("better-auth", { with: { "resolution-mode": "import" } }).User & Record<string, any>;
                    session: import("better-auth", { with: { "resolution-mode": "import" } }).Session & Record<string, any>;
                }) => {
                    id: string;
                    email: string;
                    role: any;
                };
            };
        }>;
        endpoints: {
            getJwks: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<string, {
                method: "GET";
                metadata: {
                    openapi: {
                        operationId: string;
                        description: string;
                        responses: {
                            "200": {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                keys: {
                                                    type: string;
                                                    description: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            kid: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            kty: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            alg: {
                                                                type: string;
                                                                description: string;
                                                            };
                                                            use: {
                                                                type: string;
                                                                description: string;
                                                                enum: string[];
                                                                nullable: boolean;
                                                            };
                                                            n: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            e: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            crv: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            x: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                            y: {
                                                                type: string;
                                                                description: string;
                                                                nullable: boolean;
                                                            };
                                                        };
                                                        required: string[];
                                                    };
                                                };
                                            };
                                            required: string[];
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, import("better-auth", { with: { "resolution-mode": "import" } }).JSONWebKeySet>;
            getToken: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<"/token", {
                method: "GET";
                requireHeaders: true;
                use: ((inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    session: {
                        session: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            userId: string;
                            expiresAt: Date;
                            token: string;
                            ipAddress?: string | null | undefined;
                            userAgent?: string | null | undefined;
                        };
                        user: Record<string, any> & {
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            email: string;
                            emailVerified: boolean;
                            name: string;
                            image?: string | null | undefined;
                        };
                    };
                }>)[];
                metadata: {
                    openapi: {
                        operationId: string;
                        description: string;
                        responses: {
                            200: {
                                description: string;
                                content: {
                                    "application/json": {
                                        schema: {
                                            type: "object";
                                            properties: {
                                                token: {
                                                    type: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            }, {
                token: string;
            }>;
            signJWT: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<string, {
                method: "POST";
                metadata: {
                    $Infer: {
                        body: {
                            payload: import("better-auth", { with: { "resolution-mode": "import" } }).JWTPayload;
                            overrideOptions?: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).JwtOptions | undefined;
                        };
                    };
                };
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    payload: import("better-auth", { with: { "resolution-mode": "import" } }).ZodRecord<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodAny>;
                    overrideOptions: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodRecord<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString, import("better-auth", { with: { "resolution-mode": "import" } }).ZodAny>>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
            }, {
                token: string;
            }>;
            verifyJWT: import("better-auth", { with: { "resolution-mode": "import" } }).StrictEndpoint<string, {
                method: "POST";
                metadata: {
                    $Infer: {
                        body: {
                            token: string;
                            issuer?: string;
                        };
                        response: {
                            payload: {
                                sub: string;
                                aud: string;
                                [key: string]: any;
                            } | null;
                        };
                    };
                };
                body: import("better-auth", { with: { "resolution-mode": "import" } }).ZodObject<{
                    token: import("better-auth", { with: { "resolution-mode": "import" } }).ZodString;
                    issuer: import("better-auth", { with: { "resolution-mode": "import" } }).ZodOptional<import("better-auth", { with: { "resolution-mode": "import" } }).ZodString>;
                }, import("better-auth", { with: { "resolution-mode": "import" } }).$strip>;
            }, {
                payload: (import("better-auth", { with: { "resolution-mode": "import" } }).JWTPayload & Required<Pick<import("better-auth", { with: { "resolution-mode": "import" } }).JWTPayload, "sub" | "aud">>) | null;
            }>;
        };
        hooks: {
            after: {
                matcher(context: import("better-auth", { with: { "resolution-mode": "import" } }).HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<void>;
            }[];
        };
        schema: {
            jwks: {
                fields: {
                    publicKey: {
                        type: "string";
                        required: true;
                    };
                    privateKey: {
                        type: "string";
                        required: true;
                    };
                    createdAt: {
                        type: "date";
                        required: true;
                    };
                    expiresAt: {
                        type: "date";
                        required: false;
                    };
                };
            };
        };
    }, {
        id: "bearer";
        hooks: {
            before: {
                matcher(context: import("better-auth", { with: { "resolution-mode": "import" } }).HookEndpointContext): boolean;
                handler: (inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<{
                    context: {
                        headers: Headers;
                    };
                } | undefined>;
            }[];
            after: {
                matcher(context: import("better-auth", { with: { "resolution-mode": "import" } }).HookEndpointContext): true;
                handler: (inputContext: import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareInputContext<import("better-auth", { with: { "resolution-mode": "import" } }).MiddlewareOptions>) => Promise<void>;
            }[];
        };
        options: import("better-auth/plugins", { with: { "resolution-mode": "import" } }).BearerOptions | undefined;
    }];
}>;
