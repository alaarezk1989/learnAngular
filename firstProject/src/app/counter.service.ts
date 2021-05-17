export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  // tslint:disable-next-line:typedef
  incrementActiveToInactive() {
    this.activeToInactiveCounter++;
    console.log(this.activeToInactiveCounter);
  }

  // tslint:disable-next-line:typedef
  incrementInactiveToActive() {
    this.inactiveToActiveCounter++;
    console.log(this.inactiveToActiveCounter);
  }


}

