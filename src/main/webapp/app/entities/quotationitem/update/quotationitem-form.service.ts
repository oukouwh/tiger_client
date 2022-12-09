import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuotationitem, NewQuotationitem } from '../quotationitem.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuotationitem for edit and NewQuotationitemFormGroupInput for create.
 */
type QuotationitemFormGroupInput = IQuotationitem | PartialWithRequiredKeyOf<NewQuotationitem>;

type QuotationitemFormDefaults = Pick<NewQuotationitem, 'id'>;

type QuotationitemFormGroupContent = {
  id: FormControl<IQuotationitem['id'] | NewQuotationitem['id']>;
  quotationNo: FormControl<IQuotationitem['quotationNo']>;
  quotationItemNo: FormControl<IQuotationitem['quotationItemNo']>;
  workerName: FormControl<IQuotationitem['workerName']>;
  standardPrice: FormControl<IQuotationitem['standardPrice']>;
  count: FormControl<IQuotationitem['count']>;
  upperLimitHour: FormControl<IQuotationitem['upperLimitHour']>;
  lowerLimitHour: FormControl<IQuotationitem['lowerLimitHour']>;
  additionalPrice: FormControl<IQuotationitem['additionalPrice']>;
  deductionPrice: FormControl<IQuotationitem['deductionPrice']>;
  memo: FormControl<IQuotationitem['memo']>;
  updateCount: FormControl<IQuotationitem['updateCount']>;
  quotation: FormControl<IQuotationitem['quotation']>;
};

export type QuotationitemFormGroup = FormGroup<QuotationitemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuotationitemFormService {
  createQuotationitemFormGroup(quotationitem: QuotationitemFormGroupInput = { id: null }): QuotationitemFormGroup {
    const quotationitemRawValue = {
      ...this.getFormDefaults(),
      ...quotationitem,
    };
    return new FormGroup<QuotationitemFormGroupContent>({
      id: new FormControl(
        { value: quotationitemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quotationNo: new FormControl(quotationitemRawValue.quotationNo, {
        validators: [Validators.required],
      }),
      quotationItemNo: new FormControl(quotationitemRawValue.quotationItemNo, {
        validators: [Validators.required],
      }),
      workerName: new FormControl(quotationitemRawValue.workerName, {
        validators: [Validators.required],
      }),
      standardPrice: new FormControl(quotationitemRawValue.standardPrice, {
        validators: [Validators.required, Validators.max(999999999)],
      }),
      count: new FormControl(quotationitemRawValue.count, {
        validators: [Validators.required],
      }),
      upperLimitHour: new FormControl(quotationitemRawValue.upperLimitHour, {
        validators: [Validators.required, Validators.max(999)],
      }),
      lowerLimitHour: new FormControl(quotationitemRawValue.lowerLimitHour, {
        validators: [Validators.required, Validators.max(999)],
      }),
      additionalPrice: new FormControl(quotationitemRawValue.additionalPrice, {
        validators: [Validators.required, Validators.max(999999999)],
      }),
      deductionPrice: new FormControl(quotationitemRawValue.deductionPrice, {
        validators: [Validators.max(999999999)],
      }),
      memo: new FormControl(quotationitemRawValue.memo, {
        validators: [Validators.required, Validators.maxLength(255)],
      }),
      updateCount: new FormControl(quotationitemRawValue.updateCount),
      quotation: new FormControl(quotationitemRawValue.quotation),
    });
  }

  getQuotationitem(form: QuotationitemFormGroup): IQuotationitem | NewQuotationitem {
    return form.getRawValue() as IQuotationitem | NewQuotationitem;
  }

  resetForm(form: QuotationitemFormGroup, quotationitem: QuotationitemFormGroupInput): void {
    const quotationitemRawValue = { ...this.getFormDefaults(), ...quotationitem };
    form.reset(
      {
        ...quotationitemRawValue,
        id: { value: quotationitemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): QuotationitemFormDefaults {
    return {
      id: null,
    };
  }
}
