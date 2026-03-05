"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTemplateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let DocumentTemplateService = class DocumentTemplateService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
        return this.prisma.documentTemplate.findMany({
            where: {
                ...(filters?.destination && { destination: filters.destination }),
                ...(filters?.type && { type: filters.type }),
                ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const template = await this.prisma.documentTemplate.findUnique({
            where: { id },
        });
        if (!template)
            throw new common_1.NotFoundException(`DocumentTemplate ${id} not found`);
        return template;
    }
    async create(dto) {
        return this.prisma.documentTemplate.create({
            data: dto,
        });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.documentTemplate.update({
            where: { id },
            data: dto,
        });
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.documentTemplate.delete({ where: { id } });
    }
};
exports.DocumentTemplateService = DocumentTemplateService;
exports.DocumentTemplateService = DocumentTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DocumentTemplateService);
//# sourceMappingURL=document-template.service.js.map