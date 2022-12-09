import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuotationComponent } from './list/quotation.component';
import { QuotationDetailComponent } from './detail/quotation-detail.component';
import { QuotationUpdateComponent } from './update/quotation-update.component';
import { QuotationDeleteDialogComponent } from './delete/quotation-delete-dialog.component';
import { QuotationRoutingModule } from './route/quotation-routing.module';

@NgModule({
  imports: [SharedModule, QuotationRoutingModule],
  declarations: [QuotationComponent, QuotationDetailComponent, QuotationUpdateComponent, QuotationDeleteDialogComponent],
})
export class QuotationModule {}
