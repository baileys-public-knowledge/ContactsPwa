import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { ContactStore } from '../State/Contacts/contact.store';
import { Contact } from '../State/Contacts/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {

  constructor(private contactStore: ContactStore,
              private http: HttpClient) {
  }

  /* get() {
    this.http.get('https://akita.com').subscribe((entities) => this.contactStore.set(entities));
  } */

  add(contact: Contact) {
    this.contactStore.add(contact);
  }

  update(id, contact: Partial<Contact>) {
    this.contactStore.update(id, contact);
  }

  remove(id: ID) {
    this.contactStore.remove(id);
  }

  clearAll()
  {
    this.contactStore.reset();
  }
}
