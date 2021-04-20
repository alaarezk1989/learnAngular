import {Component} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
    .online {
      color: white;
    }
  `]
})
export class ServerComponent {
  serverId = 10;
  serverstatus = 'offline';

  constructor() {
    this.serverstatus = Math.random() > 0.5 ? 'online' : 'offline';
  }

  // tslint:disable-next-line:typedef
  getServerStatus() {
    return this.serverstatus;
  }

  // tslint:disable-next-line:typedef
  getColor() {
    return this.serverstatus === 'online' ? 'green' : 'red';
  }
}
