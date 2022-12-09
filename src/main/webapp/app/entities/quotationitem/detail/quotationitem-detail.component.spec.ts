import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { QuotationitemDetailComponent } from './quotationitem-detail.component';

describe('Quotationitem Management Detail Component', () => {
  let comp: QuotationitemDetailComponent;
  let fixture: ComponentFixture<QuotationitemDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotationitemDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ quotationitem: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(QuotationitemDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(QuotationitemDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load quotationitem on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.quotationitem).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
