/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: 王浩
 * @LastEditTime: 2022-12-14 16:27:19
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/update/quotation-update.component.ts
 * @Description: 
 */
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { QuotationFormService, QuotationFormGroup } from './quotation-form.service';
import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';
import { PayMaster } from 'app/entities/enumerations/pay-master.model';
import { PayFlag } from 'app/entities/enumerations/pay-flag.model';
import { OrderAccuracy } from 'app/entities/enumerations/order-accuracy.model';
import { SendFlag } from 'app/entities/enumerations/send-flag.model';

import { TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { EntityArrayResponseType } from '../service/quotation.service';

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
    protected activatedRoute: ActivatedRoute,
    // private confirmationService: ConfirmationService
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

  /**
   * 打印功能
   * 
   */
  printPDF(): void {
    // TODO:
    // const data = this.createFromForm();
    // console.log("in method")
    // // data.quotationItems = this.quotationitemInstance;
    // this.confirmationService.confirm({
    //   message: '确定打印当前数据吗? ',
    //   header: '打印',
    //   accept: () => {
    //     this.quotationService.sendToServer(data).subscribe(res => {
    //       console.log(res.body);
    //       this.quotationService.download(res.body);
    //     });
    //   }
    // });
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    // $event.preventDefault();
  }

  private createFromForm(): any {
    return {
      // ...new Quotation(),
      id: this.editForm.get(['id'])!.value,
      quotationNo: this.editForm.get(['quotationNo'])!.value,
      quotationName: this.editForm.get(['quotationName'])!.value,
      quotationDate: this.editForm.get(['quotationDate'])!.value,
      workStart: this.editForm.get(['workStart'])!.value,
      workEnd: this.editForm.get(['workEnd'])!.value,
      deliveryItems: this.editForm.get(['deliveryItems'])!.value,
      deliveryDate: this.editForm.get(['deliveryDate'])!.value,
      acceptanceDate: this.editForm.get(['acceptanceDate'])!.value,
      paymentsTerms: this.editForm.get(['paymentsTerms'])!.value,
      payFlag: this.editForm.get(['payFlag'])!.value,
      quotationExpirationDate: this.editForm.get(['estimateExpirationDate'])!.value,
      totalAmount: this.editForm.get(['totalAmount'])!.value,
      customerCharge: this.editForm.get(['customerCharge'])!.value,
      accuracy: this.editForm.get(['accuracy'])!.value,
      mailSendDate: this.editForm.get(['mailSendDate'])!.value,
      postSendDate: this.editForm.get(['postSendDate'])!.value,
      sendFlag: this.editForm.get(['sendFlag'])!.value,
      salesStaff: this.editForm.get(['salesStaff'])!.value,
      salesOffice: this.editForm.get(['salesOffice'])!.value,
      updateCount: this.editForm.get(['updateCount'])!.value
    };
  }

  /**
   * 
   * @param response 
   */
  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.quotations = dataFromBody;
  }

  /**
   * 
   * @param headers 
   */
  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  /**
   * 
   * @param data 
   * @returns 
   */
  protected fillComponentAttributesFromResponseBody(data: IQuotation[] | null): IQuotation[] {
    return data ?? [];
  }


}
