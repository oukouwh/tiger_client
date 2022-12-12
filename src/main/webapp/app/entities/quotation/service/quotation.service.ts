import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuotation, NewQuotation } from '../quotation.model';
import * as FileSaver from 'file-saver';

export type PartialUpdateQuotation = Partial<IQuotation> & Pick<IQuotation, 'id'>;

type RestOf<T extends IQuotation | NewQuotation> = Omit<
  T,
  | 'quotationDate'
  | 'workStart'
  | 'workEnd'
  | 'deliveryDate'
  | 'acceptanceDate'
  | 'quotationExpirationDate'
  | 'mailSendDate'
  | 'postSendDate'
> & {
  quotationDate?: string | null;
  workStart?: string | null;
  workEnd?: string | null;
  deliveryDate?: string | null;
  acceptanceDate?: string | null;
  quotationExpirationDate?: string | null;
  mailSendDate?: string | null;
  postSendDate?: string | null;
};

export type RestQuotation = RestOf<IQuotation>;

export type NewRestQuotation = RestOf<NewQuotation>;

export type PartialUpdateRestQuotation = RestOf<PartialUpdateQuotation>;

export type EntityResponseType = HttpResponse<IQuotation>;
export type EntityArrayResponseType = HttpResponse<IQuotation[]>;

@Injectable({ providedIn: 'root' })
export class QuotationService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quotations');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(quotation: NewQuotation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quotation);
    return this.http
      .post<RestQuotation>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(quotation: IQuotation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quotation);
    return this.http
      .put<RestQuotation>(`${this.resourceUrl}/${this.getQuotationIdentifier(quotation)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(quotation: PartialUpdateQuotation): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(quotation);
    return this.http
      .patch<RestQuotation>(`${this.resourceUrl}/${this.getQuotationIdentifier(quotation)}`, copy, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<RestQuotation>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<RestQuotation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => this.convertResponseArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuotationIdentifier(quotation: Pick<IQuotation, 'id'>): number {
    return quotation.id;
  }

  compareQuotation(o1: Pick<IQuotation, 'id'> | null, o2: Pick<IQuotation, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuotationIdentifier(o1) === this.getQuotationIdentifier(o2) : o1 === o2;
  }

  addQuotationToCollectionIfMissing<Type extends Pick<IQuotation, 'id'>>(
    quotationCollection: Type[],
    ...quotationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quotations: Type[] = quotationsToCheck.filter(isPresent);
    if (quotations.length > 0) {
      const quotationCollectionIdentifiers = quotationCollection.map(quotationItem => this.getQuotationIdentifier(quotationItem)!);
      const quotationsToAdd = quotations.filter(quotationItem => {
        const quotationIdentifier = this.getQuotationIdentifier(quotationItem);
        if (quotationCollectionIdentifiers.includes(quotationIdentifier)) {
          return false;
        }
        quotationCollectionIdentifiers.push(quotationIdentifier);
        return true;
      });
      return [...quotationsToAdd, ...quotationCollection];
    }
    return quotationCollection;
  }

  protected convertDateFromClient<T extends IQuotation | NewQuotation | PartialUpdateQuotation>(quotation: T): RestOf<T> {
    return {
      ...quotation,
      quotationDate: quotation.quotationDate?.format(DATE_FORMAT) ?? null,
      workStart: quotation.workStart?.format(DATE_FORMAT) ?? null,
      workEnd: quotation.workEnd?.format(DATE_FORMAT) ?? null,
      deliveryDate: quotation.deliveryDate?.format(DATE_FORMAT) ?? null,
      acceptanceDate: quotation.acceptanceDate?.format(DATE_FORMAT) ?? null,
      quotationExpirationDate: quotation.quotationExpirationDate?.format(DATE_FORMAT) ?? null,
      mailSendDate: quotation.mailSendDate?.format(DATE_FORMAT) ?? null,
      postSendDate: quotation.postSendDate?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertDateFromServer(restQuotation: RestQuotation): IQuotation {
    return {
      ...restQuotation,
      quotationDate: restQuotation.quotationDate ? dayjs(restQuotation.quotationDate) : undefined,
      workStart: restQuotation.workStart ? dayjs(restQuotation.workStart) : undefined,
      workEnd: restQuotation.workEnd ? dayjs(restQuotation.workEnd) : undefined,
      deliveryDate: restQuotation.deliveryDate ? dayjs(restQuotation.deliveryDate) : undefined,
      acceptanceDate: restQuotation.acceptanceDate ? dayjs(restQuotation.acceptanceDate) : undefined,
      quotationExpirationDate: restQuotation.quotationExpirationDate ? dayjs(restQuotation.quotationExpirationDate) : undefined,
      mailSendDate: restQuotation.mailSendDate ? dayjs(restQuotation.mailSendDate) : undefined,
      postSendDate: restQuotation.postSendDate ? dayjs(restQuotation.postSendDate) : undefined,
    };
  }

  protected convertResponseFromServer(res: HttpResponse<RestQuotation>): HttpResponse<IQuotation> {
    return res.clone({
      body: res.body ? this.convertDateFromServer(res.body) : null,
    });
  }

  protected convertResponseArrayFromServer(res: HttpResponse<RestQuotation[]>): HttpResponse<IQuotation[]> {
    return res.clone({
      body: res.body ? res.body.map(item => this.convertDateFromServer(item)) : null,
    });
  }

  /**
   * pdf打印接口
   * @param data 
   * @returns 
   */
  printPdf(data: any): Observable<any> {
    return this.http.post(SERVER_API_URL + 'api/download-excel', data, { observe: 'response', responseType: 'blob' });
  }

  /**
   * 下载功能
   *
   * @param data 
   * @param filename 
   */
  public download(data: any, filename?: string): void {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    //const url = window.URL.createObjectURL(blob);
    let fname = '';
    if (filename) {
      fname = filename;
    } else {
      fname = 'myexcel';
    }
    const file = new File([blob], fname + '.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(blob, fname);
  }
}
