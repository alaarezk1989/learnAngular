import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dinaFarms-angular';
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  loadFeature = 'recipe';

  onIntervalFired(firedNumber: number) {
    if (firedNumber % 2 === 0) {
      this.evenNumbers.push(firedNumber);
    } else {
      this.oddNumbers.push(firedNumber);
    }
  }

  onNavigate(feature: string) {
    this.loadFeature = feature;
  }
}
