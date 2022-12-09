import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IQuotationitem, NewQuotationitem } from '../quotationitem.model';

export type PartialUpdateQuotationitem = Partial<IQuotationitem> & Pick<IQuotationitem, 'id'>;

export type EntityResponseType = HttpResponse<IQuotationitem>;
export type EntityArrayResponseType = HttpResponse<IQuotationitem[]>;

@Injectable({ providedIn: 'root' })
export class QuotationitemService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/quotationitems');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(quotationitem: NewQuotationitem): Observable<EntityResponseType> {
    return this.http.post<IQuotationitem>(this.resourceUrl, quotationitem, { observe: 'response' });
  }

  update(quotationitem: IQuotationitem): Observable<EntityResponseType> {
    return this.http.put<IQuotationitem>(`${this.resourceUrl}/${this.getQuotationitemIdentifier(quotationitem)}`, quotationitem, {
      observe: 'response',
    });
  }

  partialUpdate(quotationitem: PartialUpdateQuotationitem): Observable<EntityResponseType> {
    return this.http.patch<IQuotationitem>(`${this.resourceUrl}/${this.getQuotationitemIdentifier(quotationitem)}`, quotationitem, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IQuotationitem>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IQuotationitem[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getQuotationitemIdentifier(quotationitem: Pick<IQuotationitem, 'id'>): number {
    return quotationitem.id;
  }

  compareQuotationitem(o1: Pick<IQuotationitem, 'id'> | null, o2: Pick<IQuotationitem, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuotationitemIdentifier(o1) === this.getQuotationitemIdentifier(o2) : o1 === o2;
  }

  addQuotationitemToCollectionIfMissing<Type extends Pick<IQuotationitem, 'id'>>(
    quotationitemCollection: Type[],
    ...quotationitemsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quotationitems: Type[] = quotationitemsToCheck.filter(isPresent);
    if (quotationitems.length > 0) {
      const quotationitemCollectionIdentifiers = quotationitemCollection.map(
        quotationitemItem => this.getQuotationitemIdentifier(quotationitemItem)!
      );
      const quotationitemsToAdd = quotationitems.filter(quotationitemItem => {
        const quotationitemIdentifier = this.getQuotationitemIdentifier(quotationitemItem);
        if (quotationitemCollectionIdentifiers.includes(quotationitemIdentifier)) {
          return false;
        }
        quotationitemCollectionIdentifiers.push(quotationitemIdentifier);
        return true;
      });
      return [...quotationitemsToAdd, ...quotationitemCollection];
    }
    return quotationitemCollection;
  }
}
