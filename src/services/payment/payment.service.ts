import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreatePaymentInput } from './payment.schema';

@Injectable()
export class PaymentService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { invoiceId?: string }) {
        return this.prisma.payment.findMany({
            where: {
                ...(filters?.invoiceId && { invoiceId: filters.invoiceId }),
            },
            include: {
                invoice: { include: { customer: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                invoice: { include: { customer: true } },
            },
        });
        if (!payment) throw new NotFoundException(`Payment ${id} not found`);
        return payment;
    }

    async create(dto: CreatePaymentInput) {
        const payment = await this.prisma.payment.create({
            data: {
                ...dto,
                paidAt: dto.paidAt ? new Date(dto.paidAt) : undefined,
            },
            include: { invoice: true },
        });

        // Auto update invoice status
        const invoice = await this.prisma.invoice.findUnique({
            where: { id: dto.invoiceId },
            include: { payments: true },
        });

        if (invoice) {
            const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);

            if (totalPaid >= invoice.amount) {
                const paidStatus = await this.prisma.moduleStatus.findFirst({
                    where: { module: 'INVOICE', name: 'Paid', isActive: true },
                });
                if (paidStatus) {
                    await this.prisma.invoice.update({
                        where: { id: dto.invoiceId },
                        data: { statusId: paidStatus.id },
                    });
                }
            } else if (totalPaid > 0) {
                const partialStatus = await this.prisma.moduleStatus.findFirst({
                    where: { module: 'INVOICE', name: 'Partially Paid', isActive: true },
                });
                if (partialStatus) {
                    await this.prisma.invoice.update({
                        where: { id: dto.invoiceId },
                        data: { statusId: partialStatus.id },
                    });
                }
            }
        }

        return payment;
    }
}
