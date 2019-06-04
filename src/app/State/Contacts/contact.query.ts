import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ContactStore, ContactState } from './contact.store';
import { Contact } from './contact.model';
import { filter } from 'minimatch';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactQuery extends QueryEntity<ContactState, Contact> {

  public getAll$ = this.selectAll();

  public ByName$(term: string)
  {
    if(!term)
    {
      return this.getAll$;
    }else
    {
      return this.getAll$
        .pipe(
          map(contacts => 
            contacts
            .filter(contact => 
              `${contact.FirstName} ${contact.LastName}`.includes(term)
              )));
    }
  }

  public ByEmail$(email: string)
  {
    if(!email)
    {
      return this.getAll$;
    }else
    {
      return this.getAll$
          .pipe(
            map(contacts =>
              contacts.filter(contact =>
                  contact.Email.includes(email)
                ))
          );
    }
  }

  constructor(protected store: ContactStore) {
    super(store);
  }

}
