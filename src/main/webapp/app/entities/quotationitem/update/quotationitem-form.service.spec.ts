import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quotationitem.test-samples';

import { QuotationitemFormService } from './quotationitem-form.service';

describe('Quotationitem Form Service', () => {
  let service: QuotationitemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuotationitemFormService);
  });

  describe('Service methods', () => {
    describe('createQuotationitemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuotationitemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quotationNo: expect.any(Object),
            quotationItemNo: expect.any(Object),
            workerName: expect.any(Object),
            standardPrice: expect.any(Object),
            count: expect.any(Object),
            upperLimitHour: expect.any(Object),
            lowerLimitHour: expect.any(Object),
            additionalPrice: expect.any(Object),
            deductionPrice: expect.any(Object),
            memo: expect.any(Object),
            updateCount: expect.any(Object),
            quotation: expect.any(Object),
          })
        );
      });

      it('passing IQuotationitem should create a new form with FormGroup', () => {
        const formGroup = service.createQuotationitemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quotationNo: expect.any(Object),
            quotationItemNo: expect.any(Object),
            workerName: expect.any(Object),
            standardPrice: expect.any(Object),
            count: expect.any(Object),
            upperLimitHour: expect.any(Object),
            lowerLimitHour: expect.any(Object),
            additionalPrice: expect.any(Object),
            deductionPrice: expect.any(Object),
            memo: expect.any(Object),
            updateCount: expect.any(Object),
            quotation: expect.any(Object),
          })
        );
      });
    });

    describe('getQuotationitem', () => {
      it('should return NewQuotationitem for default Quotationitem initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createQuotationitemFormGroup(sampleWithNewData);

        const quotationitem = service.getQuotationitem(formGroup) as any;

        expect(quotationitem).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuotationitem for empty Quotationitem initial value', () => {
        const formGroup = service.createQuotationitemFormGroup();

        const quotationitem = service.getQuotationitem(formGroup) as any;

        expect(quotationitem).toMatchObject({});
      });

      it('should return IQuotationitem', () => {
        const formGroup = service.createQuotationitemFormGroup(sampleWithRequiredData);

        const quotationitem = service.getQuotationitem(formGroup) as any;

        expect(quotationitem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuotationitem should not enable id FormControl', () => {
        const formGroup = service.createQuotationitemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuotationitem should disable id FormControl', () => {
        const formGroup = service.createQuotationitemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
