import { Injectable } from '@angular/core';
import { QueryEntity, toBoolean } from '@datorama/akita';
import { ContactStore, ContactState } from './contact.store';
import { Contact } from './contact.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactQuery extends QueryEntity<ContactState, Contact> {

  public contactFilterTerm$ = this.select(state => state.ui.contactFilterTerm);
  public hasContactFilterTerm$ = this.select(state => toBoolean(state.ui.contactFilterTerm != ''));
  
  public getAll$ = this.contactFilterTerm$
    .pipe(
      switchMap(
        search => 
        {
          if(search === '')
          {
            return this.selectAll();
          }else
          {
            return this.selectAll({filterBy: entity => `${entity.FirstName} ${entity.LastName}`.includes(search)});
          }
        }
        )
      );

  constructor(protected store: ContactStore) {
    super(store);
  }

}
