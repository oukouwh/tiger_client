import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IQuotationitem } from '../quotationitem.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../quotationitem.test-samples';

import { QuotationitemService } from './quotationitem.service';

const requireRestSample: IQuotationitem = {
  ...sampleWithRequiredData,
};

describe('Quotationitem Service', () => {
  let service: QuotationitemService;
  let httpMock: HttpTestingController;
  let expectedResult: IQuotationitem | IQuotationitem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(QuotationitemService);
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

    it('should create a Quotationitem', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const quotationitem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(quotationitem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Quotationitem', () => {
      const quotationitem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(quotationitem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Quotationitem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Quotationitem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Quotationitem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addQuotationitemToCollectionIfMissing', () => {
      it('should add a Quotationitem to an empty array', () => {
        const quotationitem: IQuotationitem = sampleWithRequiredData;
        expectedResult = service.addQuotationitemToCollectionIfMissing([], quotationitem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quotationitem);
      });

      it('should not add a Quotationitem to an array that contains it', () => {
        const quotationitem: IQuotationitem = sampleWithRequiredData;
        const quotationitemCollection: IQuotationitem[] = [
          {
            ...quotationitem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addQuotationitemToCollectionIfMissing(quotationitemCollection, quotationitem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Quotationitem to an array that doesn't contain it", () => {
        const quotationitem: IQuotationitem = sampleWithRequiredData;
        const quotationitemCollection: IQuotationitem[] = [sampleWithPartialData];
        expectedResult = service.addQuotationitemToCollectionIfMissing(quotationitemCollection, quotationitem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quotationitem);
      });

      it('should add only unique Quotationitem to an array', () => {
        const quotationitemArray: IQuotationitem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const quotationitemCollection: IQuotationitem[] = [sampleWithRequiredData];
        expectedResult = service.addQuotationitemToCollectionIfMissing(quotationitemCollection, ...quotationitemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const quotationitem: IQuotationitem = sampleWithRequiredData;
        const quotationitem2: IQuotationitem = sampleWithPartialData;
        expectedResult = service.addQuotationitemToCollectionIfMissing([], quotationitem, quotationitem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(quotationitem);
        expect(expectedResult).toContain(quotationitem2);
      });

      it('should accept null and undefined values', () => {
        const quotationitem: IQuotationitem = sampleWithRequiredData;
        expectedResult = service.addQuotationitemToCollectionIfMissing([], null, quotationitem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(quotationitem);
      });

      it('should return initial array if no Quotationitem is added', () => {
        const quotationitemCollection: IQuotationitem[] = [sampleWithRequiredData];
        expectedResult = service.addQuotationitemToCollectionIfMissing(quotationitemCollection, undefined, null);
        expect(expectedResult).toEqual(quotationitemCollection);
      });
    });

    describe('compareQuotationitem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareQuotationitem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareQuotationitem(entity1, entity2);
        const compareResult2 = service.compareQuotationitem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareQuotationitem(entity1, entity2);
        const compareResult2 = service.compareQuotationitem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareQuotationitem(entity1, entity2);
        const compareResult2 = service.compareQuotationitem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
