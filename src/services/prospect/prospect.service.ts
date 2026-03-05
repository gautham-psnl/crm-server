import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import {
    ConvertEnquiryInput,
    UpdateProspectInput,
} from './prospect.schema';

@Injectable()
export class ProspectService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { statusId?: string; ownerId?: string }) {
        return this.prisma.prospect.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.ownerId && { ownerId: filters.ownerId }),
            },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
                enquiry: true,
                deals: { include: { status: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const prospect = await this.prisma.prospect.findUnique({
            where: { id },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
                enquiry: true,
                deals: { include: { status: true } },
            },
        });
        if (!prospect) throw new NotFoundException(`Prospect ${id} not found`);
        return prospect;
    }

    async create(dto: ConvertEnquiryInput) {
        // 1. Check if enquiry exists and isn't already converted
        const enquiry = await this.prisma.enquiry.findUnique({
            where: { id: dto.enquiryId },
            include: { status: true },
        });

        if (!enquiry) throw new NotFoundException('Enquiry not found');
        if (enquiry.status?.name === 'Converted') {
            throw new BadRequestException('Enquiry already converted to prospect');
        }

        // 2. Get default statuses
        const convertedStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ENQUIRY', name: 'Converted', isActive: true },
        });

        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'PROSPECT', name: 'Active', isActive: true },
        });

        if (!defaultStatus)
            throw new BadRequestException('Default prospect status not found');

        // 3. Convert in a transaction
        return this.prisma.$transaction(async (tx) => {
            if (convertedStatus) {
                await tx.enquiry.update({
                    where: { id: dto.enquiryId },
                    data: { statusId: convertedStatus.id },
                });
            }

            return tx.prospect.create({
                data: {
                    enquiryId: dto.enquiryId,
                    ownerId: dto.ownerId,
                    statusId: defaultStatus.id,
                },
                include: {
                    status: true,
                    owner: { select: { id: true, name: true, email: true } },
                    enquiry: true,
                },
            });
        });
    }

    async update(id: string, dto: UpdateProspectInput) {
        await this.findById(id);
        return this.prisma.prospect.update({
            where: { id },
            data: dto,
            include: { status: true, owner: true },
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.prospect.delete({ where: { id } });
    }
}
