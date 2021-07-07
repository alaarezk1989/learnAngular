import {Component, OnInit} from '@angular/core';
import { AuthService } from './auth/auth.service';
import { logginService } from './loggin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private logginService: logginService){ }

  ngOnInit(){
    this.authService.autoLogin();
    this.logginService.printLog('hello from AppComponent ngOnInit');
  }

}
