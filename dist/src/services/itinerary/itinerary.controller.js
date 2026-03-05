"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItineraryController = void 0;
const common_1 = require("@nestjs/common");
const itinerary_service_1 = require("./itinerary.service");
const itinerary_schema_1 = require("./itinerary.schema");
const permission_guard_1 = require("../../common/guards/permission.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const zod_validation_pipe_1 = require("../../common/pipes/zod-validation.pipe");
let ItineraryController = class ItineraryController {
    itineraryService;
    constructor(itineraryService) {
        this.itineraryService = itineraryService;
    }
    findAll(statusId, prospectId) {
        return this.itineraryService.findAll({ statusId, prospectId });
    }
    findById(id) {
        return this.itineraryService.findById(id);
    }
    create(dto) {
        return this.itineraryService.create(dto);
    }
    update(id, dto) {
        return this.itineraryService.update(id, dto);
    }
    remove(id) {
        return this.itineraryService.remove(id);
    }
};
exports.ItineraryController = ItineraryController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('itinerary', 'read'),
    __param(0, (0, common_1.Query)('statusId')),
    __param(1, (0, common_1.Query)('prospectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ItineraryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('itinerary', 'read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItineraryController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('itinerary', 'create'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(itinerary_schema_1.createItinerarySchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ItineraryController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('itinerary', 'update'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(itinerary_schema_1.updateItinerarySchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ItineraryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('itinerary', 'delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ItineraryController.prototype, "remove", null);
exports.ItineraryController = ItineraryController = __decorate([
    (0, common_1.Controller)('api/itineraries'),
    __metadata("design:paramtypes", [itinerary_service_1.ItineraryService])
], ItineraryController);
//# sourceMappingURL=itinerary.controller.js.map