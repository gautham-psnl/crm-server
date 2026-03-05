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
import { ProspectService } from './prospect.service';
import {
    convertEnquirySchema,
    updateProspectSchema,
} from './prospect.schema';
import type {
    ConvertEnquiryInput,
    UpdateProspectInput,
} from './prospect.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/prospects')
export class ProspectController {
    constructor(private readonly prospectService: ProspectService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'read')
    findAll(
        @Query('statusId') statusId?: string,
        @Query('ownerId') ownerId?: string,
    ) {
        return this.prospectService.findAll({ statusId, ownerId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'read')
    findById(@Param('id') id: string) {
        return this.prospectService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'update')
    @UsePipes(new ZodValidationPipe(convertEnquirySchema))
    create(@Body() dto: ConvertEnquiryInput) {
        return this.prospectService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'update')
    @UsePipes(new ZodValidationPipe(updateProspectSchema))
    update(@Param('id') id: string, @Body() dto: UpdateProspectInput) {
        return this.prospectService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'delete')
    remove(@Param('id') id: string) {
        return this.prospectService.remove(id);
    }
}
