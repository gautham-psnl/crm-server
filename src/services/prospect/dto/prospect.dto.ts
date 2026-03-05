import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProspectDto {
    @IsString()
    @IsNotEmpty()
    enquiryId!: string;

    @IsString()
    @IsNotEmpty()
    ownerId!: string;
}

export class UpdateProspectDto {
    @IsString()
    @IsOptional()
    statusId?: string;

    @IsString()
    @IsOptional()
    ownerId?: string;
}
