import { NgModule } from '@angular/core';
import { CustomerListComponent } from './customerList.component';
import { CustomerComponent } from './customer.component';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer.routing.module';
import { PickerModule } from '../pickers/pickers.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { LanguageTranslateModule } from '../language-translate/lang-translate.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpClient } from '@angular/common/http';

export function HomeHttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/translate/customer/", suffix: ".json" },
  ])
}

@NgModule({
  declarations:
    [
      CustomerListComponent,
      CustomerComponent,
    ],
  imports: [
    CustomerRoutingModule,
    PickerModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    InputsModule,
    DropDownsModule,
    CommonModule,
    //LanguageTranslateModule,
    //DateInputsModule,,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HomeHttpLoaderFactory,
        deps: [HttpClient]
      }
    }), 
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class CustomerModule { }
