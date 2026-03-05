export declare class CreateModuleStatusDto {
    module: string;
    name: string;
    color?: string;
    sortOrder: number;
    isFinal?: boolean;
}
export declare class UpdateModuleStatusDto {
    name?: string;
    color?: string;
    sortOrder?: number;
    isFinal?: boolean;
    isActive?: boolean;
}
export declare class CreateLeadSourceDto {
    type: string;
    name: string;
}
export declare class UpdateLeadSourceDto {
    type?: string;
    name?: string;
}
