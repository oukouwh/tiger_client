import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { QuotationitemFormService, QuotationitemFormGroup } from './quotationitem-form.service';
import { IQuotationitem } from '../quotationitem.model';
import { QuotationitemService } from '../service/quotationitem.service';
import { IQuotation } from 'app/entities/quotation/quotation.model';
import { QuotationService } from 'app/entities/quotation/service/quotation.service';

@Component({
  selector: 'jhi-quotationitem-update',
  templateUrl: './quotationitem-update.component.html',
})
export class QuotationitemUpdateComponent implements OnInit {
  isSaving = false;
  quotationitem: IQuotationitem | null = null;

  quotationsSharedCollection: IQuotation[] = [];

  editForm: QuotationitemFormGroup = this.quotationitemFormService.createQuotationitemFormGroup();

  constructor(
    protected quotationitemService: QuotationitemService,
    protected quotationitemFormService: QuotationitemFormService,
    protected quotationService: QuotationService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareQuotation = (o1: IQuotation | null, o2: IQuotation | null): boolean => this.quotationService.compareQuotation(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quotationitem }) => {
      this.quotationitem = quotationitem;
      if (quotationitem) {
        this.updateForm(quotationitem);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const quotationitem = this.quotationitemFormService.getQuotationitem(this.editForm);
    if (quotationitem.id !== null) {
      this.subscribeToSaveResponse(this.quotationitemService.update(quotationitem));
    } else {
      this.subscribeToSaveResponse(this.quotationitemService.create(quotationitem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IQuotationitem>>): void {
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

  protected updateForm(quotationitem: IQuotationitem): void {
    this.quotationitem = quotationitem;
    this.quotationitemFormService.resetForm(this.editForm, quotationitem);

    this.quotationsSharedCollection = this.quotationService.addQuotationToCollectionIfMissing<IQuotation>(
      this.quotationsSharedCollection,
      quotationitem.quotation
    );
  }

  protected loadRelationshipsOptions(): void {
    this.quotationService
      .query()
      .pipe(map((res: HttpResponse<IQuotation[]>) => res.body ?? []))
      .pipe(
        map((quotations: IQuotation[]) =>
          this.quotationService.addQuotationToCollectionIfMissing<IQuotation>(quotations, this.quotationitem?.quotation)
        )
      )
      .subscribe((quotations: IQuotation[]) => (this.quotationsSharedCollection = quotations));
  }
}
