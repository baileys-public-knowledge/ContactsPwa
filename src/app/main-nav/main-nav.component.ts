import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateService } from '../Services/update.service';
import { ThemeQuery } from '../State/theme/theme.query';
import { ThemeService } from '../Services/theme.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, public updateService: UpdateService, public themeQuery: ThemeQuery, private themeService: ThemeService) {}


  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
