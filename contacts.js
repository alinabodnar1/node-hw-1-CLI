const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Повертає масив контактів
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

// Повертає об'єкт контакту з id або null, якщо контакт з таким id не знайдений
const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
};

// Повертає об'єкт видаленого контакту або null, якщо контакт з таким id не знайдений
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

// Повертає об'єкт доданого контакту
const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    ...data,
    id: nanoid(5),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return console.log(newContact);
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
