import { Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { IField, value } from '../models/global.model';
import { DndDropEvent, DropEffect } from 'ngx-drag-drop';
import swal from 'sweetalert2';
import { DataTransferService } from '../service/data-transfer.service';
import { JsonDownloaderService } from '../service/json-downloader.service';

@Component({
  selector: 'app-auto-form-editor',
  templateUrl: './auto-form-editor.component.html',
  styleUrls: ['./auto-form-editor.component.scss']
})
export class AutoFormEditorComponent implements OnInit {
  @ViewChild('divList', { static: false })
  divList?: ElementRef;

  value: value = {
    label: '',
    value: ''
  };
  success = false;
  pages: value[];
  selectedPage: any;

  fieldModels: Array<IField> = [];
  jsonFileName = '../../assets/jsons/field-model.json';

  result: any;
  retJsonObj: any;

  movInCnt = 0;

  constructor(
    private jsonDownloaderService: JsonDownloaderService,
    private dataTransferService: DataTransferService
  )
  {
    this.pages = [];
    this.getJsonListData();
  }

  ngOnInit() {}

  modelFields: Array<IField> = [];
  model: any = {
    fieldName: 'フォーム名...',
    description: '該当フォームの説明について...',
    theme: {
      bgColor: 'ffffff',
      textColor: '555555',
      bannerImage: ''
    },
    attributes: this.modelFields
  };

  report = false;
  reports: any = [];

  @ViewChildren('dropItem') dropItems!: QueryList<ElementRef>;
  items: any = [];

  url: any;

  show = false;

  onDragStart(event: DragEvent): void {
    console.log('drag started', JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent): void {
    console.log('drag ended', JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent): void {
    console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent): void {
    console.log('draggable linked', JSON.stringify(event, null, 2));
  }

  onDragged(item: any, list: any[], effect: DropEffect): void {
    if (effect === 'move') {
      const index = list.indexOf(item);
      list.splice(index, 1);
    }
  }

  onDragCanceled(event: DragEvent): void {
    console.log('drag cancelled', JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent): void {
    console.log('dragover', JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent, list?: any[]): void {
    if (list && (event.dropEffect === 'copy' || event.dropEffect === 'move')) {
      if (event.dropEffect === 'copy') event.data.fieldName = event.data.ctrlType + new Date().getTime();
      let index = event.index;
      if (typeof index === 'undefined') {
        index = list.length;
      }
      list.splice(index, 0, event.data);

      if (event.data.ctrlType === 'layout') {
        if (!event.data.subFields) {
          event.data.subFields = new Array<IField[]>(3);
          for (let j = 0; j < 3; j++) {
            event.data.subFields[j] = [];
          }
        }
      }
    }
  }

  addValue(values: any): void {
    values.push(this.value);
    this.value = { label: '', value: '' };
  }

  removeField(i: number): void {
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
          this.model.attributes.splice(i, 1);
        }
      });
  }

  updateForm(): void {
    const input = new FormData();
    input.append('id', this.model._id);
    input.append('fieldName', this.model.fieldName);
    input.append('description', this.model.description);
    input.append('bannerImage', this.model.theme.bannerImage);
    input.append('bgColor', this.model.theme.bgColor);
    input.append('textColor', this.model.theme.textColor);
    input.append('attributes', JSON.stringify(this.model.attributes));
  }

  initReport(): void {
    this.report = true;
    const input = {
      id: this.model._id
    };
  }

  toggleValue(item: { selected: boolean }): void {
    item.selected = !item.selected;
  }

  submit(): boolean | undefined {
    const valid = true;
    // const validationArray = JSON.parse(JSON.stringify(this.model.attributes));

    if (!valid) {
      return false;
    }
    const input = new FormData();
    input.append('formId', this.model._id);
    input.append('attributes', JSON.stringify(this.model.attributes));
    return true;
  }

  setShowTrue(): void {
    this.show = true;
  }

  getJsonListData(): void {
    this.dataTransferService.getFromServer().subscribe(response => {
      this.retJsonObj = response.body;
      const keyList = Object.keys(this.retJsonObj);
      keyList.forEach(elem => {
        this.pages.push({ label: elem, value: elem });
      });
    });
  }

  outputFormFile(): void {
    this.jsonDownloaderService.download(this.createOutputFormat(this.model), this.model.fieldName);
  }

  outputFormFile2(): void {
    this.dataTransferService.sendToServer(this.createOutputFormat(this.model)).subscribe(
      retData => {
        this.result = retData.body;
        alert(this.result.result);
      },
      (error: HttpErrorResponse) => {
        alert('Error');
        if (error.status === 503) {
          this.result = error.error;
        }
      }
    );
  }

  private createOutputFormat(model: any): any {
    const outformat: Array<any> = new Array<any>();

    if (model.attributes) {
      for (let i = 0; i < model.attributes.length; i++) {
        const objAttr: IField = model.attributes[i];
        const objOF: any = {};

        objOF.fieldName = objAttr.fieldName; // フィールド名
        objOF.label = objAttr.label;
        if (objAttr.fieldType) {
          objOF.fieldType = objAttr.fieldType;
        } else {
          objOF.fieldType = 'String';
        }
        if (objAttr.required) {
          objOF.fieldValidateRules = ['required'];
        }
        objOF.ctrlType = objAttr.ctrlType; // 項目種別
        objOF.ctrlRowNo = objAttr.ctrlRowNo = `${i + 1}`; // 行No
        objOF.ctrlGroupNo = objAttr.ctrlGroupNo = `${i + 1}`; // グループ番号
        objOF.ctrlItemNo = '0'; // 枝番
        objOF.columnCnt = objAttr.columnCnt; // 列の数（layoutで使うのみ）
        objOF.ctrlInOut = objAttr.ctrlInOut ? objAttr.ctrlInOut : 'in'; // 入出力
        objOF.ctrlFormat = objAttr.ctrlFormat ? objAttr.ctrlFormat : ''; // 表示フォーマット
        objOF.ctrlTextAlign = objAttr.ctrlTextAlign ? objAttr.ctrlTextAlign : 'left'; // 文字表示位置
        objOF.ctrlWidth = objAttr.ctrlWidth ? objAttr.ctrlWidth : '-1'; // 表示桁
        objOF.ctrlEncode = objAttr.ctrlEncode ? objAttr.ctrlEncode : 'UTF-8'; // 文字種
        if (['radio', 'dropdown-list', 'table'].includes(objAttr.ctrlType)) {
          objOF.values = objAttr.values;
          objOF.entities = objAttr.entities;
          objOF.entities.forEach((element : any) => {
            element.tableFields = this.getJsonStructByName(element.name);
          });
        }
        objOF.ctrLabelDirect = objAttr.ctrLabelDirect ? objAttr.ctrLabelDirect : ''; // ラベル並べ位置
        objOF.placeholder = objAttr.placeholder; // プレースホルダー

        outformat.push(objOF);

        if (objAttr.ctrlType === 'layout') {
          if (objAttr.subFields) {
            for (let j = 0; j < 3; j++) {
              if (objAttr.subFields[j]) {
                for (let k = 0; k < objAttr.subFields[j].length; k++) {
                  const objOF1: any = {};
                  objOF1.fieldName = objAttr.subFields[j][k].fieldName; // フィールド名
                  objOF1.label = objAttr.subFields[j][k].label;
                  if (objAttr.fieldType) {
                    objOF1.fieldType = objAttr.fieldType;
                  } else {
                    objOF1.fieldType = 'String';
                  }
                  if (objAttr.subFields[j][k].required) {
                    objOF1.fieldValidateRules = ['required'];
                  }
                  objOF1.ctrlRowNo = objAttr.ctrlRowNo; // 行No
                  objOF1.ctrlGroupNo = objAttr.ctrlGroupNo; // グループ番号
                  objOF1.ctrlColNo = `${j + 1}`; // 列番号
                  objOF1.ctrlItemNo = `${k + 1}`; // 枝番
                  objOF1.columnCnt = objAttr.subFields[j][k].columnCnt; // 列の数（layoutで使うのみ）
                  objOF1.ctrlType = objAttr.subFields[j][k].ctrlType; // 項目種別
                  objOF1.ctrlInOut = objAttr.subFields[j][k].ctrlInOut; // 入出力
                  objOF1.ctrlFormat = objAttr.subFields[j][k].ctrlFormat; // 表示フォーマット
                  objOF1.ctrlTextAlign = objAttr.subFields[j][k].ctrlTextAlign; // 文字表示位置
                  objOF1.ctrlWidth = objAttr.subFields[j][k].ctrlWidth; // 表示桁
                  objOF1.ctrlEncode = objAttr.subFields[j][k].ctrlEncode; // 文字種
                  if (['table', 'radio', 'dropdown-list'].includes(objAttr.subFields[j][k].ctrlType)) {
                    objOF1.values = objAttr.subFields[j][k].values;
                    objOF1.entities = objAttr.subFields[j][k].entities;
                    objOF1.entities.forEach((element : any) => {
                      element.tableFields = this.getJsonStructByName(element.name);
                    });
                  }
                  objOF1.ctrLabelDirect = objAttr.subFields[j][k].ctrLabelDirect ? objAttr.subFields[j][k].ctrLabelDirect : ''; // ラベル並べ位置
                  objOF1.placeholder = objAttr.subFields[j][k].placeholder; // プレースホルダー

                  outformat.push(objOF1);
                }
              }
            }
          }
        }
      }
    }

    let rtForm: any = {};

    const useMap = new Map<string, any>(Object.entries(this.retJsonObj));
    if (useMap) {
      rtForm = useMap.get(this.jsonFileName);
      if (!rtForm) {
        rtForm = {
          name: model.fieldName,
          pageDesign: {},
          cFields: {}
        };
      }
    }
    rtForm.cFields = outformat;
    rtForm.pageDesign = model.attributes;

    return rtForm;
  }

  private getJsonStructByName(name: string): any {
    if (name) {
      const filename = `${name[0].toUpperCase()}${name.substring(1)}.json`;
      let useMap: any;
      if (this.retJsonObj) {
        useMap = new Map<string, any>(Object.entries(this.retJsonObj));
      }
      return useMap.get(filename);
    } else {
      return;
    }
  }

  chgSelectedItem(event: any): void {
    this.jsonFileName = this.selectedPage;
    const useMap = new Map<string, any>(Object.entries(this.retJsonObj));
    const inputModel = useMap.get(this.jsonFileName);
    if (inputModel.pageDesign) {
      this.model.attributes = inputModel.pageDesign;
    } else {
      if (inputModel.fields) {
        const arrInModel: Array<any> = inputModel.fields;
        if (arrInModel) {
          this.model.fieldName = inputModel.name;
          this.model.theme.bgColor = '#f7f2f2';
          this.model.theme.textColor = '#0d0d0d';
          this.model.attributes = [];

          const ctrlModel: Array<any> = this.model.attributes;
          for (let i = 0; i < arrInModel.length; i++) {
            // TODO
            // const objField = new field();
            let objField: any;
            objField.ctrlFieldName = arrInModel[i].fieldName;
            objField.label = arrInModel[i].fieldName;
            objField.fieldName = arrInModel[i].fieldName;
            objField.fieldType = arrInModel[i].fieldType;
            objField.ctrlType = 'text';
            ctrlModel.push(objField);
          }
        }
      }
    }
  }

  goDown(): void {
    const top = this.rmPxCvtNum(this.divList?.nativeElement.style.marginTop);
    // this.divList.nativeElement.style.marginTop = `${top + 50}` + 'px';
    console.log(this.divList?.nativeElement.style.marginTop);
  }

  goUp(): void {
    const top = this.rmPxCvtNum(this.divList?.nativeElement.style.marginTop);
    if (top < 0) {
      // this.divList.nativeElement.style.marginTop = '0px';
    } else {
      // this.divList.nativeElement.style.marginTop = `${top - 50}` + 'px';
    }
  }

  goReset(): void {
    // this.divList.nativeElement.style.marginTop = '0px';
  }

  private rmPxCvtNum(str: string): number {
    let retN = 0;
    if (str.includes('px')) {
      try {
        const rtStr = str.substr(0, str.length - 2);
        retN = parseInt(rtStr, 10);
      } catch {}
    }
    return retN;
  }

  clkDeal(): void {
    if (this.movInCnt === 1) {
      const obj = this.model.attributes;
      if (obj) {
        obj.forEach((element : any) => {
          element.toggle = false;
        });
      }
    }
    this.movInCnt = 0;
  }
}
