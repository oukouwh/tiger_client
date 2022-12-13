/*
 * @Author: oukouwh
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 
 * @LastEditTime: 2022-12-13 15:43:01
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/delete/quotation-delete-dialog.component.ts
 * @Description: 删除界面逻辑
 */
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './quotation-delete-dialog.component.html',
})
export class QuotationDeleteDialogComponent {
  quotation?: IQuotation;

  constructor(
    protected quotationService: QuotationService, 
    protected activeModal: NgbActiveModal
  ) {}

  /**
   * 取消
   */
  cancel(): void {
    this.activeModal.dismiss();
  }

  /**
   * 确定删除
   * @param id 
   */
  confirmDelete(id: number): void {
    this.quotationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
