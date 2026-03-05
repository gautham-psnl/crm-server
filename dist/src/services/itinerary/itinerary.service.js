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
exports.ItineraryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let ItineraryService = class ItineraryService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(filters) {
        return this.prisma.itinerary.findMany({
            where: {
                ...(filters?.statusId && { statusId: filters.statusId }),
                ...(filters?.prospectId && { prospectId: filters.prospectId }),
            },
            include: {
                status: true,
                prospect: { include: { enquiry: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        const itinerary = await this.prisma.itinerary.findUnique({
            where: { id },
            include: {
                status: true,
                prospect: { include: { enquiry: true } },
            },
        });
        if (!itinerary)
            throw new common_1.NotFoundException(`Itinerary ${id} not found`);
        return itinerary;
    }
    async create(dto) {
        const defaultStatus = await this.prisma.moduleStatus.findFirst({
            where: { module: 'ITINERARY', name: 'Draft', isActive: true },
        });
        if (!defaultStatus)
            throw new common_1.BadRequestException('Default itinerary status not found');
        return this.prisma.itinerary.create({
            data: {
                ...dto,
                snapshotData: dto.snapshotData,
                statusId: defaultStatus.id,
            },
            include: { status: true, prospect: true },
        });
    }
    async update(id, dto) {
        await this.findById(id);
        return this.prisma.itinerary.update({
            where: { id },
            data: {
                ...dto,
                ...(dto.snapshotData && { snapshotData: dto.snapshotData }),
            },
            include: { status: true, prospect: true },
        });
    }
    async remove(id) {
        await this.findById(id);
        return this.prisma.itinerary.delete({ where: { id } });
    }
};
exports.ItineraryService = ItineraryService;
exports.ItineraryService = ItineraryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ItineraryService);
//# sourceMappingURL=itinerary.service.js.map