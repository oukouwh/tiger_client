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

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quotation = this.quotationFormService.getQuotation(this.editForm);
    if (quotation.id !== null) {
      this.subscribeToSaveResponse(this.quotationService.update(quotation));
    } else {
      this.subscribeToSaveResponse(this.quotationService.create(quotation));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuotation>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
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
}
