import { PrismaService } from '../../core/database/prisma.service';
import { CreateCustomerInput, UpdateCustomerInput } from './customer.schema';
export declare class CustomerService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        source?: string;
        sourceRefId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        invoices: ({
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
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        email: string | null;
        phone: string;
        source: string;
        sourceRefId: string;
    })[]>;
    findById(id: string): Promise<{
        invoices: ({
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
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        email: string | null;
        phone: string;
        source: string;
        sourceRefId: string;
    }>;
    create(dto: CreateCustomerInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string | null;
        phone: string;
        source: string;
        sourceRefId: string;
    }>;
    update(id: string, dto: UpdateCustomerInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string | null;
        phone: string;
        source: string;
        sourceRefId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string | null;
        phone: string;
        source: string;
        sourceRefId: string;
    }>;
}
