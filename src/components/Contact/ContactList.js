import React from 'react';
import ContactTable from "./ContactTable";
import {useSelector} from "react-redux";
import {selectAllPosts} from "../../features/posts/postsSlice";

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