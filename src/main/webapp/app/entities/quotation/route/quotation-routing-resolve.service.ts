import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';

@Injectable({ providedIn: 'root' })
export class QuotationRoutingResolveService implements Resolve<IQuotation | null> {
  constructor(protected service: QuotationService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuotation | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((quotation: HttpResponse<IQuotation>) => {
          if (quotation.body) {
            return of(quotation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
