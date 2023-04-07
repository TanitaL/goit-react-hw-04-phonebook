import { React, useEffect, useState } from "react";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import Filter from "./Filter/Filter.jsx";
import css from "./App.module.css";

const App = () => {
  const [contacts, setContacts] = useState(() => JSON.parse(localStorage.getItem('contacts')) || [])
  const [filter, setFilter] = useState('')

  useEffect(() => { 
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts])

  const formSubmitHandler = contact => {
    setContacts(prev => [...prev, contact]
    )
  }

  const deleteContact = (id) => { 
    const filteredById = contacts.filter((contact) => 
    contact.id !== id)
    
    setContacts(filteredById)
  }

  const filteredByName = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(({ name }) => 
    name.toLowerCase().includes(normalizeFilter))
  }

  const filterContacts = event => {
    setFilter(event.currentTarget.value)
  }

  return (
    <div className={css.section}>
      <h1 className={css.sectionTitle}>Phonebook</h1>
      <ContactForm submit={formSubmitHandler} contacts={contacts} />

      <h2 className={css.sectionTitle}>Contacts</h2>
      <Filter onChange={filterContacts} />
      <ContactList contacts={filteredByName()} deleteContact={deleteContact}  />
    </div>
  )
}

export default App