import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Contact } from './contact.model';

export interface ContactState extends EntityState<Contact> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'contact', cache: { ttl: 36000}, resettable: true })
export class ContactStore extends EntityStore<ContactState, Contact> {

  constructor() {
    super();
  }

}

