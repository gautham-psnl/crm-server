export declare class CreateDealDto {
    prospectId: string;
    expectedValue: number;
    probability: number;
    expectedCloseDate: string;
    ownerId: string;
}
export declare class UpdateDealDto {
    statusId?: string;
    expectedValue?: number;
    probability?: number;
    expectedCloseDate?: string;
    ownerId?: string;
}
