import { Component, OnInit } from '@angular/core';
import { of, range, interval, forkJoin, merge, race, from } from 'rxjs';
import { take, concat, count, reduce, groupBy, map, distinct, elementAt, filter, first, last, skip, toArray, defaultIfEmpty, every, find, findIndex, isEmpty } from 'rxjs/operators';
import { ApiService } from '../app.api.service';
import { NotificationService } from '../app.notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public apiService: ApiService,
    public notificationService: NotificationService) { }

  ngOnInit() {
       //this.apiService.httpGet<any[]>('Customer/GetCustomers')
       //  .subscribe(
       //    (x) => { console.log(x); },
       //   (error) => {
       //     this.notificationService.showError(error);
       //     console.log(error);
       //   },
       //   () => {

       //   });
  }

}
