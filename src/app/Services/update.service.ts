import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private updates: SwUpdate) {

    this.updates.available.subscribe(event =>
      {
        console.log(`Old: ${event.current} New: ${event.available}`);
      });

    this.updates.activated.subscribe(event =>
      {
        console.log(`Old was: ${event.previous} New is ${event.current}`);
      });
   }
}
