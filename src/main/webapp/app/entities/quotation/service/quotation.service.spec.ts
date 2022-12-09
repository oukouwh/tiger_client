import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DATE_FORMAT } from 'app/config/input.constants';
import { IQuotation } from '../quotation.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quotation.test-samples';

import { QuotationService, RestQuotation } from './quotation.service';

const requireRestSample: RestQuotation = {
  ...sampleWithRequiredData,
  quotationDate: sampleWithRequiredData.quotationDate?.format(DATE_FORMAT),
  workStart: sampleWithRequiredData.workStart?.format(DATE_FORMAT),
  workEnd: sampleWithRequiredData.workEnd?.format(DATE_FORMAT),
  deliveryDate: sampleWithRequiredData.deliveryDate?.format(DATE_FORMAT),
  acceptanceDate: sampleWithRequiredData.acceptanceDate?.format(DATE_FORMAT),
  quotationExpirationDate: sampleWithRequiredData.quotationExpirationDate?.format(DATE_FORMAT),
  mailSendDate: sampleWithRequiredData.mailSendDate?.format(DATE_FORMAT),
  postSendDate: sampleWithRequiredData.postSendDate?.format(DATE_FORMAT),
};

describe('Quotation Service', () => {
  let service: QuotationService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuotation | IQuotation[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QuotationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Quotation', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quotation = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quotation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Quotation', () => {
      const quotation = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quotation).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Quotation', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Quotation', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Quotation', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuotationToCollectionIfMissing', () => {
      it('should add a Quotation to an empty array', () => {
        const quotation: IQuotation = sampleWithRequiredData;
        expectedResult = service.addQuotationToCollectionIfMissing([], quotation);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quotation);
      });

      it('should not add a Quotation to an array that contains it', () => {
        const quotation: IQuotation = sampleWithRequiredData;
        const quotationCollection: IQuotation[] = [
          {
            ...quotation,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuotationToCollectionIfMissing(quotationCollection, quotation);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Quotation to an array that doesn't contain it", () => {
        const quotation: IQuotation = sampleWithRequiredData;
        const quotationCollection: IQuotation[] = [sampleWithPartialData];
        expectedResult = service.addQuotationToCollectionIfMissing(quotationCollection, quotation);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quotation);
      });

      it('should add only unique Quotation to an array', () => {
        const quotationArray: IQuotation[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quotationCollection: IQuotation[] = [sampleWithRequiredData];
        expectedResult = service.addQuotationToCollectionIfMissing(quotationCollection, ...quotationArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quotation: IQuotation = sampleWithRequiredData;
        const quotation2: IQuotation = sampleWithPartialData;
        expectedResult = service.addQuotationToCollectionIfMissing([], quotation, quotation2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quotation);
        expect(expectedResult).toContain(quotation2);
      });

      it('should accept null and undefined values', () => {
        const quotation: IQuotation = sampleWithRequiredData;
        expectedResult = service.addQuotationToCollectionIfMissing([], null, quotation, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quotation);
      });

      it('should return initial array if no Quotation is added', () => {
        const quotationCollection: IQuotation[] = [sampleWithRequiredData];
        expectedResult = service.addQuotationToCollectionIfMissing(quotationCollection, undefined, null);
        expect(expectedResult).toEqual(quotationCollection);
      });
    });

    describe('compareQuotation', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuotation(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuotation(entity1, entity2);
        const compareResult2 = service.compareQuotation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuotation(entity1, entity2);
        const compareResult2 = service.compareQuotation(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuotation(entity1, entity2);
        const compareResult2 = service.compareQuotation(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
