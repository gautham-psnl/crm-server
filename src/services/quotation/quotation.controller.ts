import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
} from '@nestjs/common';
import { QuotationService } from './quotation.service';
import {
    createQuotationSchema,
    updateQuotationSchema,
} from './quotation.schema';
import type { CreateQuotationInput, UpdateQuotationInput } from './quotation.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/quotations')
export class QuotationController {
    constructor(private readonly quotationService: QuotationService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('quotation', 'read')
    findAll(
        @Query('statusId') statusId?: string,
        @Query('prospectId') prospectId?: string,
    ) {
        return this.quotationService.findAll({ statusId, prospectId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('quotation', 'read')
    findById(@Param('id') id: string) {
        return this.quotationService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('quotation', 'create')
    @UsePipes(new ZodValidationPipe(createQuotationSchema))
    create(@Body() dto: CreateQuotationInput) {
        return this.quotationService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('quotation', 'update')
    @UsePipes(new ZodValidationPipe(updateQuotationSchema))
    update(@Param('id') id: string, @Body() dto: UpdateQuotationInput) {
        return this.quotationService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('quotation', 'delete')
    remove(@Param('id') id: string) {
        return this.quotationService.remove(id);
    }
}
