import { PrismaService } from '../../core/database/prisma.service';
import { ConvertEnquiryInput, UpdateProspectInput } from './prospect.schema';
export declare class ProspectService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        statusId?: string;
        ownerId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        deals: ({
            status: {
                id: string;
                name: string;
                createdAt: Date;
                module: string;
                color: string | null;
                sortOrder: number;
                isFinal: boolean;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            updatedAt: Date;
            ownerId: string;
            prospectId: string;
            expectedValue: number;
            probability: number;
            expectedCloseDate: Date;
        })[];
        enquiry: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            destination: string | null;
            budget: number | null;
            statusId: string;
            sourceId: string;
            assignedToId: string | null;
        };
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        enquiryId: string;
        ownerId: string;
    })[]>;
    findById(id: string): Promise<{
        deals: ({
            status: {
                id: string;
                name: string;
                createdAt: Date;
                module: string;
                color: string | null;
                sortOrder: number;
                isFinal: boolean;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            updatedAt: Date;
            ownerId: string;
            prospectId: string;
            expectedValue: number;
            probability: number;
            expectedCloseDate: Date;
        })[];
        enquiry: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            destination: string | null;
            budget: number | null;
            statusId: string;
            sourceId: string;
            assignedToId: string | null;
        };
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        enquiryId: string;
        ownerId: string;
    }>;
    create(dto: ConvertEnquiryInput): Promise<{
        enquiry: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            destination: string | null;
            budget: number | null;
            statusId: string;
            sourceId: string;
            assignedToId: string | null;
        };
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        enquiryId: string;
        ownerId: string;
    }>;
    update(id: string, dto: UpdateProspectInput): Promise<{
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            emailVerified: boolean;
            image: string | null;
            updatedAt: Date;
            role: string | null;
            banned: boolean | null;
            banReason: string | null;
            banExpires: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        enquiryId: string;
        ownerId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        statusId: string;
        enquiryId: string;
        ownerId: string;
    }>;
}
