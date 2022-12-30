/*
 * @Author: 王浩
 * @Date: 2022-12-30 11:37:49
 * @LastEditTime: 2022-12-30 13:35:38
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/auto-form-hidden/auto-form-hidden.component.ts
 * @Description: Do not edit
 */

import { Component, OnInit, Input } from '@angular/core';
import { field } from '../models/global.model';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import swal from 'sweetalert2';

@Component({
  selector: 'app-auto-form-hidden',
  templateUrl: './auto-form-hidden.component.html'
})
export class AutoFormHiddenComponent implements OnInit {
  @Input() item?: field;

  constructor() { }

  ngOnInit() { }

  onDropSub(event: DndDropEvent, list?: any[]): void {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      if (event.dropEffect === 'copy') event.data.fieldName = event.data.ctrlType + '-' + new Date().getTime();
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }
      if (list.length < 1) {
        list.splice(index, 0, event.data);
      }
    }
  }

  removeField(i: number, list: any[]): void {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'Do you want to remove this field?',
        showCancelButton: true,
        confirmButtonColor: '#00B96F',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, remove!'
      })
      .then(result => {
        if (result.value) {
          list.splice(i, 1);
        }
      });
  }

  onDragged(item: any, list: any[], effect: DropEffect) {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragover(event: DragEvent): void {
    console.log('dragover in Hidden', JSON.stringify(event, null, 2));
  }

  onDragStart(event: DragEvent): void {
    console.log('drag started in hidden', JSON.stringify(event, null, 2));
  }

  releaseOp(event: DragEvent): void {
    console.log('drag releaseOp in hidden', JSON.stringify(event, null, 2));
  }

  submit(): void { }

  toggleValue(obj: any): void { }
}
