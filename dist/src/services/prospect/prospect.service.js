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
exports.ProspectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let ProspectService = class ProspectService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
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
    async findById(id) {
        const prospect = await this.prisma.prospect.findUnique({
            where: { id },
            include: {
                status: true,
                owner: { select: { id: true, name: true, email: true } },
                enquiry: true,
                deals: { include: { status: true } },
            },
        });
        if (!prospect)
            throw new common_1.NotFoundException(`Prospect ${id} not found`);
        return prospect;
    }
    async create(dto) {
        const enquiry = await this.prisma.enquiry.findUnique({
            where: { id: dto.enquiryId },
            include: { status: true },
        });
        if (!enquiry)
            throw new common_1.NotFoundException('Enquiry not found');
        if (enquiry.status?.name === 'Converted') {
            throw new common_1.BadRequestException('Enquiry already converted to prospect');
        }
        const convertedStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ENQUIRY', name: 'Converted', isActive: true },
        });
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'PROSPECT', name: 'Active', isActive: true },
        });
        if (!defaultStatus)
            throw new common_1.BadRequestException('Default prospect status not found');
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
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.prospect.update({
            where: { id },
            data: dto,
            include: { status: true, owner: true },
        });
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.prospect.delete({ where: { id } });
    }
};
exports.ProspectService = ProspectService;
exports.ProspectService = ProspectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProspectService);
//# sourceMappingURL=prospect.service.js.map