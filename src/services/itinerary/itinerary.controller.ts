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
import { ItineraryService } from './itinerary.service';
import {
    createItinerarySchema,
    updateItinerarySchema,
} from './itinerary.schema';
import type { CreateItineraryInput, UpdateItineraryInput } from './itinerary.schema';
import { PermissionGuard } from '../../common/guards/permission.guard';
import { RequirePermissions } from '../../common/decorators/permissions.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('api/itineraries')
export class ItineraryController {
    constructor(private readonly itineraryService: ItineraryService) { }

    @Get()
    @UseGuards(PermissionGuard)
    @RequirePermissions('itinerary', 'read')
    findAll(
        @Query('statusId') statusId?: string,
        @Query('prospectId') prospectId?: string,
    ) {
        return this.itineraryService.findAll({ statusId, prospectId });
    }

    @Get(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('itinerary', 'read')
    findById(@Param('id') id: string) {
        return this.itineraryService.findById(id);
    }

    @Post()
    @UseGuards(PermissionGuard)
    @RequirePermissions('itinerary', 'create')
    @UsePipes(new ZodValidationPipe(createItinerarySchema))
    create(@Body() dto: CreateItineraryInput) {
        return this.itineraryService.create(dto);
    }

    @Patch(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('itinerary', 'update')
    @UsePipes(new ZodValidationPipe(updateItinerarySchema))
    update(@Param('id') id: string, @Body() dto: UpdateItineraryInput) {
        return this.itineraryService.update(id, dto);
    }

    @Delete(':id')
    @UseGuards(PermissionGuard)
    @RequirePermissions('itinerary', 'delete')
    remove(@Param('id') id: string) {
        return this.itineraryService.remove(id);
    }
}
