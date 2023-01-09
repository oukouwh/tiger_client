/*
 * @Author: 王浩
 * @Date: 2022-12-29 16:04:58
 * @LastEditTime: 2023-01-06 14:34:44
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/auto-form.module.ts
 * @Description: Do not edit
 */
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { autoFormState } from './auto-form.route';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { DndModule } from 'ngx-drag-drop';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { AutoFormComponent } from './main/auto-form.component';
// import { AutoFormConfigComponent } from './auto-form-config/auto-form-config.component';
// import { AutoFormCovertComponent } from './auto-form-covert/auto-form-covert.component';
// import { AutoFormHiddenComponent } from './auto-form-hidden/auto-form-hidden.component';
import { AutoFormListComponent } from './auto-form-list/auto-form-list.component';
import { AutoFormEditorComponent } from './auto-form-editor/auto-form-editor.component';
import { DataTransferService } from './service/data-transfer.service';
import { JsonDownloaderService } from './service/json-downloader.service';
import { JsonReaderService } from './service/json-reader.service';

@NgModule({
  imports: [
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(autoFormState),
    FormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    ButtonModule,
    DndModule,
    CommonModule,
    DropdownModule
  ],
  declarations: [
    AutoFormComponent,
    // AutoFormConfigComponent,
    // AutoFormHiddenComponent,
    // AutoFormCovertComponent,
    AutoFormListComponent,
    AutoFormEditorComponent
  ],
  providers: [
    JsonReaderService,
    JsonDownloaderService,
    DataTransferService
  ]
})
export class AutoFormModule { }