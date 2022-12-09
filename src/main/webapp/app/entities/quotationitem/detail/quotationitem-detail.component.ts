import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuotationitem } from '../quotationitem.model';

@Component({
  selector: 'jhi-quotationitem-detail',
  templateUrl: './quotationitem-detail.component.html',
})
export class QuotationitemDetailComponent implements OnInit {
  quotationitem: IQuotationitem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quotationitem }) => {
      this.quotationitem = quotationitem;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
