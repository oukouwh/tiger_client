/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:16:00
 * @LastEditors: 王浩
 * @LastEditTime: 2022-12-22 11:26:56
 * @FilePath: /tiger_client/src/main/webapp/app/entities/quotationitem/quotationitem.model.ts
 * @Description:
 */
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
  // 界面跳转
  quotation?: Pick<IQuotation, 'id' | 'quotationNo'> | null;
}

export type NewQuotationitem = Omit<IQuotationitem, 'id'> & { id: null };
