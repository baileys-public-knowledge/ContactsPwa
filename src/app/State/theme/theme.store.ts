import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface ThemeState {
   isDarkTheme: boolean;
}

export function createInitialState(): ThemeState {
  return {
    isDarkTheme: false
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'theme', resettable: true })
export class ThemeStore extends Store<ThemeState> {
  constructor() {
    super(createInitialState());
  }
}