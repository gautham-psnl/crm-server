import { PackageService } from './package.service';
import type { CreatePackageInput, UpdatePackageInput } from './package.schema';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    findAll(destination?: string, isActive?: string): import("@prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        duration: number;
        destination: string;
        price: number;
        hotelDetails: import("@prisma/client/runtime/client").JsonValue;
        dayWisePlan: import("@prisma/client/runtime/client").JsonValue;
        inclusions: import("@prisma/client/runtime/client").JsonValue;
        exclusions: import("@prisma/client/runtime/client").JsonValue;
    }[]>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        duration: number;
        destination: string;
        price: number;
        hotelDetails: import("@prisma/client/runtime/client").JsonValue;
        dayWisePlan: import("@prisma/client/runtime/client").JsonValue;
        inclusions: import("@prisma/client/runtime/client").JsonValue;
        exclusions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    create(dto: CreatePackageInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        duration: number;
        destination: string;
        price: number;
        hotelDetails: import("@prisma/client/runtime/client").JsonValue;
        dayWisePlan: import("@prisma/client/runtime/client").JsonValue;
        inclusions: import("@prisma/client/runtime/client").JsonValue;
        exclusions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    update(id: string, dto: UpdatePackageInput): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        duration: number;
        destination: string;
        price: number;
        hotelDetails: import("@prisma/client/runtime/client").JsonValue;
        dayWisePlan: import("@prisma/client/runtime/client").JsonValue;
        inclusions: import("@prisma/client/runtime/client").JsonValue;
        exclusions: import("@prisma/client/runtime/client").JsonValue;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        isActive: boolean;
        duration: number;
        destination: string;
        price: number;
        hotelDetails: import("@prisma/client/runtime/client").JsonValue;
        dayWisePlan: import("@prisma/client/runtime/client").JsonValue;
        inclusions: import("@prisma/client/runtime/client").JsonValue;
        exclusions: import("@prisma/client/runtime/client").JsonValue;
    }>;
}
