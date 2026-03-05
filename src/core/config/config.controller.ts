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
import { ConfigService } from './config.service';
import {
    createLeadSourceSchema,
    createModuleStatusSchema,
    updateLeadSourceSchema,
    updateModuleStatusSchema,
} from './config.schema';
import type {
    CreateLeadSourceInput,
    CreateModuleStatusInput,
    UpdateLeadSourceInput,
    UpdateModuleStatusInput,
} from './config.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/config')
export class ConfigController {
    constructor(private readonly configService: ConfigService) { }

    // ───────────────────────── MODULE STATUSES ──────────────────────────────────

    @Get('statuses')
    findAllStatuses(@Query('module') module?: string) {
        return this.configService.findAllStatuses(module);
    }

    @Get('statuses/:id')
    findStatusById(@Param('id') id: string) {
        return this.configService.findStatusById(id);
    }

    @Post('statuses')
    @UseGuards(PermissionGuard)
    @RequirePermissions('config', 'create')
    @UsePipes(new ZodValidationPipe(createModuleStatusSchema))
    createStatus(@Body() dto: CreateModuleStatusInput) {
        return this.configService.createStatus(dto);
    }

    @Patch('statuses/:id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('config', 'update')
    @UsePipes(new ZodValidationPipe(updateModuleStatusSchema))
    updateStatus(@Param('id') id: string, @Body() dto: UpdateModuleStatusInput) {
        return this.configService.updateStatus(id, dto);
    }

    @Delete('statuses/:id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('config', 'delete')
    deactivateStatus(@Param('id') id: string) {
        return this.configService.deactivateStatus(id);
    }

    // ───────────────────────── LEAD SOURCES ─────────────────────────────────────

    @Get('lead-sources')
    findAllLeadSources() {
        return this.configService.findAllLeadSources();
    }

    @Get('lead-sources/:id')
    findLeadSourceById(@Param('id') id: string) {
        return this.configService.findLeadSourceById(id);
    }

    @Post('lead-sources')
    @UseGuards(PermissionGuard)
    @RequirePermissions('config', 'create')
    @UsePipes(new ZodValidationPipe(createLeadSourceSchema))
    createLeadSource(@Body() dto: CreateLeadSourceInput) {
        return this.configService.createLeadSource(dto);
    }

    @Patch('lead-sources/:id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('config', 'update')
    @UsePipes(new ZodValidationPipe(updateLeadSourceSchema))
    updateLeadSource(@Param('id') id: string, @Body() dto: UpdateLeadSourceInput) {
        return this.configService.updateLeadSource(id, dto);
    }

    @Delete('lead-sources/:id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('config', 'delete')
    deleteLeadSource(@Param('id') id: string) {
        return this.configService.deleteLeadSource(id);
    }
}
