import { PaymentService } from './payment.service';
import type { CreatePaymentInput } from './payment.schema';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    findAll(invoiceId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        invoice: {
            customer: {
                id: string;
                name: string;
                createdAt: Date;
                email: string | null;
                phone: string;
                source: string;
                sourceRefId: string;
            };
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            amount: number;
            customerId: string;
            quotationId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        amount: number;
        invoiceId: string;
        paidAt: Date | null;
    })[]>;
    create(dto: CreatePaymentInput): Promise<{
        invoice: {
            id: string;
            createdAt: Date;
            statusId: string;
            amount: number;
            customerId: string;
            quotationId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        amount: number;
        invoiceId: string;
        paidAt: Date | null;
    }>;
}
