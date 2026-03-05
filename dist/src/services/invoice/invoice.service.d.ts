import { PrismaService } from '../../core/database/prisma.service';
import { CreateInvoiceInput, UpdateInvoiceInput } from './invoice.schema';
export declare class InvoiceService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        statusId?: string;
        customerId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            source: string;
            sourceRefId: string;
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
        payments: {
            id: string;
            createdAt: Date;
            amount: number;
            invoiceId: string;
            paidAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        amount: number;
        quotationId: string;
        customerId: string;
    })[]>;
    findById(id: string): Promise<{
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            source: string;
            sourceRefId: string;
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
        payments: {
            id: string;
            createdAt: Date;
            amount: number;
            invoiceId: string;
            paidAt: Date | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        amount: number;
        quotationId: string;
        customerId: string;
    }>;
    create(dto: CreateInvoiceInput): Promise<{
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            source: string;
            sourceRefId: string;
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
        amount: number;
        quotationId: string;
        customerId: string;
    }>;
    update(id: string, dto: UpdateInvoiceInput): Promise<{
        customer: {
            id: string;
            name: string;
            createdAt: Date;
            email: string | null;
            phone: string;
            source: string;
            sourceRefId: string;
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
        amount: number;
        quotationId: string;
        customerId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        statusId: string;
        amount: number;
        quotationId: string;
        customerId: string;
    }>;
}
