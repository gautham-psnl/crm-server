import { ProspectService } from './prospect.service';
import type { ConvertEnquiryInput, UpdateProspectInput } from './prospect.schema';
export declare class ProspectController {
    private readonly prospectService;
    constructor(prospectService: ProspectService);
    findAll(statusId?: string, ownerId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
            updatedAt: Date;
            statusId: string;
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
            sourceId: string;
            assignedToId: string | null;
            statusId: string;
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
            updatedAt: Date;
            statusId: string;
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
            sourceId: string;
            assignedToId: string | null;
            statusId: string;
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
            sourceId: string;
            assignedToId: string | null;
            statusId: string;
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
            updatedAt: Date;
            emailVerified: boolean;
            image: string | null;
            role: string | null;
            banReason: string | null;
            banned: boolean | null;
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
