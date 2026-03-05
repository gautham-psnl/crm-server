import { PrismaService } from '../../core/database/prisma.service';
import { CreateDealInput, UpdateDealInput } from './deal.schema';
export declare class DealService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(filters?: {
        statusId?: string;
        ownerId?: string;
        prospectId?: string;
    }): import("@prisma/client").Prisma.PrismaPromise<({
        prospect: {
            enquiry: {
                id: string;
                name: string;
                createdAt: Date;
                email: string | null;
                phone: string;
                destination: string | null;
                budget: number | null;
                statusId: string;
                sourceId: string;
                assignedToId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            enquiryId: string;
            ownerId: string;
        };
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        updatedAt: Date;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    })[]>;
    findById(id: string): Promise<{
        prospect: {
            enquiry: {
                id: string;
                name: string;
                createdAt: Date;
                email: string | null;
                phone: string;
                destination: string | null;
                budget: number | null;
                statusId: string;
                sourceId: string;
                assignedToId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            statusId: string;
            enquiryId: string;
            ownerId: string;
        };
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        updatedAt: Date;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    }>;
    create(dto: CreateDealInput): Promise<{
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        updatedAt: Date;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    }>;
    update(id: string, dto: UpdateDealInput): Promise<{
        status: {
            id: string;
            name: string;
            createdAt: Date;
            module: string;
            color: string | null;
            sortOrder: number;
            isFinal: boolean;
            isActive: boolean;
        };
        owner: {
            id: string;
            name: string;
            createdAt: Date;
            email: string;
            emailVerified: boolean;
            image: string | null;
            updatedAt: Date;
            role: string | null;
            banned: boolean | null;
            banReason: string | null;
            banExpires: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        updatedAt: Date;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        statusId: string;
        updatedAt: Date;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    }>;
}
