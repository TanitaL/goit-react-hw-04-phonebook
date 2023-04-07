import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import { React, useState } from "react";
import css from "./ContactForm.module.css";


const ContactForm = ({ contacts, submit }) => {
    
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [number, setNumber] = useState('')

    const handleChange = evt => { 
        const { name, number, value } = evt.currentTarget;

        if (name === "name") setName(value)
        else if(number === number) setNumber(value)
    }
    const onFormSubmit = evt => {
        evt.preventDefault();
        const id = nanoid();
        const form = evt.currentTarget;
        const name = form.elements.name.value;
        const number = form.elements.number.value;

        const doubleContact = contacts.find((contact) => contact.name === name)
            if (doubleContact) {
                alert(`${name} is already in contacts`)
                resetForm()
            } else {
                submit({ name, id, number })
                resetForm()
              }
    }

    const resetForm = () => {
        setName("")
        setNumber("")
        setId("")
    };

  return (
    <form onSubmit={onFormSubmit} className={css.form}>
        <label htmlFor={id} className={css.formLabel}>
            Name
            <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                className={css.formInput}
            />
        </label>
        <label htmlFor={id} className={css.formLabel}>
            Number
            <input
                type="tel"
                name="number"
                value={number}
                onChange={handleChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                className={css.formInput}
            />
        </label>
            
        <button type="submit" className={css.formButton}>Add contact</button>
    </form>
  )
}

export default ContactForm


ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
    name: PropTypes.string})
    ),
  submit: PropTypes.func.isRequired
};
