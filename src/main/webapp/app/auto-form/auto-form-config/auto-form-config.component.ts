/*
 * @Author: 王浩
 * @Date: 2022-12-29 16:22:42
 * @LastEditTime: 2022-12-29 16:26:38
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/auto-form-config/auto-form-config.component.ts
 * @Description: 拖拽模版文件
 */

import { Component, OnInit, Input } from '@angular/core';
import { field, value } from '../models/global.model';

@Component({
  selector: 'app-auto-form-config',
  templateUrl: './auto-form-config.component.html',
  styleUrls: ['./auto-form-config.component.scss']
})
export class AutoFormConfigComponent implements OnInit {
  @Input() item?: field;
  value: value = {
    label: '',
    value: ''
  };

  entity: any = {
    name: '',
    instance: '',
    interface: '',
    service: '',
    selectKey: '',
    valueItem: '',
    ownerField: '',
    tableFields: []
  };

  constructor() {}

  ngOnInit() {
    if (this.item?.entities && this.item.entities.length === 0) {
      this.addEntity(this.item.entities);
    }
  }

  addValue(values: any): void {
    values.push(this.value);
    this.value = { label: '', value: '' };
  }

  addEntity(entities: any): void {
    entities.push(this.entity);
  }
}
