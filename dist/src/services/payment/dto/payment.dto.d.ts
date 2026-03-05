export declare class CreatePaymentDto {
    invoiceId: string;
    amount: number;
    paidAt?: string;
}
export declare class UpdatePaymentDto {
    amount?: number;
    paidAt?: string;
}
