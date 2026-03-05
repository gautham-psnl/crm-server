import { PrismaService } from '../../core/database/prisma.service';
import { CreateDocumentTemplateInput, UpdateDocumentTemplateInput } from './document-template.schema';
export declare class DocumentTemplateService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        destination?: string;
        type?: string;
        isActive?: boolean;
    }): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        htmlTemplate: string;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        htmlTemplate: string;
    }>;
    create(dto: CreateDocumentTemplateInput): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        htmlTemplate: string;
    }>;
    update(id: string, dto: UpdateDocumentTemplateInput): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        htmlTemplate: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        type: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        htmlTemplate: string;
    }>;
}
