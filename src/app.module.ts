import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { ConfigModule } from './core/config/config.module';
import { EnquiryModule } from './services/enquiry/enquiry.module';
import { ProspectModule } from './services/prospect/prospect.module';
import { DealModule } from './services/deal/deal.module';
import { ItineraryModule } from './services/itinerary/itinerary.module';
import { QuotationModule } from './services/quotation/quotation.module';
import { InvoiceModule } from './services/invoice/invoice.module';
import { PaymentModule } from './services/payment/payment.module';
import { CustomerModule } from './services/customer/customer.module';
import { PackageModule } from './services/package/package.module';
import { DocumentTemplateModule } from './services/document-template/document-template.module';
import { WebhookModule } from './services/webhook/webhook.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ConfigModule,
    EnquiryModule,
    ProspectModule,
    DealModule,
    ItineraryModule,
    QuotationModule,
    InvoiceModule,
    PaymentModule,
    CustomerModule,
    PackageModule,
    DocumentTemplateModule,
    WebhookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
