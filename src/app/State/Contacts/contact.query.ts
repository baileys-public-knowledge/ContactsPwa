import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ContactStore, ContactState } from './contact.store';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactQuery extends QueryEntity<ContactState, Contact> {

  constructor(protected store: ContactStore) {
    super(store);
  }

}
