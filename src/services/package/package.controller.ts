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
import { PackageService } from './package.service';
import {
    createPackageSchema,
    updatePackageSchema,
} from './package.schema';
import type {
    CreatePackageInput,
    UpdatePackageInput,
} from './package.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/packages')
export class PackageController {
    constructor(private readonly packageService: PackageService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('package', 'read')
    findAll(
        @Query('destination') destination?: string,
        @Query('isActive') isActive?: string,
    ) {
        const parsedIsActive =
            isActive !== undefined ? isActive === 'true' : undefined;
        return this.packageService.findAll({
            destination,
            isActive: parsedIsActive,
        });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('package', 'read')
    findById(@Param('id') id: string) {
        return this.packageService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('package', 'create')
    @UsePipes(new ZodValidationPipe(createPackageSchema))
    create(@Body() dto: CreatePackageInput) {
        return this.packageService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('package', 'update')
    @UsePipes(new ZodValidationPipe(updatePackageSchema))
    update(@Param('id') id: string, @Body() dto: UpdatePackageInput) {
        return this.packageService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('package', 'delete')
    remove(@Param('id') id: string) {
        return this.packageService.remove(id);
    }
}
