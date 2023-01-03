/*
 * @Author: 王浩
 * @Date: 2023-01-03 09:29:23
 * @LastEditTime: 2023-01-03 10:06:04
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/auto-form-list/auto-form-list.component.ts
 * @Description: Do not edit
 */

import { Component, OnInit, Input } from '@angular/core';
import { field } from '../models/global.model';
import { JsonReaderService } from '../service/json-reader.service';

@Component({
  selector: 'app-auto-form-list',
  templateUrl: './auto-form-list.component.html',
  styleUrls: ['./auto-form-list.component.scss']
})
export class AutoFormListComponent implements OnInit {
  fieldModels: Array<field> = [];
  @Input() title = '';
  @Input() description = '';
  jsonFileName = '../content/jsons/field-model.json';

  constructor(
    private jsonReaderService: JsonReaderService
    ) {
    jsonReaderService.getJSON(this.jsonFileName).subscribe((data: any) => {
      this.fieldModels = data;
    });
  }

  ngOnInit() {}

  onDragEnd(event: DragEvent): void {
    console.log('drag ended', JSON.stringify(event, null, 2));
  }
}
