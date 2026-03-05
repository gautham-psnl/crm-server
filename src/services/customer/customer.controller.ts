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
import { CustomerService } from './customer.service';
import {
    createCustomerSchema,
    updateCustomerSchema,
} from './customer.schema';
import type {
    CreateCustomerInput,
    UpdateCustomerInput,
} from './customer.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/customers')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('customer', 'read')
    findAll(
        @Query('source') source?: string,
        @Query('sourceRefId') sourceRefId?: string,
    ) {
        return this.customerService.findAll({ source, sourceRefId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('customer', 'read')
    findById(@Param('id') id: string) {
        return this.customerService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('customer', 'create')
    @UsePipes(new ZodValidationPipe(createCustomerSchema))
    create(@Body() dto: CreateCustomerInput) {
        return this.customerService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('customer', 'update')
    @UsePipes(new ZodValidationPipe(updateCustomerSchema))
    update(@Param('id') id: string, @Body() dto: UpdateCustomerInput) {
        return this.customerService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('customer', 'delete')
    remove(@Param('id') id: string) {
        return this.customerService.remove(id);
    }
}
