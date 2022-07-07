import './App.css';
import ContactList from "./components/Contact/ContactList";
import ContactForm from "./components/Contact/ContactForm";
import ContactSearch from "./components/Contact/ContactSearch";
import {getContactStorage, getDataById, searchContactInfo} from "./Helpers";
import React, {useState} from 'react';
import {store} from "./app/store";
import {Provider} from "react-redux";

function App() {

    const [contacts, setContacts] = useState(getContactStorage());
    const [contact, setContact] = useState([]);

    const editActionInfo = (id) => {
        setContact(getDataById(id))
    }

    const searchInfo = (search) => {
        setContacts(searchContactInfo(search));
    }

    return (
      <div className="container">
          <Provider store={store}>
            <ContactForm contact={contact} />
            <ContactSearch searchInfo={searchInfo} />
            <ContactList data={contacts} editActionInfo={editActionInfo} />
          </Provider>
      </div>
    );
}

export default App;
