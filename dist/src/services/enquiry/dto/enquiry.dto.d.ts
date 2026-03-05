export declare class CreateEnquiryDto {
    name: string;
    email?: string;
    phone: string;
    destination?: string;
    budget?: number;
    sourceId: string;
    assignedToId?: string;
}
export declare class UpdateEnquiryDto {
    name?: string;
    email?: string;
    phone?: string;
    destination?: string;
    budget?: number;
    statusId?: string;
    assignedToId?: string;
}
