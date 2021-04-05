import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { ApiService } from '../app.api.service';
import { NotificationService } from '../app.notification.service';
import { Customer } from './customer';
import { TranslateService } from '@ngx-translate/core';

export class tempDto {
  first_name: string;
  last_name: string;
  likes: string;
}

export class temp1Dto {
  name: string;
}

export class temp2Dto {
  likes: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styles: ['']
})

export class CustomerComponent implements OnInit {

  @ViewChild('customerform', { static: false }) public CustomerForm: NgForm;
  public _getAllPostSubscriber$: Subscription;
  subscribers: any = {};
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public FirstName: string;
  public LastName: string;
  public MobileNo: string;
  public customerId: number;

  public customer: Customer;
  //public postList: PostDto[];
  customerForm: FormGroup;
  usersByNames: temp1Dto[] = [];
  usersByLikes: temp2Dto[] = [];

  constructor(public apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    public fromBuilder: FormBuilder,
    public notificationService: NotificationService,
    public translate: TranslateService) {
    this.createCustomerForm();

    this.customerId = route.snapshot.params['id'];
  }

  ngOnInit() {

    this.customer = new Customer();

    if (this.customerId != undefined) {

      this.subscribers.getCustomerById
        = this.apiService.httpGet<Customer>('Customer/GetCustomerById' + '/' + this.customerId)
          .subscribe(
            (x) => { this.customer = x; },
            (error) => {
              this.notificationService.showError(error);
              console.log(error);
            },
            () => {
            });
    }

    //var myUsers: tempDto[]  = [
    //  { first_name: 'shark', last_name: 'shark', likes: 'ocean' },
    //  { first_name: 'turtle', last_name: 'turtle', likes: 'pond' },
    //  { first_name: 'otter', last_name: 'otter', likes: 'fish biscuits' }
    //]

    //myUsers.map(item => {
    //  var temp1dto = new temp1Dto();
    //  var temp2dto = new temp2Dto();
    //  temp1dto.name = item.first_name + item.last_name;
    //  temp2dto.likes = item.likes;

    //  this.usersByNames.push(temp1dto);
    //  this.usersByLikes.push(temp2dto);
    //})

    //console.log(this.usersByNames, this.usersByLikes);

    //const myAwesomeArray = [1, 2, 3, 4, 5]
    //const myAwesomeArray = [];

    //for (let i = 0; i < 10000000; i++) {
    //  myAwesomeArray.push(Math.random());
    //}
    //console.log(myAwesomeArray);

    //const startForEach = performance.now()
    //myAwesomeArray.forEach(x => (x + x) * 10000000000)
    //const endForEach = performance.now()
    //console.log(`Speed [forEach]: ${endForEach - startForEach} miliseconds`)

    //const startMap = performance.now()
    //myAwesomeArray.map(x => (x + x) * 10000000000)
    //const endMap = performance.now()
    //console.log(`Speed [map]: ${endMap - startMap} miliseconds`)
  }

  Submit() {
    console.log(this.customer);

    this.apiService.httpPost<any>('Customer/Save', this.customer)
      .subscribe((response) => { console.log(response); },
        (error) => {
          this.notificationService.showError(error);
          console.log(error);
        },
        () => {
        });
  }

  public createCustomerForm() {
    this.customerForm = this.fromBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      //mNo: ['', Validators.required, Validators.pattern(/^(?:88)?01(?:\d{9})$/)],
      mNo: ['', [Validators.pattern(/^(?:88)?01(?:\d{9})$/), Validators.maxLength(13), Validators.required]],
      
    })
  }

  public navigateToParent(): void {
    this.router.navigate(["customers/customerList"]);
  }

}

