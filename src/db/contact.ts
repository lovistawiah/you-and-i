import { Contact, db as contactDb } from './index'

const getContacts = async () => {
  const db = await contactDb();
  return await db.getAll("contacts") as Contact[]
};

const addContact = async (value: Contact) => {
  const db = await contactDb();
  console.log(db.objectStoreNames)
  await db.add("contacts", value, value.id);
};

const updateContact = async (value: Contact) => {
  const db = await contactDb();
  return await db.put("contacts", value, value.id);
};

const clearContacts = async () => {
  return (await contactDb()).clear("contacts");
};

const searchContacts = async (search: string) => {
  const db = await contactDb();
  const contacts = await db.getAll("contacts") as Contact[]
  return contacts.filter((contact) => {
    if (contact.username.toLowerCase().includes(search.toLowerCase())) {
      return contact;
    }
  });
};

export {
  getContacts,
  addContact,
  clearContacts,
  searchContacts,
  updateContact,
};
