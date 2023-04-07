import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import { Component } from "react";
import css from "./ContactForm.module.css";
class ContactForm extends Component {
    state = {
        name: "",
        id: "",
        number: "",
    }

    handleChange = evt => { 
        const { name, value, number } = evt.currentTarget;
        this.setState({[name]: value, [number]: value})
    }

    onFormSubmit = evt => {
        evt.preventDefault();
        const id = nanoid();
        const form = evt.currentTarget;
        const name = form.elements.name.value;
        const number = form.elements.number.value;

        const doubleContact = this.props.contacts.find((contact) => contact.name === name)
            if (doubleContact) {
                alert(`${name} is already in contacts`)
            } else {
                this.props.submit({ name, id, number })
                this.resetForm()
              }
    }

    resetForm = () => {
        this.setState({ name: "", id: "", number: "" })
    };
    
    render() { 
        return (
            <form onSubmit={this.onFormSubmit} className={css.form}>
                <label htmlFor={this.id} className={css.formLabel}>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                        className={css.formInput}
                    />
                </label>
                <label htmlFor={this.id} className={css.formLabel}>
                    Number
                    <input
                        type="tel"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
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
}

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired})
    ).isRequired,
};

export default ContactForm;