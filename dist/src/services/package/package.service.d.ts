import { PrismaService } from '../../core/database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePackageInput, UpdatePackageInput } from './package.schema';
export declare class PackageService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        destination?: string;
        isActive?: boolean;
    }): Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        duration: number;
        price: number;
        hotelDetails: Prisma.JsonValue;
        dayWisePlan: Prisma.JsonValue;
        inclusions: Prisma.JsonValue;
        exclusions: Prisma.JsonValue;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        duration: number;
        price: number;
        hotelDetails: Prisma.JsonValue;
        dayWisePlan: Prisma.JsonValue;
        inclusions: Prisma.JsonValue;
        exclusions: Prisma.JsonValue;
    }>;
    create(dto: CreatePackageInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        duration: number;
        price: number;
        hotelDetails: Prisma.JsonValue;
        dayWisePlan: Prisma.JsonValue;
        inclusions: Prisma.JsonValue;
        exclusions: Prisma.JsonValue;
    }>;
    update(id: string, dto: UpdatePackageInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        duration: number;
        price: number;
        hotelDetails: Prisma.JsonValue;
        dayWisePlan: Prisma.JsonValue;
        inclusions: Prisma.JsonValue;
        exclusions: Prisma.JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        destination: string;
        duration: number;
        price: number;
        hotelDetails: Prisma.JsonValue;
        dayWisePlan: Prisma.JsonValue;
        inclusions: Prisma.JsonValue;
        exclusions: Prisma.JsonValue;
    }>;
}
