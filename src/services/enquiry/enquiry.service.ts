import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateEnquiryInput, UpdateEnquiryInput } from './enquiry.schema';

@Injectable()
export class EnquiryService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: {
        statusId?: string;
        sourceId?: string;
        assignedToId?: string;
    }) {
        return this.prisma.enquiry.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.sourceId && { sourceId: filters.sourceId }),
                ...(filters?.assignedToId && { assignedToId: filters.assignedToId }),
            },
            include: {
                status: true,
                source: true,
                assignedTo: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const enquiry = await this.prisma.enquiry.findUnique({
            where: { id },
            include: {
                status: true,
                source: true,
                assignedTo: { select: { id: true, name: true, email: true } },
            },
        });
        if (!enquiry) throw new NotFoundException(`Enquiry ${id} not found`);
        return enquiry;
    }

    async create(dto: CreateEnquiryInput) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ENQUIRY', name: 'New', isActive: true },
        });

        if (!defaultStatus) throw new BadRequestException('Default enquiry status not found');

        return this.prisma.enquiry.create({
            data: {
                ...dto,
                statusId: defaultStatus.id,
            },
            include: { status: true, source: true },
        });
    }

    async update(id: string, dto: UpdateEnquiryInput) {
        await this.findById(id);
        return this.prisma.enquiry.update({
            where: { id },
            data: dto,
            include: { status: true, source: true },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.enquiry.delete({ where: { id } });
    }
}
