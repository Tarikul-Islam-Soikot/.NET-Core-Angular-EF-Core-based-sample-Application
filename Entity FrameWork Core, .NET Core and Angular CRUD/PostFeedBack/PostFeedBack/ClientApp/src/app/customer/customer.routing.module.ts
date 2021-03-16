import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CustomerListComponent } from './customerList.component';
import { CustomerComponent } from './customer.component';
import { CreateCustomerDeactivateService } from '../auth-guard/deactivate.guard.service';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customer'
    },
    children: [
      {
        path: 'customerList',
        component: CustomerListComponent,
        data: {
          title: 'Customer List'
        }
      },
      {
        path: 'customer',
        component: CustomerComponent,
        canDeactivate: [CreateCustomerDeactivateService],
        data: {
          title: 'Add Customer'
        }
      },
      {
        path: 'customer/:id',
        component: CustomerComponent,
        canDeactivate: [CreateCustomerDeactivateService],
        data: {
          title: 'Edit Customer'
        }
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]

})
export class CustomerRoutingModule { }
