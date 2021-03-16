import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { PostDto } from './../home/Response';
import { Subscription } from 'rxjs';
import { ApiService } from '../app.api.service';
import { NotificationService } from '../app.notification.service';

interface UserModel {
  UserName: string;
  Password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ['']
})

export class LoginComponent implements OnInit {

  public _getAllPostSubscriber$: Subscription;
  subscribers: any = {};
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;

  public postList: PostDto[];

  constructor(public apiService: ApiService,
    public _router: Router,
    public notificationService: NotificationService) {

  }

  ngOnInit() {
  }

  login(form: NgForm) {
  //  const credentials = JSON.stringify(form.value);
  //  this.http.post("http://localhost:5000/api/auth/login", credentials, {
  //    headers: new HttpHeaders({
  //      "Content-Type": "application/json"
  //    })
  //  }).subscribe(response => {
  //    const token = (<any>response).token;
  //    localStorage.setItem("jwt", token);
  //    this.invalidLogin = false;
  //    this.router.navigate(["/"]);
  //  }, err => {
  //    this.invalidLogin = true;
  //  });
    let token;
    //let data = { UserName: 'johndoe', Password: 'def@123' }
    let credentials = JSON.stringify(form.value);
    this.apiService.httpPost<any>('Auth/login', credentials)
          .subscribe(
            (response) => {
              token = (<any>response).token;
              localStorage.setItem("jwt", token);
              const refreshToken = (<any>response).refreshToken;
              //localStorage.setItem("jwt", token);
              localStorage.setItem("refreshToken", refreshToken);
            },
            (error) => {
              this.notificationService.showError(error);
              console.log(error);
            },
            () => {
              //console.log(token);
              this._router.navigate(['dashboard']);
            });
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    this._router.navigate(['login']);
  }

}

