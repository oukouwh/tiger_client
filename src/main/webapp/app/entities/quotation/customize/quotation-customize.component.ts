/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 53590202+oukouwh@users.noreply.github.com
 * @LastEditTime: 2022-12-20 10:58:07
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/customize/quotation-customize.component.ts
 * @Description: 自定义界面
 */
import { Component, OnInit } from '@angular/core';
import { QuotationFormService, QuotationFormGroup } from '../update/quotation-form.service';
import { ActivatedRoute } from '@angular/router';
import { IQuotation } from '../quotation.model';
import { QuotationService } from '../service/quotation.service';
import { PayMaster } from 'app/entities/enumerations/pay-master.model';
import { PayFlag } from 'app/entities/enumerations/pay-flag.model';
import { OrderAccuracy } from 'app/entities/enumerations/order-accuracy.model';
import { SendFlag } from 'app/entities/enumerations/send-flag.model';
import { IQuotationitem } from 'app/entities/quotationitem/quotationitem.model';

@Component({
  selector: 'jhi-quotation-customize',
  templateUrl: './quotation-customize.component.html',
  styleUrls: ['./quotation-customize.component.scss']
})
export class QuotationCustomizeComponent implements OnInit {
  quotation: IQuotation | null = null;
  quotationItems: IQuotationitem | null = null;
  payMasterValues = Object.keys(PayMaster);
  payFlagValues = Object.keys(PayFlag);
  orderAccuracyValues = Object.keys(OrderAccuracy);
  sendFlagValues = Object.keys(SendFlag);

  constructor(
    protected quotationService: QuotationService,
    protected activatedRoute: ActivatedRoute,
    protected quotationFormService: QuotationFormService,
  ) { }

  editForm: QuotationFormGroup = this.quotationFormService.createQuotationFormGroup();
  trackId = (_index: number, item: IQuotation): number => this.quotationService.getQuotationIdentifier(item);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ quotation }) => {
      this.quotation = quotation;
      // console.log(this.quotation)
      console.log(this.editForm)
      if (quotation) {
        this.updateForm(quotation);
      }
    });
  }

  /**
   * 表单更新
   * @param quotation 
   */
  protected updateForm(quotation: IQuotation): void {
    this.quotation = quotation;
    this.quotationFormService.resetForm(this.editForm, quotation);
  }

  printPDF(): void {
    // TODO
    // const data = this.createFromForm();
    // data.quotationItems = this.quotationitemInstance;
    // this.confirmationService.confirm({
    //   message: '确定打印当前数据吗? ',
    //   header: '打印',
    //   accept: () => {
    //     this.quotationService.sendToServer(data).subscribe(res => {
    //       // eslint-disable-next-line no-console
    //       console.log(res.body);
    //       this.quotationService.download(res.body);
    //     });
    //   }
    // });
    // this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    // $event.preventDefault();
  }

}