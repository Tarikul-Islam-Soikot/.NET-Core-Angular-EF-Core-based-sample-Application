import { Component, Injectable, OnInit } from '@angular/core';
import { CanActivate, CanDeactivate, Router } from '@angular/router';
import { CustomerComponent } from '../customer/customer.component';


@Injectable()
export class CreateCustomerDeactivateService implements CanDeactivate<CustomerComponent> {

  canDeactivate(component: CustomerComponent): boolean {

    if (component.CustomerForm.dirty) {
      return confirm('Are you sure to discard changes?');
    }
    return true;
  }

}
