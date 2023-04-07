import PropTypes from 'prop-types';
import css from "./ContactItem.module.css";

const ContactItem = ({name, id, number, deleteContact}) => {
    return (
        <li id={id} className={css.contactsItem}>
            <p className={css.contactsName}>{name}:</p> 
            <p className={css.contactsNumber}>{number}</p> 
            <button type="button" onClick={() => deleteContact(id)} className={css.contactsBtn}>Delete</button>
        </li>)
}

ContactItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactItem;