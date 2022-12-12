/*
 * @Author: oukouwh
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 53590202+oukouwh@users.noreply.github.com
 * @LastEditTime: 2022-12-12 16:17:56
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/delete/quotation-delete-dialog.component.ts
 * @Description: 自定义界面
 */
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';

@Component({
  templateUrl: './quotation-customize.component.html',
})
export class QuotationCustomizeComponent {
  quotation?: IQuotation;

  constructor(
    protected quotationService: QuotationService, 
    protected activeModal: NgbActiveModal
  ) {}

}
