import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { ListContact } from './ListContact/ListContact';
import { UserForm } from './UserForm/UserForm';
import { Filter } from './FilterContact';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? initialContacts
  );
  const [filter, setFilter] = useState('');
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const isContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isContact) {
      alert(`${name} already exists`);
      return;
    }
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    setContacts(prev => [...prev, newContact]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
  const filteredContacts = () => {
    const lcFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lcFilter)
    );
  };
  const onDeleteContact = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };
  return (
    <div>
      <div>
        <h1>Phone book</h1>
        <UserForm handleSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} changeFilter={changeFilter} />
        <ListContact
          filter={filteredContacts()}
          onDeleteContact={onDeleteContact}
        />
        <GlobalStyle />
      </div>
    </div>
  );
};
