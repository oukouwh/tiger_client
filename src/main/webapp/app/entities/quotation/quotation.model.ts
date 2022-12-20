/*
 * @Author: TSTZ 
 * @Date: 2022-12-09 15:15:59
 * @LastEditors: TSTZ 53590202+oukouwh@users.noreply.github.com
 * @LastEditTime: 2022-12-20 11:19:51
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotation/quotation.model.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import dayjs from 'dayjs/esm';
import { PayMaster } from 'app/entities/enumerations/pay-master.model';
import { PayFlag } from 'app/entities/enumerations/pay-flag.model';
import { OrderAccuracy } from 'app/entities/enumerations/order-accuracy.model';
import { SendFlag } from 'app/entities/enumerations/send-flag.model';

export interface IQuotation {
  id: number;
  quotationNo?: string | null;
  quotationName?: string | null;
  quotationDate?: dayjs.Dayjs | null;
  workStart?: dayjs.Dayjs | null;
  workEnd?: dayjs.Dayjs | null;
  deliveryItems?: string | null;
  deliveryDate?: dayjs.Dayjs | null;
  acceptanceDate?: dayjs.Dayjs | null;
  paymentsTerms?: PayMaster | null;
  payFlag?: PayFlag | null;
  quotationExpirationDate?: dayjs.Dayjs | null;
  totalAmount?: number | null;
  customerCharge?: string | null;
  accuracy?: OrderAccuracy | null;
  mailSendDate?: dayjs.Dayjs | null;
  postSendDate?: dayjs.Dayjs | null;
  sendFlag?: SendFlag | null;
  salesStaff?: string | null;
  salesOffice?: string | null;
  updateCount?: number | null;
  // ADD
  // quotationItems: any;
}



export type NewQuotation = Omit<IQuotation, 'id'> & { id: null };
