import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import {
    CreateLeadSourceInput,
    CreateModuleStatusInput,
    UpdateLeadSourceInput,
    UpdateModuleStatusInput,
} from './config.schema';

@Injectable()
export class ConfigService {
    constructor(private readonly prisma: PrismaService) { }

    // ───────────────────────────── MODULE STATUS ─────────────────────────────────

    findAllStatuses(module?: string) {
        return this.prisma.moduleStatus.findMany({
            where: module ? { module: module.toUpperCase() } : undefined,
            orderBy: { sortOrder: 'asc' },
        });
    }

    async findStatusById(id: string) {
        const status = await this.prisma.moduleStatus.findUnique({ where: { id } });
        if (!status) throw new NotFoundException(`Status ${id} not found`);
        return status;
    }

    createStatus(dto: CreateModuleStatusInput) {
        return this.prisma.moduleStatus.create({
            data: {
                module: dto.module.toUpperCase(),
                name: dto.name,
                color: dto.color,
                sortOrder: dto.sortOrder,
                isFinal: dto.isFinal,
            },
        });
    }

    async updateStatus(id: string, dto: UpdateModuleStatusInput) {
        await this.findStatusById(id);
        return this.prisma.moduleStatus.update({
            where: { id },
            data: dto,
        });
    }

    async deactivateStatus(id: string) {
        await this.findStatusById(id);
        return this.prisma.moduleStatus.update({
            where: { id },
            data: { isActive: false },
        });
    }

    // ───────────────────────────── LEAD SOURCE ──────────────────────────────────

    findAllLeadSources() {
        return this.prisma.leadSource.findMany({ orderBy: { createdAt: 'asc' } });
    }

    async findLeadSourceById(id: string) {
        const source = await this.prisma.leadSource.findUnique({ where: { id } });
        if (!source) throw new NotFoundException(`LeadSource ${id} not found`);
        return source;
    }

    createLeadSource(dto: CreateLeadSourceInput) {
        return this.prisma.leadSource.create({
            data: {
                type: dto.type.toUpperCase(),
                name: dto.name,
            },
        });
    }

    async updateLeadSource(id: string, dto: UpdateLeadSourceInput) {
        await this.findLeadSourceById(id);
        return this.prisma.leadSource.update({
            where: { id },
            data: {
                ...(dto.type && { type: dto.type.toUpperCase() }),
                ...(dto.name && { name: dto.name }),
            },
        });
    }

    async deleteLeadSource(id: string) {
        await this.findLeadSourceById(id);
        return this.prisma.leadSource.delete({ where: { id } });
    }
}
