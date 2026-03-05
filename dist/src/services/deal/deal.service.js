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
exports.DealService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let DealService = class DealService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
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
    async findById(id) {
        const deal = await this.prisma.deal.findUnique({
            where: { id },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
                prospect: { include: { enquiry: true } },
            },
        });
        if (!deal)
            throw new common_1.NotFoundException(`Deal ${id} not found`);
        return deal;
    }
    async create(dto) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'DEAL', name: 'Open', isActive: true },
        });
        if (!defaultStatus)
            throw new common_1.BadRequestException('Default deal status not found');
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
    async update(id, dto) {
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
    async remove(id) {
        await this.findById(id);
        return this.prisma.deal.delete({ where: { id } });
    }
};
exports.DealService = DealService;
exports.DealService = DealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealService);
//# sourceMappingURL=deal.service.js.map