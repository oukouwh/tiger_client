import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { QuotationFormService } from './quotation-form.service';
import { QuotationService } from '../service/quotation.service';
import { IQuotation } from '../quotation.model';

import { QuotationUpdateComponent } from './quotation-update.component';

describe('Quotation Management Update Component', () => {
  let comp: QuotationUpdateComponent;
  let fixture: ComponentFixture<QuotationUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let quotationFormService: QuotationFormService;
  let quotationService: QuotationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [QuotationUpdateComponent],
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
      .overrideTemplate(QuotationUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(QuotationUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    quotationFormService = TestBed.inject(QuotationFormService);
    quotationService = TestBed.inject(QuotationService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const quotation: IQuotation = { id: 456 };

      activatedRoute.data = of({ quotation });
      comp.ngOnInit();

      expect(comp.quotation).toEqual(quotation);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuotation>>();
      const quotation = { id: 123 };
      jest.spyOn(quotationFormService, 'getQuotation').mockReturnValue(quotation);
      jest.spyOn(quotationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quotation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quotation }));
      saveSubject.complete();

      // THEN
      expect(quotationFormService.getQuotation).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(quotationService.update).toHaveBeenCalledWith(expect.objectContaining(quotation));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuotation>>();
      const quotation = { id: 123 };
      jest.spyOn(quotationFormService, 'getQuotation').mockReturnValue({ id: null });
      jest.spyOn(quotationService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quotation: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: quotation }));
      saveSubject.complete();

      // THEN
      expect(quotationFormService.getQuotation).toHaveBeenCalled();
      expect(quotationService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IQuotation>>();
      const quotation = { id: 123 };
      jest.spyOn(quotationService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ quotation });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(quotationService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
