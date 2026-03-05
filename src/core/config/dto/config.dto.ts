import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

// ─── Module Status DTOs ───────────────────────────────────────────────────────

export class CreateModuleStatusDto {
    @IsString()
    @IsNotEmpty()
    module!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    color?: string;

    @IsInt()
    @Min(0)
    sortOrder!: number;

    @IsBoolean()
    @IsOptional()
    isFinal?: boolean;
}

export class UpdateModuleStatusDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    color?: string;

    @IsInt()
    @Min(0)
    @IsOptional()
    sortOrder?: number;

    @IsBoolean()
    @IsOptional()
    isFinal?: boolean;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}

// ─── Lead Source DTOs ─────────────────────────────────────────────────────────

export class CreateLeadSourceDto {
    @IsString()
    @IsNotEmpty()
    type!: string;

    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UpdateLeadSourceDto {
    @IsString()
    @IsOptional()
    type?: string;

    @IsString()
    @IsOptional()
    name?: string;
}
