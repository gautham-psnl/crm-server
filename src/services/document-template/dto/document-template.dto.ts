import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentTemplateDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    destination!: string;

    @IsString()
    @IsNotEmpty()
    type!: string; // ITINERARY or QUOTATION

    @IsString()
    @IsNotEmpty()
    htmlTemplate!: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

export class UpdateDocumentTemplateDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    destination?: string;

    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    htmlTemplate?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
