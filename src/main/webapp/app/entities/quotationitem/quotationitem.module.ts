import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuotationitemComponent } from './list/quotationitem.component';
import { QuotationitemDetailComponent } from './detail/quotationitem-detail.component';
import { QuotationitemUpdateComponent } from './update/quotationitem-update.component';
import { QuotationitemDeleteDialogComponent } from './delete/quotationitem-delete-dialog.component';
import { QuotationitemRoutingModule } from './route/quotationitem-routing.module';

@NgModule({
  imports: [SharedModule, QuotationitemRoutingModule],
  declarations: [QuotationitemComponent, QuotationitemDetailComponent, QuotationitemUpdateComponent, QuotationitemDeleteDialogComponent],
})
export class QuotationitemModule {}
