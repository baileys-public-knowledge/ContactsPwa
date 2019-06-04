import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Contact } from './contact.model';

export interface ContactState extends EntityState<Contact> {
  ui:
  {
    contactFilterTerm: string;
  }
}


const initialState = {
  ui:{
    contactFilterTerm: ''
  }
} as ContactState;

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contact', cache: { ttl: 36000 }, resettable: true })
export class ContactStore extends EntityStore<ContactState, Contact> {


  clearSearchTerm()
  {
    this.update(initialState);
  }

  constructor() {
    super(initialState);
  }

}

