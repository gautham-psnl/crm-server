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
exports.DocumentTemplateController = void 0;
const common_1 = require("@nestjs/common");
const document_template_service_1 = require("./document-template.service");
const document_template_schema_1 = require("./document-template.schema");
const permission_guard_1 = require("../../common/guards/permission.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const zod_validation_pipe_1 = require("../../common/pipes/zod-validation.pipe");
let DocumentTemplateController = class DocumentTemplateController {
    documentTemplateService;
    constructor(documentTemplateService) {
        this.documentTemplateService = documentTemplateService;
    }
    findAll(destination, type, isActive) {
        const parsedIsActive = isActive !== undefined ? isActive === 'true' : undefined;
        return this.documentTemplateService.findAll({
            destination,
            type,
            isActive: parsedIsActive,
        });
    }
    findById(id) {
        return this.documentTemplateService.findById(id);
    }
    create(dto) {
        return this.documentTemplateService.create(dto);
    }
    update(id, dto) {
        return this.documentTemplateService.update(id, dto);
    }
    remove(id) {
        return this.documentTemplateService.remove(id);
    }
};
exports.DocumentTemplateController = DocumentTemplateController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('documentTemplate', 'read'),
    __param(0, (0, common_1.Query)('destination')),
    __param(1, (0, common_1.Query)('type')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DocumentTemplateController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('documentTemplate', 'read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentTemplateController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('documentTemplate', 'create'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(document_template_schema_1.createDocumentTemplateSchema)),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DocumentTemplateController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('documentTemplate', 'update'),
    (0, common_1.UsePipes)(new zod_validation_pipe_1.ZodValidationPipe(document_template_schema_1.updateDocumentTemplateSchema)),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DocumentTemplateController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(permission_guard_1.PermissionGuard),
    (0, permissions_decorator_1.RequirePermissions)('documentTemplate', 'delete'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentTemplateController.prototype, "remove", null);
exports.DocumentTemplateController = DocumentTemplateController = __decorate([
    (0, common_1.Controller)('api/document-templates'),
    __metadata("design:paramtypes", [document_template_service_1.DocumentTemplateService])
], DocumentTemplateController);
//# sourceMappingURL=document-template.controller.js.map