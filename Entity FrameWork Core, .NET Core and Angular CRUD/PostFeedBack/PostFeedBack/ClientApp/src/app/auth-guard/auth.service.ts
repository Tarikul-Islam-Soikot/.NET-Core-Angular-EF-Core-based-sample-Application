import { Component, Injectable, OnInit } from '@angular/core';

@Injectable()
export class AuthService  {

  constructor() { }

  public isAuthenticated(): boolean {
   var token = localStorage.getItem('token');
    return !!token;
  }

}
