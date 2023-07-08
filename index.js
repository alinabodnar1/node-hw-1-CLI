
const fs = require("fs/promises");
const path = require("path");
const { listContacts, getContactById, addContact, removeContact } = require("./contacts");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      return console.table(contacts);

    case "get":
      const contact = await getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await addContact({ name, email, phone });
      return newContact;

    case "remove":
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      console.warn("Unknown action type! - message from 'default' in invokeAction function");
  }
};

invokeAction(argv);