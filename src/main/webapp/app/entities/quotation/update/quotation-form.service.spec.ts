import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quotation.test-samples';

import { QuotationFormService } from './quotation-form.service';

describe('Quotation Form Service', () => {
  let service: QuotationFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationFormService);
  });

  describe('Service methods', () => {
    describe('createQuotationFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuotationFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quotationNo: expect.any(Object),
            quotationName: expect.any(Object),
            quotationDate: expect.any(Object),
            workStart: expect.any(Object),
            workEnd: expect.any(Object),
            deliveryItems: expect.any(Object),
            deliveryDate: expect.any(Object),
            acceptanceDate: expect.any(Object),
            paymentsTerms: expect.any(Object),
            payFlag: expect.any(Object),
            quotationExpirationDate: expect.any(Object),
            totalAmount: expect.any(Object),
            customerCharge: expect.any(Object),
            accuracy: expect.any(Object),
            mailSendDate: expect.any(Object),
            postSendDate: expect.any(Object),
            sendFlag: expect.any(Object),
            salesStaff: expect.any(Object),
            salesOffice: expect.any(Object),
            updateCount: expect.any(Object),
          })
        );
      });

      it('passing IQuotation should create a new form with FormGroup', () => {
        const formGroup = service.createQuotationFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quotationNo: expect.any(Object),
            quotationName: expect.any(Object),
            quotationDate: expect.any(Object),
            workStart: expect.any(Object),
            workEnd: expect.any(Object),
            deliveryItems: expect.any(Object),
            deliveryDate: expect.any(Object),
            acceptanceDate: expect.any(Object),
            paymentsTerms: expect.any(Object),
            payFlag: expect.any(Object),
            quotationExpirationDate: expect.any(Object),
            totalAmount: expect.any(Object),
            customerCharge: expect.any(Object),
            accuracy: expect.any(Object),
            mailSendDate: expect.any(Object),
            postSendDate: expect.any(Object),
            sendFlag: expect.any(Object),
            salesStaff: expect.any(Object),
            salesOffice: expect.any(Object),
            updateCount: expect.any(Object),
          })
        );
      });
    });

    describe('getQuotation', () => {
      it('should return NewQuotation for default Quotation initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createQuotationFormGroup(sampleWithNewData);

        const quotation = service.getQuotation(formGroup) as any;

        expect(quotation).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuotation for empty Quotation initial value', () => {
        const formGroup = service.createQuotationFormGroup();

        const quotation = service.getQuotation(formGroup) as any;

        expect(quotation).toMatchObject({});
      });

      it('should return IQuotation', () => {
        const formGroup = service.createQuotationFormGroup(sampleWithRequiredData);

        const quotation = service.getQuotation(formGroup) as any;

        expect(quotation).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuotation should not enable id FormControl', () => {
        const formGroup = service.createQuotationFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuotation should disable id FormControl', () => {
        const formGroup = service.createQuotationFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
