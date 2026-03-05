import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import {
    CreateQuotationInput,
    UpdateQuotationInput,
} from './quotation.schema';

@Injectable()
export class QuotationService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { statusId?: string; prospectId?: string }) {
        return this.prisma.quotation.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.prospectId && { prospectId: filters.prospectId }),
            },
            include: {
                status: true,
                prospect: { include: { enquiry: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const quotation = await this.prisma.quotation.findUnique({
            where: { id },
            include: {
                status: true,
                prospect: { include: { enquiry: true } },
            },
        });
        if (!quotation) throw new NotFoundException(`Quotation ${id} not found`);
        return quotation;
    }

    async create(dto: CreateQuotationInput) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'QUOTATION', name: 'Draft', isActive: true },
        });

        if (!defaultStatus)
            throw new BadRequestException('Default quotation status not found');

        return this.prisma.quotation.create({
            data: {
                ...dto,
                snapshotData: dto.snapshotData as any,
                statusId: defaultStatus.id,
            },
            include: { status: true, prospect: true },
        });
    }

    async update(id: string, dto: UpdateQuotationInput) {
        await this.findById(id);
        return this.prisma.quotation.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.snapshotData && { snapshotData: dto.snapshotData as any }),
            } as any,
            include: { status: true, prospect: true },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.quotation.delete({ where: { id } });
    }
}
