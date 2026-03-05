import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import {
    CreateItineraryInput,
    UpdateItineraryInput,
} from './itinerary.schema';

@Injectable()
export class ItineraryService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { statusId?: string; prospectId?: string }) {
        return this.prisma.itinerary.findMany({
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
        const itinerary = await this.prisma.itinerary.findUnique({
            where: { id },
            include: {
                status: true,
                prospect: { include: { enquiry: true } },
            },
        });
        if (!itinerary) throw new NotFoundException(`Itinerary ${id} not found`);
        return itinerary;
    }

    async create(dto: CreateItineraryInput) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ITINERARY', name: 'Draft', isActive: true },
        });

        if (!defaultStatus)
            throw new BadRequestException('Default itinerary status not found');

        return this.prisma.itinerary.create({
            data: {
                ...dto,
                snapshotData: dto.snapshotData as any,
                statusId: defaultStatus.id,
            },
            include: { status: true, prospect: true },
        });
    }

    async update(id: string, dto: UpdateItineraryInput) {
        await this.findById(id);
        return this.prisma.itinerary.update({
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
        return this.prisma.itinerary.delete({ where: { id } });
    }
}
