/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:16:00
 * @LastEditors: 王浩
 * @LastEditTime: 2022-12-20 10:42:28
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotationitem/route/quotationitem-routing-resolve.service.ts
 * @Description:
 */
import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IQuotationitem } from '../quotationitem.model';
import { QuotationitemService } from '../service/quotationitem.service';

@Injectable({ providedIn: 'root' })
export class QuotationitemRoutingResolveService implements Resolve<IQuotationitem | null> {
  constructor(
    protected service: QuotationitemService, 
    protected router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IQuotationitem | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((quotationitem: HttpResponse<IQuotationitem>) => {
          if (quotationitem.body) {
            return of(quotationitem.body);
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
