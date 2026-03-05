import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateInvoiceInput, UpdateInvoiceInput } from './invoice.schema';

@Injectable()
export class InvoiceService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { statusId?: string; customerId?: string }) {
        return this.prisma.invoice.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.customerId && { customerId: filters.customerId }),
            },
            include: {
                status: true,
                customer: true,
                payments: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const invoice = await this.prisma.invoice.findUnique({
            where: { id },
            include: {
                status: true,
                customer: true,
                payments: true,
            },
        });
        if (!invoice) throw new NotFoundException(`Invoice ${id} not found`);
        return invoice;
    }

    async create(dto: CreateInvoiceInput) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'INVOICE', name: 'Pending', isActive: true },
        });

        if (!defaultStatus)
            throw new BadRequestException('Default invoice status not found');

        return this.prisma.invoice.create({
            data: {
                ...dto,
                statusId: defaultStatus.id,
            },
            include: { status: true, customer: true },
        });
    }

    async update(id: string, dto: UpdateInvoiceInput) {
        await this.findById(id);
        return this.prisma.invoice.update({
            where: { id },
            data: dto,
            include: { status: true, customer: true },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.invoice.delete({ where: { id } });
    }
}
