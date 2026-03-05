import { DealService } from './deal.service';
import type { CreateDealInput, UpdateDealInput } from './deal.schema';
export declare class DealController {
    private readonly dealService;
    constructor(dealService: DealService);
    findAll(statusId?: string, ownerId?: string, prospectId?: string): import("@prisma/client").Prisma.PrismaPromise<({
        prospect: {
            enquiry: {
                id: string;
                name: string;
                createdAt: Date;
                email: string | null;
                phone: string;
                destination: string | null;
                budget: number | null;
                sourceId: string;
                assignedToId: string | null;
                statusId: string;
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
        updatedAt: Date;
        statusId: string;
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
                sourceId: string;
                assignedToId: string | null;
                statusId: string;
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
        updatedAt: Date;
        statusId: string;
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
        updatedAt: Date;
        statusId: string;
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
            updatedAt: Date;
            emailVerified: boolean;
            image: string | null;
            role: string | null;
            banReason: string | null;
            banned: boolean | null;
            banExpires: Date | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statusId: string;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        statusId: string;
        ownerId: string;
        prospectId: string;
        expectedValue: number;
        probability: number;
        expectedCloseDate: Date;
    }>;
}
