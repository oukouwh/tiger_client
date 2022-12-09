import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'quotation',
        data: { pageTitle: 'webAppApp.quotation.home.title' },
        loadChildren: () => import('./quotation/quotation.module').then(m => m.QuotationModule),
      },
      {
        path: 'quotationitem',
        data: { pageTitle: 'webAppApp.quotationitem.home.title' },
        loadChildren: () => import('./quotationitem/quotationitem.module').then(m => m.QuotationitemModule),
      },
      {
        path: 'customer',
        data: { pageTitle: 'webAppApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
