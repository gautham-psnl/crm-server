import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

export class CreateQuotationDto {
    @IsString()
    @IsNotEmpty()
    prospectId!: string;

    @IsString()
    @IsNotEmpty()
    templateId!: string;

    @IsString()
    @IsOptional()
    packageId?: string;

    @IsNumber()
    amount!: number;

    @IsObject()
    snapshotData!: Record<string, any>;

    @IsString()
    @IsOptional()
    pdfUrl?: string;
}

export class UpdateQuotationDto {
    @IsString()
    @IsOptional()
    statusId?: string;

    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsObject()
    @IsOptional()
    snapshotData?: Record<string, any>;

    @IsString()
    @IsOptional()
    pdfUrl?: string;
}
