import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
];

@NgModule({
  imports: [RouterModule.forChild(quotationRoute)],
  exports: [RouterModule],
})
export class QuotationRoutingModule {}
