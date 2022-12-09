import { IQuotation } from 'app/entities/quotation/quotation.model';

export interface IQuotationitem {
  id: number;
  quotationNo?: string | null;
  quotationItemNo?: number | null;
  workerName?: string | null;
  standardPrice?: number | null;
  count?: number | null;
  upperLimitHour?: number | null;
  lowerLimitHour?: number | null;
  additionalPrice?: number | null;
  deductionPrice?: number | null;
  memo?: string | null;
  updateCount?: number | null;
  quotation?: Pick<IQuotation, 'id' | 'quotationNo'> | null;
}

export type NewQuotationitem = Omit<IQuotationitem, 'id'> & { id: null };
