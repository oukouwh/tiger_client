import { AutoFormHiddenComponent } from './auto-form-hidden/auto-form-hidden.component';
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
import { AutoFormConfigComponent } from './auto-form-config/auto-form-config.component';


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
    AutoFormConfigComponent,
    AutoFormHiddenComponent,
  ],
})
export class AutoFormModule { }