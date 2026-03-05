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
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let ConfigService = class ConfigService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAllStatuses(module) {
        return this.prisma.moduleStatus.findMany({
            where: module ? { module: module.toUpperCase() } : undefined,
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findStatusById(id) {
        const status = await this.prisma.moduleStatus.findUnique({ where: { id } });
        if (!status)
            throw new common_1.NotFoundException(`Status ${id} not found`);
        return status;
    }
    createStatus(dto) {
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
    async updateStatus(id, dto) {
        await this.findStatusById(id);
        return this.prisma.moduleStatus.update({
            where: { id },
            data: dto,
        });
    }
    async deactivateStatus(id) {
        await this.findStatusById(id);
        return this.prisma.moduleStatus.update({
            where: { id },
            data: { isActive: false },
        });
    }
    findAllLeadSources() {
        return this.prisma.leadSource.findMany({ orderBy: { createdAt: 'asc' } });
    }
    async findLeadSourceById(id) {
        const source = await this.prisma.leadSource.findUnique({ where: { id } });
        if (!source)
            throw new common_1.NotFoundException(`LeadSource ${id} not found`);
        return source;
    }
    createLeadSource(dto) {
        return this.prisma.leadSource.create({
            data: {
                type: dto.type.toUpperCase(),
                name: dto.name,
            },
        });
    }
    async updateLeadSource(id, dto) {
        await this.findLeadSourceById(id);
        return this.prisma.leadSource.update({
            where: { id },
            data: {
                ...(dto.type && { type: dto.type.toUpperCase() }),
                ...(dto.name && { name: dto.name }),
            },
        });
    }
    async deleteLeadSource(id) {
        await this.findLeadSourceById(id);
        return this.prisma.leadSource.delete({ where: { id } });
    }
};
exports.ConfigService = ConfigService;
exports.ConfigService = ConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ConfigService);
//# sourceMappingURL=config.service.js.map