import { PaymentService } from './payment.service';
import type { CreatePaymentInput } from './payment.schema';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    findAll(invoiceId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
