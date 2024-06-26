import { ContactsCollection } from '../db/models/contactModel.js';

export const fetchAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const findContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
