import dayjs from 'dayjs/esm';

import { PayMaster } from 'app/entities/enumerations/pay-master.model';
import { PayFlag } from 'app/entities/enumerations/pay-flag.model';
import { OrderAccuracy } from 'app/entities/enumerations/order-accuracy.model';
import { SendFlag } from 'app/entities/enumerations/send-flag.model';

import { IQuotation, NewQuotation } from './quotation.model';

export const sampleWithRequiredData: IQuotation = {
  id: 3454,
  quotationNo: 'deposit',
  quotationName: 'secondary pixel',
  quotationDate: dayjs('2022-12-08'),
  workStart: dayjs('2022-12-09'),
  workEnd: dayjs('2022-12-09'),
  deliveryItems: 'empower applications',
  deliveryDate: dayjs('2022-12-08'),
  acceptanceDate: dayjs('2022-12-08'),
  paymentsTerms: PayMaster['B'],
  payFlag: PayFlag['Y'],
  quotationExpirationDate: dayjs('2022-12-08'),
  totalAmount: 945544416,
};

export const sampleWithPartialData: IQuotation = {
  id: 77263,
  quotationNo: 'rich methodologies',
  quotationName: 'calculating Vermont Car',
  quotationDate: dayjs('2022-12-08'),
  workStart: dayjs('2022-12-08'),
  workEnd: dayjs('2022-12-09'),
  deliveryItems: 'USB silver Compatible',
  deliveryDate: dayjs('2022-12-08'),
  acceptanceDate: dayjs('2022-12-08'),
  paymentsTerms: PayMaster['C'],
  payFlag: PayFlag['Y'],
  quotationExpirationDate: dayjs('2022-12-08'),
  totalAmount: 822360591,
  postSendDate: dayjs('2022-12-09'),
  sendFlag: SendFlag['D'],
  salesStaff: 'Fantastic up',
  salesOffice: 'Analyst',
};

export const sampleWithFullData: IQuotation = {
  id: 5239,
  quotationNo: 'Vision-oriented Gloves',
  quotationName: 'SMS Granite',
  quotationDate: dayjs('2022-12-08'),
  workStart: dayjs('2022-12-08'),
  workEnd: dayjs('2022-12-09'),
  deliveryItems: 'generating',
  deliveryDate: dayjs('2022-12-09'),
  acceptanceDate: dayjs('2022-12-09'),
  paymentsTerms: PayMaster['D'],
  payFlag: PayFlag['N'],
  quotationExpirationDate: dayjs('2022-12-08'),
  totalAmount: 85891735,
  customerCharge: 'models Buckinghamshire Georgia',
  accuracy: OrderAccuracy['A'],
  mailSendDate: dayjs('2022-12-08'),
  postSendDate: dayjs('2022-12-09'),
  sendFlag: SendFlag['B'],
  salesStaff: 'azure',
  salesOffice: 'indexing Tactics',
  updateCount: 92389,
};

export const sampleWithNewData: NewQuotation = {
  quotationNo: 'card concept',
  quotationName: 'empower plum',
  quotationDate: dayjs('2022-12-08'),
  workStart: dayjs('2022-12-09'),
  workEnd: dayjs('2022-12-08'),
  deliveryItems: 'copy',
  deliveryDate: dayjs('2022-12-08'),
  acceptanceDate: dayjs('2022-12-08'),
  paymentsTerms: PayMaster['D'],
  payFlag: PayFlag['Y'],
  quotationExpirationDate: dayjs('2022-12-08'),
  totalAmount: 993229400,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
