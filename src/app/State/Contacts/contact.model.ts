import { ID, guid } from '@datorama/akita';

export interface Contact {
  id: ID;
  FirstName: string;
  LastName: string;
  Email: string;
  CreatedAt: Date;
}

/**
 * A factory function that creates Contact
 */
export function createContact(params: Partial<Contact>) {
  return {
    ...params,
    id: guid(),
    CreatedAt: new Date()
  } as Contact;
}
