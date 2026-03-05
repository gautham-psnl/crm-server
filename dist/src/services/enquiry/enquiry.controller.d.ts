import { EnquiryService } from './enquiry.service';
import type { CreateEnquiryInput, UpdateEnquiryInput } from './enquiry.schema';
export declare class EnquiryController {
    private readonly enquiryService;
    constructor(enquiryService: EnquiryService);
    findAll(statusId?: string, sourceId?: string, assignedToId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
        source: {
            id: string;
            type: string;
            name: string;
            createdAt: Date;
        };
        assignedTo: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
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
    })[]>;
    findById(id: string): Promise<{
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
        source: {
            id: string;
            type: string;
            name: string;
            createdAt: Date;
        };
        assignedTo: {
            id: string;
            name: string;
            email: string;
        } | null;
    } & {
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
    }>;
    create(dto: CreateEnquiryInput): Promise<{
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
        source: {
            id: string;
            type: string;
            name: string;
            createdAt: Date;
        };
    } & {
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
    }>;
    update(id: string, dto: UpdateEnquiryInput): Promise<{
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
        source: {
            id: string;
            type: string;
            name: string;
            createdAt: Date;
        };
    } & {
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
    }>;
    remove(id: string): Promise<{
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
    }>;
}
