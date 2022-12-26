/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:01:23
 * @LastEditors: 王浩
 * @LastEditTime: 2022-12-26 15:50:40
 * @FilePath: /tiger_client/src/main/webapp/app/entities/entity-routing.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEo
 */
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
      {
        path: 'foo',
        data: { pageTitle: 'webAppApp.foo.home.title' },
        loadChildren: () => import('./foo/foo.module').then(m => m.FooModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
