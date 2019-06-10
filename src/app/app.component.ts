import { Component } from '@angular/core';
import { UpdateService } from './Services/update.service';
import { ThemeQuery } from './State/theme/theme.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  


  constructor(private updateService: UpdateService, public themeQuery: ThemeQuery)
  {
    
  }
}
