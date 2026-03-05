import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateItineraryDto {
    @IsString()
    @IsNotEmpty()
    prospectId!: string;

    @IsString()
    @IsNotEmpty()
    templateId!: string;

    @IsString()
    @IsNotEmpty()
    packageId!: string;

    @IsObject()
    snapshotData!: Record<string, any>;

    @IsString()
    @IsOptional()
    pdfUrl?: string;
}

export class UpdateItineraryDto {
    @IsString()
    @IsOptional()
    statusId?: string;

    @IsObject()
    @IsOptional()
    snapshotData?: Record<string, any>;

    @IsString()
    @IsOptional()
    pdfUrl?: string;
}
