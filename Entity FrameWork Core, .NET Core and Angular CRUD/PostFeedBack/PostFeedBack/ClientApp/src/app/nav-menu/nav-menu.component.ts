import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavmenuService } from './nav-menu.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  constructor(public _router: Router,
    public nav: NavmenuService,
    public translate: TranslateService) {
    translate.setDefaultLang('bn');
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
    this._router.navigate(['login']);
  }

  selectedLanguage(lang) {
    this.translate.setDefaultLang(lang);
  }
}
