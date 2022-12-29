/*
 * @Author: 王浩
 * @Date: 2022-12-29 16:04:58
 * @LastEditors: 
 * @LastEditTime: 2022-12-29 16:16:55
 * @FilePath: /tiger_client/src/main/webapp/app/auto-form/auto-form.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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

  ],
})
export class AutoFormModule { }