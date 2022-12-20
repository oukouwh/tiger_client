import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IQuotation, NewQuotation } from '../quotation.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IQuotation for edit and NewQuotationFormGroupInput for create.
 */
type QuotationFormGroupInput = IQuotation | PartialWithRequiredKeyOf<NewQuotation>;

type QuotationFormDefaults = Pick<NewQuotation, 'id'>;

type QuotationFormGroupContent = {
  id: FormControl<IQuotation['id'] | NewQuotation['id']>;
  quotationNo: FormControl<IQuotation['quotationNo']>;
  quotationName: FormControl<IQuotation['quotationName']>;
  quotationDate: FormControl<IQuotation['quotationDate']>;
  workStart: FormControl<IQuotation['workStart']>;
  workEnd: FormControl<IQuotation['workEnd']>;
  deliveryItems: FormControl<IQuotation['deliveryItems']>;
  deliveryDate: FormControl<IQuotation['deliveryDate']>;
  acceptanceDate: FormControl<IQuotation['acceptanceDate']>;
  paymentsTerms: FormControl<IQuotation['paymentsTerms']>;
  payFlag: FormControl<IQuotation['payFlag']>;
  quotationExpirationDate: FormControl<IQuotation['quotationExpirationDate']>;
  totalAmount: FormControl<IQuotation['totalAmount']>;
  customerCharge: FormControl<IQuotation['customerCharge']>;
  accuracy: FormControl<IQuotation['accuracy']>;
  mailSendDate: FormControl<IQuotation['mailSendDate']>;
  postSendDate: FormControl<IQuotation['postSendDate']>;
  sendFlag: FormControl<IQuotation['sendFlag']>;
  salesStaff: FormControl<IQuotation['salesStaff']>;
  salesOffice: FormControl<IQuotation['salesOffice']>;
  updateCount: FormControl<IQuotation['updateCount']>;
};

export type QuotationFormGroup = FormGroup<QuotationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class QuotationFormService {
  createQuotationFormGroup(quotation: QuotationFormGroupInput = { id: null }): QuotationFormGroup {
    const quotationRawValue = {
      ...this.getFormDefaults(),
      ...quotation,
    };
    return new FormGroup<QuotationFormGroupContent>({
      id: new FormControl(
        { value: quotationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      quotationNo: new FormControl(quotationRawValue.quotationNo, {
        validators: [Validators.required],
      }),
      quotationName: new FormControl(quotationRawValue.quotationName, {
        validators: [Validators.required, Validators.maxLength(100)],
      }),
      quotationDate: new FormControl(quotationRawValue.quotationDate, {
        validators: [Validators.required],
      }),
      workStart: new FormControl(quotationRawValue.workStart, {
        validators: [Validators.required],
      }),
      workEnd: new FormControl(quotationRawValue.workEnd, {
        validators: [Validators.required],
      }),
      deliveryItems: new FormControl(quotationRawValue.deliveryItems, {
        validators: [Validators.required],
      }),
      deliveryDate: new FormControl(quotationRawValue.deliveryDate, {
        validators: [Validators.required],
      }),
      acceptanceDate: new FormControl(quotationRawValue.acceptanceDate, {
        validators: [Validators.required],
      }),
      paymentsTerms: new FormControl(quotationRawValue.paymentsTerms, {
        validators: [Validators.required],
      }),
      payFlag: new FormControl(quotationRawValue.payFlag, {
        validators: [Validators.required],
      }),
      quotationExpirationDate: new FormControl(quotationRawValue.quotationExpirationDate, {
        validators: [Validators.required],
      }),
      totalAmount: new FormControl(quotationRawValue.totalAmount, {
        validators: [Validators.required, Validators.max(999999999)],
      }),
      customerCharge: new FormControl(quotationRawValue.customerCharge),
      accuracy: new FormControl(quotationRawValue.accuracy),
      mailSendDate: new FormControl(quotationRawValue.mailSendDate),
      postSendDate: new FormControl(quotationRawValue.postSendDate),
      sendFlag: new FormControl(quotationRawValue.sendFlag),
      salesStaff: new FormControl(quotationRawValue.salesStaff),
      salesOffice: new FormControl(quotationRawValue.salesOffice),
      updateCount: new FormControl(quotationRawValue.updateCount),
      // ADD 
      
    });
  }

  getQuotation(form: QuotationFormGroup): IQuotation | NewQuotation {
    return form.getRawValue() as IQuotation | NewQuotation;
  }

  resetForm(form: QuotationFormGroup, quotation: QuotationFormGroupInput): void {
    const quotationRawValue = { ...this.getFormDefaults(), ...quotation };
    form.reset(
      {
        ...quotationRawValue,
        id: { value: quotationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): QuotationFormDefaults {
    return {
      id: null,
    };
  }
}
