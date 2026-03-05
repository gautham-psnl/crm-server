import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePackageInput, UpdatePackageInput } from './package.schema';

@Injectable()
export class PackageService {
    constructor(private readonly prisma: PrismaService) { }

    findAll(filters?: { destination?: string; isActive?: boolean }) {
        return this.prisma.package.findMany({
            where: {
                ...(filters?.destination && { destination: filters.destination }),
                ...(filters?.isActive !== undefined && { isActive: filters.isActive }),
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findById(id: string) {
        const pkg = await this.prisma.package.findUnique({
            where: { id },
        });
        if (!pkg) throw new NotFoundException(`Package ${id} not found`);
        return pkg;
    }

    async create(dto: CreatePackageInput) {
        return this.prisma.package.create({
            data: {
                ...dto,
                hotelDetails: dto.hotelDetails as Prisma.InputJsonValue,
                dayWisePlan: dto.dayWisePlan as Prisma.InputJsonValue,
                inclusions: dto.inclusions as Prisma.InputJsonValue,
                exclusions: dto.exclusions as Prisma.InputJsonValue,
            },
        });
    }

    async update(id: string, dto: UpdatePackageInput) {
        await this.findById(id); // Ensure exists
        return this.prisma.package.update({
            where: { id },
            data: dto,
        });
    }

    async remove(id: string) {
        await this.findById(id);
        return this.prisma.package.delete({ where: { id } });
    }
}
