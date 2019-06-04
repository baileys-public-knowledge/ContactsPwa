import { ID, guid } from '@datorama/akita';

export interface Contact {
  id: ID;
}

/**
 * A factory function that creates Contact
 */
export function createContact(params: Partial<Contact>) {
  return {
    ...params,
    id: guid()
  } as Contact;
}
