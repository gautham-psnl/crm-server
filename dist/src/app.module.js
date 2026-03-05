"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_module_1 = require("./core/database/database.module");
const auth_module_1 = require("./core/auth/auth.module");
const config_module_1 = require("./core/config/config.module");
const enquiry_module_1 = require("./services/enquiry/enquiry.module");
const prospect_module_1 = require("./services/prospect/prospect.module");
const deal_module_1 = require("./services/deal/deal.module");
const itinerary_module_1 = require("./services/itinerary/itinerary.module");
const quotation_module_1 = require("./services/quotation/quotation.module");
const invoice_module_1 = require("./services/invoice/invoice.module");
const payment_module_1 = require("./services/payment/payment.module");
const customer_module_1 = require("./services/customer/customer.module");
const package_module_1 = require("./services/package/package.module");
const document_template_module_1 = require("./services/document-template/document-template.module");
const webhook_module_1 = require("./services/webhook/webhook.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            config_module_1.ConfigModule,
            enquiry_module_1.EnquiryModule,
            prospect_module_1.ProspectModule,
            deal_module_1.DealModule,
            itinerary_module_1.ItineraryModule,
            quotation_module_1.QuotationModule,
            invoice_module_1.InvoiceModule,
            payment_module_1.PaymentModule,
            customer_module_1.CustomerModule,
            package_module_1.PackageModule,
            document_template_module_1.DocumentTemplateModule,
            webhook_module_1.WebhookModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map