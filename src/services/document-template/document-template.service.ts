import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import {
    CreateDocumentTemplateInput,
    UpdateDocumentTemplateInput,
} from './document-template.schema';

@Injectable()
export class DocumentTemplateService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { destination?: string; type?: string; isActive?: boolean }) {
        return this.prisma.documentTemplate.findMany({
            where: {
                ...(filters?.destination && { destination: filters.destination }),
                ...(filters?.type && { type: filters.type }),
                ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const template = await this.prisma.documentTemplate.findUnique({
            where: { id },
        });
        if (!template)
            throw new NotFoundException(`DocumentTemplate ${id} not found`);
        return template;
    }

    async create(dto: CreateDocumentTemplateInput) {
        return this.prisma.documentTemplate.create({
            data: dto,
        });
    }

    async update(id: string, dto: UpdateDocumentTemplateInput) {
        await this.findById(id); // Ensure exists
        return this.prisma.documentTemplate.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.documentTemplate.delete({ where: { id } });
    }
}
