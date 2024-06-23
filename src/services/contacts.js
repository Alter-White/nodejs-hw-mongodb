import { ContactsCollection } from '../db/models/contact.js';

export const fetchAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const findContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
