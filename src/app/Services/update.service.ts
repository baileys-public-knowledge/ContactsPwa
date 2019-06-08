import { Injectable, ApplicationRef } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { interval, concat } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private appRef: ApplicationRef, private updates: SwUpdate, private _snackBar: MatSnackBar) {

    const appIsStable$ = appRef.isStable.pipe(first(isStable => isStable === true));

    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);


    everySixHoursOnceAppIsStable$.subscribe(x=> this.updates.checkForUpdate());


    this.updates.


    this.updates.available.subscribe(event =>
      {
        this.DisplayUpdateNotification();
        console.log(`Old: ${event.current} New: ${event.available}`);
      });

    this.updates.activated.subscribe(event =>
      {
        console.log(`Old was: ${event.previous} New is ${event.current}`);
      });
   }




   private DisplayUpdateNotification()
   {
     // 
     var updateNotification = this._snackBar.open("An Update is available", "Update", {
       horizontalPosition: "left"
     });


     updateNotification.afterDismissed().subscribe(x=>{
      if(!x.dismissedByAction)
      {
        // Sleep 10 seconds and show again
        setTimeout(() => {
          this.DisplayUpdateNotification();
        }, 10*1000);
      }
     });


     updateNotification.onAction().subscribe(()=>
      {
        // Perform the update
        console.log("Update Triggered");
        this.UpdateApplication();
      });
   }



   public UpdateApplication()
   {
     this.updates.activateUpdate().then(()=>document.location.reload());
   }
}
