import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { createInvoiceSchema, updateInvoiceSchema } from './invoice.schema';
import type { CreateInvoiceInput, UpdateInvoiceInput } from './invoice.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/invoices')
export class InvoiceController {
    constructor(private readonly invoiceService: InvoiceService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('invoice', 'read')
    findAll(
        @Query('statusId') statusId?: string,
        @Query('customerId') customerId?: string,
    ) {
        return this.invoiceService.findAll({ statusId, customerId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('invoice', 'read')
    findById(@Param('id') id: string) {
        return this.invoiceService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('invoice', 'create')
    @UsePipes(new ZodValidationPipe(createInvoiceSchema))
    create(@Body() dto: CreateInvoiceInput) {
        return this.invoiceService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('invoice', 'update')
    @UsePipes(new ZodValidationPipe(updateInvoiceSchema))
    update(@Param('id') id: string, @Body() dto: UpdateInvoiceInput) {
        return this.invoiceService.update(id, dto);
    }
}
