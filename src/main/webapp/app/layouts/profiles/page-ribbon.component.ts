/*
 * @Author: 王浩
 * @Date: 2022-12-09 15:01:23
 * @LastEditTime: 2023-01-04 09:29:29
 * @FilePath: /tiger_client/src/main/webapp/app/layouts/profiles/page-ribbon.component.ts
 * @Description: Do not edit
 */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProfileService } from './profile.service';

@Component({
  selector: 'jhi-page-ribbon',
  template: `
    <div class="ribbon" *ngIf="ribbonEnv$ | async as ribbonEnv">
      <a href="" jhiTranslate="global.ribbon.{{ ribbonEnv }}">{{ { dev: 'Development' }[ribbonEnv] || '' }}</a>
    </div>
  `,
  styleUrls: ['./page-ribbon.component.scss'],
})
export class PageRibbonComponent implements OnInit {
  ribbonEnv$?: Observable<string | undefined>;

  constructor(
    private profileService: ProfileService
    ) { }

  ngOnInit(): void {
    this.ribbonEnv$ = this.profileService.getProfileInfo().pipe(
      map(profileInfo => profileInfo.ribbonEnv
        )
      );
  }
}
