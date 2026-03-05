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
import { DocumentTemplateService } from './document-template.service';
import {
    createDocumentTemplateSchema,
    updateDocumentTemplateSchema,
} from './document-template.schema';
import type {
    CreateDocumentTemplateInput,
    UpdateDocumentTemplateInput,
} from './document-template.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/document-templates')
export class DocumentTemplateController {
    constructor(
        private readonly documentTemplateService: DocumentTemplateService,
    ) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('documentTemplate', 'read')
    findAll(
        @Query('destination') destination?: string,
        @Query('type') type?: string,
        @Query('isActive') isActive?: string,
    ) {
        const parsedIsActive =
            isActive !== undefined ? isActive === 'true' : undefined;
        return this.documentTemplateService.findAll({
            destination,
            type,
            isActive: parsedIsActive,
        });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('documentTemplate', 'read')
    findById(@Param('id') id: string) {
        return this.documentTemplateService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('documentTemplate', 'create')
    @UsePipes(new ZodValidationPipe(createDocumentTemplateSchema))
    create(@Body() dto: CreateDocumentTemplateInput) {
        return this.documentTemplateService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('documentTemplate', 'update')
    @UsePipes(new ZodValidationPipe(updateDocumentTemplateSchema))
    update(@Param('id') id: string, @Body() dto: UpdateDocumentTemplateInput) {
        return this.documentTemplateService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('documentTemplate', 'delete')
    remove(@Param('id') id: string) {
        return this.documentTemplateService.remove(id);
    }
}
