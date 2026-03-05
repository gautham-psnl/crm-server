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
import { EnquiryService } from './enquiry.service';
import {
    createEnquirySchema,
    updateEnquirySchema,
} from './enquiry.schema';
import type {
    CreateEnquiryInput,
    UpdateEnquiryInput,
} from './enquiry.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/enquiries')
export class EnquiryController {
    constructor(private readonly enquiryService: EnquiryService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'read')
    findAll(
        @Query('statusId') statusId?: string,
        @Query('sourceId') sourceId?: string,
        @Query('assignedToId') assignedToId?: string,
    ) {
        return this.enquiryService.findAll({ statusId, sourceId, assignedToId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'read')
    findById(@Param('id') id: string) {
        return this.enquiryService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'create')
    @UsePipes(new ZodValidationPipe(createEnquirySchema))
    create(@Body() dto: CreateEnquiryInput) {
        return this.enquiryService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'update')
    @UsePipes(new ZodValidationPipe(updateEnquirySchema))
    update(@Param('id') id: string, @Body() dto: UpdateEnquiryInput) {
        return this.enquiryService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('enquiry', 'delete')
    remove(@Param('id') id: string) {
        return this.enquiryService.remove(id);
    }
}
