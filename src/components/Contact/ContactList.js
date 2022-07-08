import React from 'react';
import ContactTable from "./ContactTable";

const ContactList = (props) => {
    const editActionInfo = (id) => {
        props.editActionInfo(id);
    }

    return (
        <>
            <h4>Total: {props.data.length} records</h4>
            <ContactTable data={props.data} editActionInfo={editActionInfo} />
        </>
    );
}

export default ContactList;