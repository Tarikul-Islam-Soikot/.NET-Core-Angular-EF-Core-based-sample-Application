import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { NotificationService } from './app.notification.service';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerModule } from './customer/customer.module';
import { AppRoutingModule } from './app.routing.module';
import { StudentModule } from './students/student.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerHttpInterceptor } from './custom-http-interceptor';
import { AuthService } from './auth-guard/auth.service';
import { AuthGuardService } from './auth-guard/auth.guard.service';
import { PubSubService } from './app.api.service';
import { CreateCustomerDeactivateService } from './auth-guard/deactivate.guard.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoginComponent } from './auth-guard/login.component';
import { JwtModule } from "@auth0/angular-jwt";
import { CommonModule } from '@angular/common';
import { NavmenuService } from './nav-menu/nav-menu.service';
//import { LanguageTranslateModule } from './language-translate/lang-translate.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { NgxSpinnerModule } from "ngx-spinner";

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: "./assets/translate/home/", suffix: ".json" },
    { prefix: "./assets/translate/customer/", suffix: ".json" },
    { prefix: "./assets/translate/home/", suffix: ".json" },
  ])
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DashboardComponent,
    SpinnerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //ReactiveFormsModule,
    //BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    GridModule,
    CommonModule,
    NgxSpinnerModule,
    //RouterModule.forRoot([
    //  { path: '', component: HomeComponent, pathMatch: 'full' },
    //  { path: 'counter', component: CounterComponent },

    //]),
    ModalModule.forRoot(),
    InputsModule,
    ToastrModule.forRoot(),
    DialogsModule,
    DateInputsModule,
    TreeViewModule,
    CustomerModule,
    StudentModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }), 
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44392"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomerHttpInterceptor,
      multi: true,
    },
    BsModalService,
    NotificationService,
    PubSubService,
    AuthService,
    AuthGuardService,
    CreateCustomerDeactivateService,
    NavmenuService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

