import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { createPaymentSchema } from './payment.schema';
import type { CreatePaymentInput } from './payment.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/payments')
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('invoice', 'read')
    findAll(@Query('invoiceId') invoiceId?: string) {
        return this.paymentService.findAll({ invoiceId });
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('invoice', 'update')
    @UsePipes(new ZodValidationPipe(createPaymentSchema))
    create(@Body() dto: CreatePaymentInput) {
        return this.paymentService.create(dto);
    }
}
