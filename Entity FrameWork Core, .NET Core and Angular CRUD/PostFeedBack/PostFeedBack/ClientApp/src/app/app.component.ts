import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { AuthGuardService } from './auth-guard/auth.guard.service';
import { NavmenuService } from './nav-menu/nav-menu.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  showLoadingIndicator = true;
  public IsNavbarVisible = false;

  bdColor = "rgba(51,51,51,0.8)";
  color = "#4dbad1";
  size = size.medium;
  type = type.ballClipRotate;

  constructor(public _router: Router,
    public authService: AuthGuardService,
    public nav: NavmenuService,
    public translate: TranslateService) {

    translate.setDefaultLang('bn');
    this._router.navigate(['login']);

    this._router.events.subscribe(routerEvent => {

    //  // On NavigationStart, set showLoadingIndicator to ture
      if (routerEvent instanceof NavigationStart) {
        //this.showLoadingIndicator = true;
        this.nav.visible = this.authService.canActivate() ? true : false;
        //setInterval(() => {
        //  console.log('loading route...');
        //  this.showLoadingIndicator = true;
        //}, 1000);
      }

    //  // On NavigationEnd or NavigationError or NavigationCancel
    //  // set showLoadingIndicator to false
    //  if (routerEvent instanceof NavigationEnd) {
    //    this.showLoadingIndicator = false;

    //    //setInterval(() => {
    //    //  console.log('loading route...');
    //    //}, 1000);
    //  }

    });
  }

}
export const size = {
  default: 'default',
  small: 'small',
  medium: 'medium',
  large: 'large',
}

export const type = {
  ballAtom: 'ball-atom',
  ballBeat: 'ball-beat',
  ballClipRotate: 'ball-clip-rotate',
  ballClipRotateMultiple: 'ball-clip-rotate-multiple',
  ballClipRotatePulse: 'ball-clip-rotate-pulse',
  ballFussion: 'ball-fussion',
  ballgridBeat: 'ball-grid-beat',
  ballgridPulse: 'ball-grid-pulse',
  ballPulse: 'ball-pulse',
  ballSpinClockwise: 'ball-spin-clockwise',
  ballSpinFade: 'ball-spin-fade',
  ballSquareSpin: 'ball-square-spin',
  ballTrianglePath: 'ball-triangle-path',
  ballZigZag: 'ball-zig-zag',
  cubeTransition: 'cube-transition',
  fire: 'fire',
  lineScale: 'line-scale',
  lineScalePulseOut: 'line-scale-pulse-out',
  pacman: 'pacman',
  squareLoader: 'square-loader'
}

export const screenMode = {
  full: true,
  default: false
}

