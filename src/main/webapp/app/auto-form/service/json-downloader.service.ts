/*
 * @Author: 王浩
 * @Date: 2023-01-03 17:15:15
 * @LastEditTime: 2023-01-03 17:15:22
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/service/json-downloader.service.ts
 * @Description: Do not edit
 */
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class JsonDownloaderService {
  constructor(private sanitizer: DomSanitizer) {}

  public downloadUrl(data: any): any {
    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    return url;
  }

  public download(data: any, filename?: string): void {
    const url = this.downloadUrl(data);
    let fname = '';
    if (filename) {
      fname = filename;
    } else {
      fname = 'defaut.json';
    }
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', url);
    link.setAttribute('download', fname);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}
