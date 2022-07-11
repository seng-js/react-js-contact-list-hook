import './App.css';
import ContactList from "./components/Contact/ContactList";
import ContactForm from "./components/Contact/ContactForm";
import ContactSearch from "./components/Contact/ContactSearch";
import {getContactStorage, getDataById, searchContactInfo, getDefaultContact} from "./util/";
import React, {useState} from 'react';

function App() {
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

export default App;
