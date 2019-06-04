import { Component, OnInit } from '@angular/core';
import { ContactService } from '../Services/contact.service';
import { ContactQuery } from '../State/Contacts/contact.query';
import { Subject } from 'rxjs';
import { filter, debounceTime, map, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  public searchValue: string = '';
  public hasSearchValueLength: boolean = this.searchValue.length != 0;

  private _SearchDebounce$: Subject<String> = new Subject<String>();

  constructor(private contactService: ContactService, public contactQuery: ContactQuery) { }

  ngOnInit() 
  {

    this.contactService.ClearSearchTerm();

    this.contactQuery.hasContactFilterTerm$.subscribe(x => this.hasSearchValueLength =x);
    this.contactQuery.contactFilterTerm$.subscribe(x=> this.searchValue = x);

    this._SearchDebounce$.pipe(
      tap(value => {
        if(value.length === 0)
        {
          this.contactService.setContactFilterTerm('');
          this.hasSearchValueLength = false;
        }else
        {
          this.hasSearchValueLength = true;
        }
      }),
      filter(value => value.length != 0),
      debounceTime(750),
      map(x=>x.trim()),
      distinctUntilChanged()).subscribe(searchTerm => 
        {
          this.contactService.setContactFilterTerm(searchTerm);
        });
  }

  ClearSearchTerm()
  {
    this.contactService.setContactFilterTerm('');
  }

  KeyUpEvent(event: KeyboardEvent)
  {
    let value = (<HTMLInputElement>event.target).value;
    this._SearchDebounce$.next(value);
  }


}
