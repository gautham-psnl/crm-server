"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentTemplateModule = void 0;
const common_1 = require("@nestjs/common");
const document_template_controller_1 = require("./document-template.controller");
const document_template_service_1 = require("./document-template.service");
let DocumentTemplateModule = class DocumentTemplateModule {
};
exports.DocumentTemplateModule = DocumentTemplateModule;
exports.DocumentTemplateModule = DocumentTemplateModule = __decorate([
    (0, common_1.Module)({
        controllers: [document_template_controller_1.DocumentTemplateController],
        providers: [document_template_service_1.DocumentTemplateService],
        exports: [document_template_service_1.DocumentTemplateService],
    })
], DocumentTemplateModule);
//# sourceMappingURL=document-template.module.js.map