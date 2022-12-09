import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { QuotationitemFormService } from './quotationitem-form.service';
import { QuotationitemService } from '../service/quotationitem.service';
import { IQuotationitem } from '../quotationitem.model';
import { IQuotation } from 'app/entities/quotation/quotation.model';
import { QuotationService } from 'app/entities/quotation/service/quotation.service';

import { QuotationitemUpdateComponent } from './quotationitem-update.component';

describe('Quotationitem Management Update Component', () => {
  let comp: QuotationitemUpdateComponent;
  let fixture: ComponentFixture<QuotationitemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quotationitemFormService: QuotationitemFormService;
  let quotationitemService: QuotationitemService;
  let quotationService: QuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [QuotationitemUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(QuotationitemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuotationitemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quotationitemFormService = TestBed.inject(QuotationitemFormService);
    quotationitemService = TestBed.inject(QuotationitemService);
    quotationService = TestBed.inject(QuotationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Quotation query and add missing value', () => {
      const quotationitem: IQuotationitem = { id: 456 };
      const quotation: IQuotation = { id: 92856 };
      quotationitem.quotation = quotation;

      const quotationCollection: IQuotation[] = [{ id: 71592 }];
      jest.spyOn(quotationService, 'query').mockReturnValue(of(new HttpResponse({ body: quotationCollection })));
      const additionalQuotations = [quotation];
      const expectedCollection: IQuotation[] = [...additionalQuotations, ...quotationCollection];
      jest.spyOn(quotationService, 'addQuotationToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ quotationitem });
      comp.ngOnInit();

      expect(quotationService.query).toHaveBeenCalled();
      expect(quotationService.addQuotationToCollectionIfMissing).toHaveBeenCalledWith(
        quotationCollection,
        ...additionalQuotations.map(expect.objectContaining)
      );
      expect(comp.quotationsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const quotationitem: IQuotationitem = { id: 456 };
      const quotation: IQuotation = { id: 46529 };
      quotationitem.quotation = quotation;

      activatedRoute.data = of({ quotationitem });
      comp.ngOnInit();

      expect(comp.quotationsSharedCollection).toContain(quotation);
      expect(comp.quotationitem).toEqual(quotationitem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuotationitem>>();
      const quotationitem = { id: 123 };
      jest.spyOn(quotationitemFormService, 'getQuotationitem').mockReturnValue(quotationitem);
      jest.spyOn(quotationitemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quotationitem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quotationitem }));
      saveSubject.complete();

      // THEN
      expect(quotationitemFormService.getQuotationitem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quotationitemService.update).toHaveBeenCalledWith(expect.objectContaining(quotationitem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuotationitem>>();
      const quotationitem = { id: 123 };
      jest.spyOn(quotationitemFormService, 'getQuotationitem').mockReturnValue({ id: null });
      jest.spyOn(quotationitemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quotationitem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quotationitem }));
      saveSubject.complete();

      // THEN
      expect(quotationitemFormService.getQuotationitem).toHaveBeenCalled();
      expect(quotationitemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuotationitem>>();
      const quotationitem = { id: 123 };
      jest.spyOn(quotationitemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quotationitem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quotationitemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareQuotation', () => {
      it('Should forward to quotationService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(quotationService, 'compareQuotation');
        comp.compareQuotation(entity, entity2);
        expect(quotationService.compareQuotation).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
