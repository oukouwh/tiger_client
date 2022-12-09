import { IQuotationitem, NewQuotationitem } from './quotationitem.model';

export const sampleWithRequiredData: IQuotationitem = {
  id: 50582,
  quotationNo: 'invoice Gorgeous',
  quotationItemNo: 24833,
  workerName: 'Handcrafted Seamless',
  standardPrice: 88211005,
  count: 87823,
  upperLimitHour: 143,
  lowerLimitHour: 454,
  additionalPrice: 36176509,
  memo: '24/365',
};

export const sampleWithPartialData: IQuotationitem = {
  id: 67424,
  quotationNo: 'impactful Dollar infomediaries',
  quotationItemNo: 23187,
  workerName: 'Market orchid SMS',
  standardPrice: 496597826,
  count: 56115,
  upperLimitHour: 804,
  lowerLimitHour: 533,
  additionalPrice: 389577495,
  deductionPrice: 236738504,
  memo: 'Money hack',
  updateCount: 16828,
};

export const sampleWithFullData: IQuotationitem = {
  id: 7205,
  quotationNo: 'scalable Account',
  quotationItemNo: 36940,
  workerName: 'Director parse',
  standardPrice: 255132092,
  count: 61991,
  upperLimitHour: 371,
  lowerLimitHour: 621,
  additionalPrice: 153208188,
  deductionPrice: 833268726,
  memo: 'convergence',
  updateCount: 58011,
};

export const sampleWithNewData: NewQuotationitem = {
  quotationNo: 'yellow Associate',
  quotationItemNo: 21206,
  workerName: 'web-enabled Harbors',
  standardPrice: 487342958,
  count: 27140,
  upperLimitHour: 286,
  lowerLimitHour: 350,
  additionalPrice: 909808388,
  memo: 'deposit Tools',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
