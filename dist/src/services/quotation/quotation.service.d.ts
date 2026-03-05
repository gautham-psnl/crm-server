import { PrismaService } from '../../core/database/prisma.service';
import { CreateQuotationInput, UpdateQuotationInput } from './quotation.schema';
export declare class QuotationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        statusId?: string;
        prospectId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        prospect: {
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
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            enquiryId: string;
            ownerId: string;
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string | null;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
        amount: number;
    })[]>;
    findById(id: string): Promise<{
        prospect: {
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
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            enquiryId: string;
            ownerId: string;
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string | null;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
        amount: number;
    }>;
    create(dto: CreateQuotationInput): Promise<{
        prospect: {
            id: string;
            createdAt: Date;
            statusId: string;
            enquiryId: string;
            ownerId: string;
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string | null;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
        amount: number;
    }>;
    update(id: string, dto: UpdateQuotationInput): Promise<{
        prospect: {
            id: string;
            createdAt: Date;
            statusId: string;
            enquiryId: string;
            ownerId: string;
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string | null;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
        amount: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string | null;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
        amount: number;
    }>;
}
