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
import { DealService } from './deal.service';
import {
    createDealSchema,
    updateDealSchema,
} from './deal.schema';
import type { CreateDealInput, UpdateDealInput } from './deal.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/deals')
export class DealController {
    constructor(private readonly dealService: DealService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('deal', 'read')
    findAll(
        @Query('statusId') statusId?: string,
        @Query('ownerId') ownerId?: string,
        @Query('prospectId') prospectId?: string,
    ) {
        return this.dealService.findAll({ statusId, ownerId, prospectId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('deal', 'read')
    findById(@Param('id') id: string) {
        return this.dealService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('deal', 'create')
    @UsePipes(new ZodValidationPipe(createDealSchema))
    create(@Body() dto: CreateDealInput) {
        return this.dealService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('deal', 'update')
    @UsePipes(new ZodValidationPipe(updateDealSchema))
    update(@Param('id') id: string, @Body() dto: UpdateDealInput) {
        return this.dealService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('deal', 'delete')
    remove(@Param('id') id: string) {
        return this.dealService.remove(id);
    }
}
