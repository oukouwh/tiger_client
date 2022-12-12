/*
 * @Author: TSTZ 
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 53590202+oukouwh@users.noreply.github.com
 * @LastEditTime: 2022-12-12 12:04:35
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/quotation.module.ts
 * @Description: 模块引入
 */
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QuotationComponent } from './list/quotation.component';
import { QuotationDetailComponent } from './detail/quotation-detail.component';
import { QuotationUpdateComponent } from './update/quotation-update.component';
import { QuotationDeleteDialogComponent } from './delete/quotation-delete-dialog.component';
import { QuotationRoutingModule } from './route/quotation-routing.module';
import { QuotationCustomizeComponent } from './customize/quotation-customize.component';

@NgModule({
  imports: [
    SharedModule, 
    QuotationRoutingModule
  ],
  declarations: [
    QuotationComponent, 
    QuotationDetailComponent, 
    QuotationUpdateComponent, 
    QuotationDeleteDialogComponent,
    // ADD
    QuotationCustomizeComponent
  ],
})
export class QuotationModule {}
