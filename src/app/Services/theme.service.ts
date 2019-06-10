import { Injectable } from '@angular/core';
import { ThemeStore } from '../State/theme/theme.store';
import { ThemeQuery } from '../State/theme/theme.query';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {


  constructor(private themeStore: ThemeStore, private themeQuery: ThemeQuery)
  {

  }


  setDarkTheme(isDarkTheme: boolean) {
    this.themeStore.update({isDarkTheme: isDarkTheme});
  }

  public IsDarkThemeActive():boolean
  {
    return this.themeQuery.isDarkTheme();
  }
  
}
