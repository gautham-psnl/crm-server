import { InvoiceService } from './invoice.service';
import type { CreateInvoiceInput, UpdateInvoiceInput } from './invoice.schema';
export declare class InvoiceController {
    private readonly invoiceService;
    constructor(invoiceService: InvoiceService);
    findAll(statusId?: string, customerId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
        customerId: string;
        quotationId: string;
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
        customerId: string;
        quotationId: string;
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
        customerId: string;
        quotationId: string;
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
        customerId: string;
        quotationId: string;
    }>;
}
