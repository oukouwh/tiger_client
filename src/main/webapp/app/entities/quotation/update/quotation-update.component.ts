/*
 * @Author: TSTZ
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ
 * @LastEditTime: 2022-12-13 11:14:27
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/update/quotation-update.component.ts
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { QuotationFormService, QuotationFormGroup } from './quotation-form.service';
import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';
import { PayMaster } from 'app/entities/enumerations/pay-master.model';
import { PayFlag } from 'app/entities/enumerations/pay-flag.model';
import { OrderAccuracy } from 'app/entities/enumerations/order-accuracy.model';
import { SendFlag } from 'app/entities/enumerations/send-flag.model';

@Component({
  selector: 'jhi-quotation-update',
  templateUrl: './quotation-update.component.html',
})
export class QuotationUpdateComponent implements OnInit {
  isSaving = false;
  quotation: IQuotation | null = null;
  payMasterValues = Object.keys(PayMaster);
  payFlagValues = Object.keys(PayFlag);
  orderAccuracyValues = Object.keys(OrderAccuracy);
  sendFlagValues = Object.keys(SendFlag);

  editForm: QuotationFormGroup = this.quotationFormService.createQuotationFormGroup();

  constructor(
    protected quotationService: QuotationService,
    protected quotationFormService: QuotationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quotation }) => {
      this.quotation = quotation;
      if (quotation) {
        this.updateForm(quotation);
      }
    });
  }

  /**
   * 创建新的记录保存
   */
  save(): void {
    this.isSaving = true;
    const quotation = this.quotationFormService.getQuotation(this.editForm);
    if (quotation.id !== null) {
      this.subscribeToSaveResponse(this.quotationService.update(quotation));
    } else {
      this.subscribeToSaveResponse(this.quotationService.create(quotation));
    }
  }

  /**
   * 提交保存
   * 
   * @param result 
   */
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuotation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  /**
   * 保存成功
   */
  protected onSaveSuccess(): void {
    this.previousState();
  }

  /**
   * 返回上界面
   */
  previousState(): void {
    window.history.back();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(quotation: IQuotation): void {
    this.quotation = quotation;
    this.quotationFormService.resetForm(this.editForm, quotation);
  }

  output(): void {
    alert("print pdf")
  }
}
