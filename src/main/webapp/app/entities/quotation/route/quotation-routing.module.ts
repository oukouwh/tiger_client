/*
 * @Author: TSTZ
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 53590202+oukouwh@users.noreply.github.com
 * @LastEditTime: 2022-12-12 12:04:54
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/route/quotation-routing.module.ts
 * @Description: 路由
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationCustomizeComponent } from './../customize/quotation-customize.component';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { QuotationComponent } from '../list/quotation.component';
import { QuotationDetailComponent } from '../detail/quotation-detail.component';
import { QuotationUpdateComponent } from '../update/quotation-update.component';
import { QuotationRoutingResolveService } from './quotation-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const quotationRoute: Routes = [
  {
    path: '',
    component: QuotationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuotationDetailComponent,
    resolve: {
      quotation: QuotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuotationUpdateComponent,
    resolve: {
      quotation: QuotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuotationUpdateComponent,
    resolve: {
      quotation: QuotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  // ADD
  {
    path: 'customize',
    component: QuotationCustomizeComponent,
    resolve: {
      quotation: QuotationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quotationRoute)],
  exports: [RouterModule],
})
export class QuotationRoutingModule {}
