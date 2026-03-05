import { PrismaService } from '../../core/database/prisma.service';
import { CreatePaymentInput } from './payment.schema';
export declare class PaymentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        invoiceId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        invoice: {
            customer: {
                id: string;
                createdAt: Date;
                name: string;
                email: string | null;
                phone: string;
                source: string;
                sourceRefId: string;
            };
        } & {
            id: string;
            amount: number;
            createdAt: Date;
            quotationId: string;
            customerId: string;
            statusId: string;
        };
    } & {
        id: string;
        invoiceId: string;
        amount: number;
        paidAt: Date | null;
        createdAt: Date;
    })[]>;
    findById(id: string): Promise<{
        invoice: {
            customer: {
                id: string;
                createdAt: Date;
                name: string;
                email: string | null;
                phone: string;
                source: string;
                sourceRefId: string;
            };
        } & {
            id: string;
            amount: number;
            createdAt: Date;
            quotationId: string;
            customerId: string;
            statusId: string;
        };
    } & {
        id: string;
        invoiceId: string;
        amount: number;
        paidAt: Date | null;
        createdAt: Date;
    }>;
    create(dto: CreatePaymentInput): Promise<{
        invoice: {
            id: string;
            amount: number;
            createdAt: Date;
            quotationId: string;
            customerId: string;
            statusId: string;
        };
    } & {
        id: string;
        invoiceId: string;
        amount: number;
        paidAt: Date | null;
        createdAt: Date;
    }>;
}
