import React, {useState} from 'react';
import {getContactStorage, getDataById, getDefaultContact, searchContactInfo} from "../util/";
import ContactForm from "../components/Contact/ContactForm";
import ContactSearch from "../components/Contact/ContactSearch";
import ContactList from "../components/Contact/ContactList";

const Contact = () => {

    const [contacts, setContacts] = useState(getContactStorage());
    const [contact, setContact] = useState(getDefaultContact());

    const editActionInfo = (id) => {
        setContact(getDataById(id))
    }

    const searchInfo = (search) => {
        setContacts(searchContactInfo(search));
    }

    return (
        <div className="container">
            <ContactForm contact={contact} />
            <ContactSearch searchInfo={searchInfo} />
            <ContactList data={contacts} editActionInfo={editActionInfo} />
        </div>
    );
}

export default Contact;