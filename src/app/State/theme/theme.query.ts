import { Query } from '@datorama/akita';
import { ThemeStore, ThemeState } from './theme.store';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeQuery extends Query<ThemeState> {
  isDarkTheme$ = this.select(state => state.isDarkTheme);

  
  constructor(protected store: ThemeStore) {
    super(store);
  }

  isDarkTheme() {
    return !!this.getValue().isDarkTheme;
  }
}