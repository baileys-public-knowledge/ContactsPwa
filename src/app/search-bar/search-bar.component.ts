import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  value = '';

  constructor() { }

  ngOnInit() {
  }

  public HasSearch():boolean
  {
    return this.value.length != 0;
  }

}
