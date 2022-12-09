import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { QuotationitemComponent } from '../list/quotationitem.component';
import { QuotationitemDetailComponent } from '../detail/quotationitem-detail.component';
import { QuotationitemUpdateComponent } from '../update/quotationitem-update.component';
import { QuotationitemRoutingResolveService } from './quotationitem-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const quotationitemRoute: Routes = [
  {
    path: '',
    component: QuotationitemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: QuotationitemDetailComponent,
    resolve: {
      quotationitem: QuotationitemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: QuotationitemUpdateComponent,
    resolve: {
      quotationitem: QuotationitemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: QuotationitemUpdateComponent,
    resolve: {
      quotationitem: QuotationitemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(quotationitemRoute)],
  exports: [RouterModule],
})
export class QuotationitemRoutingModule {}
