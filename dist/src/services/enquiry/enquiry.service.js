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
exports.EnquiryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let EnquiryService = class EnquiryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
        return this.prisma.enquiry.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.sourceId && { sourceId: filters.sourceId }),
                ...(filters?.assignedToId && { assignedToId: filters.assignedToId }),
            },
            include: {
                status: true,
                source: true,
                assignedTo: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const enquiry = await this.prisma.enquiry.findUnique({
            where: { id },
            include: {
                status: true,
                source: true,
                assignedTo: { select: { id: true, name: true, email: true } },
            },
        });
        if (!enquiry)
            throw new common_1.NotFoundException(`Enquiry ${id} not found`);
        return enquiry;
    }
    async create(dto) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ENQUIRY', name: 'New', isActive: true },
        });
        if (!defaultStatus)
            throw new common_1.BadRequestException('Default enquiry status not found');
        return this.prisma.enquiry.create({
            data: {
                ...dto,
                statusId: defaultStatus.id,
            },
            include: { status: true, source: true },
        });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.enquiry.update({
            where: { id },
            data: dto,
            include: { status: true, source: true },
        });
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.enquiry.delete({ where: { id } });
    }
};
exports.EnquiryService = EnquiryService;
exports.EnquiryService = EnquiryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnquiryService);
//# sourceMappingURL=enquiry.service.js.map