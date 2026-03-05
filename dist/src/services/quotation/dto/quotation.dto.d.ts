export declare class CreateQuotationDto {
    prospectId: string;
    templateId: string;
    packageId?: string;
    amount: number;
    snapshotData: Record<string, any>;
    pdfUrl?: string;
}
export declare class UpdateQuotationDto {
    statusId?: string;
    amount?: number;
    snapshotData?: Record<string, any>;
    pdfUrl?: string;
}
