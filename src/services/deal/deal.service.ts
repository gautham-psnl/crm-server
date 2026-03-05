import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { CreateDealInput, UpdateDealInput } from './deal.schema';

@Injectable()
export class DealService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: {
        statusId?: string;
        ownerId?: string;
        prospectId?: string;
    }) {
        return this.prisma.deal.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.ownerId && { ownerId: filters.ownerId }),
                ...(filters?.prospectId && { prospectId: filters.prospectId }),
            },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
                prospect: { include: { enquiry: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const deal = await this.prisma.deal.findUnique({
            where: { id },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
                prospect: { include: { enquiry: true } },
            },
        });
        if (!deal) throw new NotFoundException(`Deal ${id} not found`);
        return deal;
    }

    async create(dto: CreateDealInput) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'DEAL', name: 'Open', isActive: true },
        });

        if (!defaultStatus)
            throw new BadRequestException('Default deal status not found');

        return this.prisma.deal.create({
            data: {
                ...dto,
                expectedCloseDate: new Date(dto.expectedCloseDate),
                statusId: defaultStatus.id,
            },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
            },
        });
    }

    async update(id: string, dto: UpdateDealInput) {
        await this.findById(id);
        return this.prisma.deal.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.expectedCloseDate && {
                    expectedCloseDate: new Date(dto.expectedCloseDate),
                }),
            },
            include: { status: true, owner: true },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.deal.delete({ where: { id } });
    }
}
