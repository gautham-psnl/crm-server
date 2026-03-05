import { ItineraryService } from './itinerary.service';
import type { CreateItineraryInput, UpdateItineraryInput } from './itinerary.schema';
export declare class ItineraryController {
    private readonly itineraryService;
    constructor(itineraryService: ItineraryService);
    findAll(statusId?: string, prospectId?: string): import("@prisma/client").Prisma.PrismaPromise<({
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
    }>;
    create(dto: CreateItineraryInput): Promise<{
        prospect: {
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
    }>;
    update(id: string, dto: UpdateItineraryInput): Promise<{
        prospect: {
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
    } & {
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        statusId: string;
        prospectId: string;
        templateId: string;
        packageId: string;
        snapshotData: import("@prisma/client/runtime/client").JsonValue;
        pdfUrl: string | null;
    }>;
}
