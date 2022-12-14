/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ
 * @LastEditTime: 2022-12-14 16:28:14
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/customize/quotation-customize.component.ts
 * @Description: 自定义界面
 */
import { Component, OnInit } from '@angular/core';
import { QuotationFormService, QuotationFormGroup } from '../update/quotation-form.service';
import { ActivatedRoute } from '@angular/router';
import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';
import { PayMaster } from 'app/entities/enumerations/pay-master.model';
import { PayFlag } from 'app/entities/enumerations/pay-flag.model';
import { OrderAccuracy } from 'app/entities/enumerations/order-accuracy.model';
import { SendFlag } from 'app/entities/enumerations/send-flag.model';

@Component({
  selector: 'jhi-quotation-customize',
  templateUrl: './quotation-customize.component.html',
  styleUrls: ['./quotation-customize.component.scss']
})
export class QuotationCustomizeComponent implements OnInit {
  quotation: IQuotation | null = null;
  payMasterValues = Object.keys(PayMaster);
  payFlagValues = Object.keys(PayFlag);
  orderAccuracyValues = Object.keys(OrderAccuracy);
  sendFlagValues = Object.keys(SendFlag);

  constructor(
    protected quotationService: QuotationService,
    protected activatedRoute: ActivatedRoute,
    protected quotationFormService: QuotationFormService,
  ) { }

  editForm: QuotationFormGroup = this.quotationFormService.createQuotationFormGroup();
  trackId = (_index: number, item: IQuotation): number => this.quotationService.getQuotationIdentifier(item);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quotation }) => {
      this.quotation = quotation;
      if (quotation) {
        this.updateForm(quotation);
      }
    });
  }

  printPDF(): void {
    // TODO
  }

  /**
   * 表单更新
   * @param quotation 
   */
  protected updateForm(quotation: IQuotation): void {
    this.quotation = quotation;
    this.quotationFormService.resetForm(this.editForm, quotation);
  }

}