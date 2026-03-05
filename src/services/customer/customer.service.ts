import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import {
    CreateCustomerInput,
    UpdateCustomerInput,
} from './customer.schema';

@Injectable()
export class CustomerService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { source?: string; sourceRefId?: string }) {
        return this.prisma.customer.findMany({
            where: {
                ...(filters?.source && { source: filters.source }),
                ...(filters?.sourceRefId && { sourceRefId: filters.sourceRefId }),
            },
            orderBy: { createdAt: 'desc' },
            include: {
                invoices: { include: { status: true } },
            },
        });
    }

    async findById(id: string) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                invoices: { include: { status: true, payments: true } },
            },
        });
        if (!customer) throw new NotFoundException(`Customer ${id} not found`);
        return customer;
    }

    async create(dto: CreateCustomerInput) {
        return this.prisma.customer.create({
            data: dto,
        });
    }

    async update(id: string, dto: UpdateCustomerInput) {
        await this.findById(id); // Ensure exists
        return this.prisma.customer.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.customer.delete({ where: { id } });
    }
}
