import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IQuotationitem } from '../quotationitem.model';
import { QuotationitemService } from '../service/quotationitem.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './quotationitem-delete-dialog.component.html',
})
export class QuotationitemDeleteDialogComponent {
  quotationitem?: IQuotationitem;

  constructor(protected quotationitemService: QuotationitemService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.quotationitemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
