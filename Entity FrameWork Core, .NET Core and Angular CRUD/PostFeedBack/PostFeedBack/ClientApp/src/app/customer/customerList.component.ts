import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { ApiService, PubSubService } from '../app.api.service';
import { NotificationService } from '../app.notification.service';
import { PostDto } from '../home/Response';
import { Customer } from './customer';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-customerList',
  templateUrl: './customerList.component.html',
  styles: ['']
})

export class CustomerListComponent implements OnInit {

  public _getCustomerListSubscriber$: Subscription;
  subscribers: any = {};
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  public bsModalRef: BsModalRef;
  public customers: Customer[];
  selectedPosts: PostDto[];

  public config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackDropClick: true
  }
  constructor(public apiService: ApiService,
    public pubService: PubSubService,
    public modalService: BsModalService,
    private router: Router,
    public notificationService: NotificationService,
    public translate: TranslateService) {
    translate.setDefaultLang('bn');
    console.log(translate);
  }

  ngOnInit() {
    this.search();
  }

  public openModal(template: TemplateRef<any>): void {
    this.pubService.on('demo-picker')
      .subscribe(
        () => this.closeModal(),
        (error) => { this.notificationService.showError(error); },
        () => {

        });

    this.bsModalRef = this.modalService.show(
      template,
      Object.assign({}, this.config, { class: 'gray modal-lg' })
    )
  }

  public closeModal(): void {
    this.bsModalRef.hide();
  }

  GetChildData(data) {
    console.log(data);
    this.selectedPosts = data;
  } 

  public navigateToChildren(): void {
    this.router.navigate(["customers/customer"]);
  }

  public search(): void {

    this.subscribers.getCustomerList
      = this.apiService.httpGet<Customer[]>('Customer/GetCustomers')
          .subscribe(
            (x) => { this.customers = x; },
            (error) => {
              this.notificationService.showError(error);
              console.log(error);
            },
            () => {
              if (this.customers != undefined && this.customers != null)
                this.loadGrid();
            });
  }

  public loadGrid(): void {
    this.gridView = {
      data: this.customers.slice(this.skip, this.skip + this.pageSize),
      total: this.customers.length
    };
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadGrid();
  }

  public onEditClick(customerId: number): void {
    this.router.navigate(["customers/customer/" + customerId]);
  }

  public DeleteCustomer(customerId: number): void {

    this.subscribers.getCustomerList
      = this.apiService.httpDelete<any>('Customer/Delete/', customerId)
        .subscribe( () => {},
          (error) => {
            this.notificationService.showError(error);
            console.log(error);
          },
          () => {
            
          });
  }

}

