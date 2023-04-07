import { Component } from "react";
import ContactForm from "../components/ContactForm/ContactForm.jsx";
import ContactList from "./ContactList/ContactList.jsx";
import Filter from "./Filter/Filter.jsx";
import css from "./App.module.css";
export class App extends Component { 
state = {
  contacts: [],
  filter: '',
}
  
componentDidMount() {
    const contacts = localStorage.getItem('contacts')
    const parsedContacts = JSON.parse(contacts)

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
     }
   }
  componentDidUpdate(prevProps, PrevState) { 
    if (this.state.contacts !== PrevState.contacts) { 
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
    }
  }
  
  formSubmitHandler = contact => {
    this.setState((prev) => { 
      return {
        contacts: [
          ...prev.contacts, contact
        ]
      }
    })
  }

  deleteContact = (id) => { 
    const filteredById = this.state.contacts.filter((contact) => 
    contact.id !== id)
    this.setState({contacts: filteredById})
  }

  filteredByName = () => {
    const filteredByName = this.state.contacts.filter(({ name } ) => 
    name.toLowerCase().includes(this.state.filter))
      
    return filteredByName ? filteredByName : this.state.contacts
   }

  filterContacts = event => {
    this.setState({ filter: event.currentTarget.value }); 
  }
 
  render() { 
    return (
      <div className={css.section}>
        <h1 className={css.sectionTitle}>Phonebook</h1>
        <ContactForm submit={this.formSubmitHandler} contacts={this.state.contacts} />

        <h2 className={css.sectionTitle}>Contacts</h2>
        <Filter onChange={this.filterContacts} />
        <ContactList contacts={this.filteredByName()} deleteContact={this.deleteContact}  />
      </div>
    );
  }
}
