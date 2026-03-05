export declare class CreateItineraryDto {
    prospectId: string;
    templateId: string;
    packageId: string;
    snapshotData: Record<string, any>;
    pdfUrl?: string;
}
export declare class UpdateItineraryDto {
    statusId?: string;
    snapshotData?: Record<string, any>;
    pdfUrl?: string;
}
