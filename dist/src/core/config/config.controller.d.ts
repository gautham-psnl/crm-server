import { ConfigService } from './config.service';
import type { CreateLeadSourceInput, CreateModuleStatusInput, UpdateLeadSourceInput, UpdateModuleStatusInput } from './config.schema';
export declare class ConfigController {
    private readonly configService;
    constructor(configService: ConfigService);
    findAllStatuses(module?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        module: string;
        color: string | null;
        sortOrder: number;
        isFinal: boolean;
        isActive: boolean;
    }[]>;
    findStatusById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        module: string;
        color: string | null;
        sortOrder: number;
        isFinal: boolean;
        isActive: boolean;
    }>;
    createStatus(dto: CreateModuleStatusInput): import("@prisma/client").Prisma.Prisma__ModuleStatusClient<{
        id: string;
        name: string;
        createdAt: Date;
        module: string;
        color: string | null;
        sortOrder: number;
        isFinal: boolean;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateStatus(id: string, dto: UpdateModuleStatusInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        module: string;
        color: string | null;
        sortOrder: number;
        isFinal: boolean;
        isActive: boolean;
    }>;
    deactivateStatus(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        module: string;
        color: string | null;
        sortOrder: number;
        isFinal: boolean;
        isActive: boolean;
    }>;
    findAllLeadSources(): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
    }[]>;
    findLeadSourceById(id: string): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
    }>;
    createLeadSource(dto: CreateLeadSourceInput): import("@prisma/client").Prisma.Prisma__LeadSourceClient<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    updateLeadSource(id: string, dto: UpdateLeadSourceInput): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
    }>;
    deleteLeadSource(id: string): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
    }>;
}
