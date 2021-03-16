import { Component, Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public _auth: AuthService,
    public _router: Router,
    private jwtHelper: JwtHelperService,
    public httpClient: HttpClient) { }

  //canActivate(): boolean {
  //  const token = localStorage.getItem("jwt");
  //  if (token && !this.jwtHelper.isTokenExpired(token)) {
  //    return true;
  //  }
  //  this._router.navigate(["dashboard"]);
  //  return false;

  //  //if (!this._auth.isAuthenticated()) {
  //  //  this._router.navigate(['dashboard']);
  //  //  return false;
  //  //}
  //  //else
  //  //  return true;
  //}
  async canActivate() {
    const token = localStorage.getItem("jwt");

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      console.log(this.jwtHelper.decodeToken(token));
      return true;
    }

    const isRefreshSuccess = await this.tryRefreshingTokens(token);
    if (!isRefreshSuccess) {
      this._router.navigate(["login"]);
    }

    return isRefreshSuccess;
  }

  private async tryRefreshingTokens(token: string): Promise<boolean> {
    // Try refreshing tokens using refresh token
    const refreshToken: string = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      return false;
    }
    const credentials = JSON.stringify({ accessToken: token, refreshToken: refreshToken });

    let isRefreshSuccess: boolean;
    try {
      const response = await this.httpClient.post("http://localhost:44392/api/token/refresh", credentials, {
        headers: new HttpHeaders({
          "Content-Type": "application/json"
        }),
        observe: 'response'
      }).toPromise();
      // If token refresh is successful, set new tokens in local storage.
      const newToken = (<any>response).body.accessToken;
      const newRefreshToken = (<any>response).body.refreshToken;
      localStorage.setItem("jwt", newToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      isRefreshSuccess = true;
    }
    catch (ex) {
      isRefreshSuccess = false;
    }
    return isRefreshSuccess;
  }
}
