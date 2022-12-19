/*
 * @Author: 王浩 
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ
 * @LastEditTime: 2022-12-19 09:05:38
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/detail/quotation-detail.component.ts
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IQuotation } from '../quotation.model';

@Component({
  selector: 'jhi-quotation-detail',
  templateUrl: './quotation-detail.component.html',
})
export class QuotationDetailComponent implements OnInit {
  quotation: IQuotation | null = null;

  constructor(
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quotation }) => {
      this.quotation = quotation;
      console.log("this.quotation :" + this.quotation )
    });
  }

  /**
   * 返回上界面
   */
  previousState(): void {
    window.history.back();
  }
}
