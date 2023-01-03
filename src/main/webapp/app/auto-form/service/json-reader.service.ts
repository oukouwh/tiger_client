/*
 * @Author: 王浩
 * @Date: 2023-01-03 10:04:37
 * @LastEditTime: 2023-01-03 10:04:42
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/service/json-reader.service.ts
 * @Description: json读取
 */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class JsonReaderService {
  constructor(private http: HttpClient) {}

  public getJSON(filename: string): Observable<any> {
    return this.http.get(filename);
  }
}
