import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QuotationDetailComponent } from './quotation-detail.component';

describe('Quotation Management Detail Component', () => {
  let comp: QuotationDetailComponent;
  let fixture: ComponentFixture<QuotationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ quotation: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(QuotationDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(QuotationDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quotation on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.quotation).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
