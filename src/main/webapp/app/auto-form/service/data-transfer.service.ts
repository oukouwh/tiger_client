/*
 * @Author: 王浩
 * @Date: 2023-01-03 09:33:24
 * @LastEditTime: 2023-01-03 10:03:44
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/service/data-transfer.service.ts
 * @Description: 自定义扩展api入口
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataTransferService {
  constructor(private http: HttpClient) {}

  sendToServer(data: any): Observable<any> {
    return this.http.post<any>(SERVER_API_URL + 'api/test-data2', data, { observe: 'response' });
  }

  getFromServer(): Observable<any> {
    return this.http.get(SERVER_API_URL + 'api/test-data2', { observe: 'response' });
  }
}
