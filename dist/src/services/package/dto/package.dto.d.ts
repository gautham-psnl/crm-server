export declare class CreatePackageDto {
    destination: string;
    name: string;
    duration: number;
    price: number;
    hotelDetails: Record<string, any>;
    dayWisePlan: Record<string, any>;
    inclusions: Record<string, any>;
    exclusions: Record<string, any>;
    isActive?: boolean;
}
export declare class UpdatePackageDto {
    destination?: string;
    name?: string;
    duration?: number;
    price?: number;
    hotelDetails?: Record<string, any>;
    dayWisePlan?: Record<string, any>;
    inclusions?: Record<string, any>;
    exclusions?: Record<string, any>;
    isActive?: boolean;
}
