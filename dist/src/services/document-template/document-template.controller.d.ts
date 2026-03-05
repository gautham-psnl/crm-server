import { DocumentTemplateService } from './document-template.service';
import type { CreateDocumentTemplateInput, UpdateDocumentTemplateInput } from './document-template.schema';
export declare class DocumentTemplateController {
    private readonly documentTemplateService;
    constructor(documentTemplateService: DocumentTemplateService);
    findAll(destination?: string, type?: string, isActive?: string): import("@prisma/client").Prisma.PrismaPromise<{
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
