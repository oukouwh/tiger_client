/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 53590202+oukouwh@users.noreply.github.com
 * @LastEditTime: 2022-12-20 11:48:48
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
  quotations?: IQuotation[];
  // ADD  START
  isSaving = false;
  quotation: IQuotation | null = null;
  payMasterValues = Object.keys(PayMaster);
  payFlagValues = Object.keys(PayFlag);
  orderAccuracyValues = Object.keys(OrderAccuracy);
  sendFlagValues = Object.keys(SendFlag);
  totalItems = 0;
  editForm: QuotationFormGroup = this.quotationFormService.createQuotationFormGroup();
  // ADD END

  constructor(
    protected quotationService: QuotationService,
    protected quotationFormService: QuotationFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  trackId = (_index: number, item: IQuotation): number => this.quotationService.getQuotationIdentifier(item);

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

  /**
   * 保存按钮活性非活性
   */
  protected onSaveFinalize(): void {
    this.isSaving = false;
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
