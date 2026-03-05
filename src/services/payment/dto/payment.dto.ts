import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    invoiceId!: string;

    @IsNumber()
    amount!: number;

    @IsDateString()
    @IsOptional()
    paidAt?: string;
}

export class UpdatePaymentDto {
    @IsNumber()
    @IsOptional()
    amount?: number;

    @IsDateString()
    @IsOptional()
    paidAt?: string;
}
