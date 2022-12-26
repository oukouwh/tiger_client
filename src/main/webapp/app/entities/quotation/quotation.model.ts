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
  quotationItems?: any | null;
}

export type NewQuotation = Omit<IQuotation, 'id'> & { id: null };
