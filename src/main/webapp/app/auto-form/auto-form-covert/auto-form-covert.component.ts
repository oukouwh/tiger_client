/*
 * @Author: 王浩
 * @Date: 2022-12-30 13:29:30
 * @LastEditTime: 2022-12-30 13:35:11
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/auto-form-covert/auto-form-covert.component.ts
 * @Description: Do not edit
 */

import { Component, OnInit, Input } from '@angular/core';
import { field, value } from '../models/global.model';

@Component({
  selector: 'app-auto-form-covert',
  templateUrl: './auto-form-covert.component.html'
})
export class AutoFormCovertComponent implements OnInit {
  @Input() item?: field;

  constructor() { }

  ngOnInit() { }

  toggleValue(obj: any): void { }

  submit(): void { }

  removeField(): void { }
}
