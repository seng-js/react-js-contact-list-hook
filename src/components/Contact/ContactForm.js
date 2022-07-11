import {useForm} from 'react-hook-form';
import React, { useEffect } from 'react';
import {
    getContactStorage,
    contactStore,
    getCurrentDate,
    findMaxId
} from "../../util/";

const ContactForm = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const saveInfo = (data) => {
        if (props.contact?.id === undefined) {
            createContact(data);
        } else {
            updateContact(data);
        }

        window.location.reload();
    }

    const createContact = (data) => {
        let contacts = getContactStorage();
        contacts.push({id: findMaxId() + 1, date: getCurrentDate(),  ...data})
        localStorage.setItem(contactStore(), JSON.stringify(contacts));
    }

    const updateContact = (data) => {
        let contacts = getContactStorage();
        contacts.map((contact, index) => {
            if (contact.id === props.contact?.id) {
                contacts[index] = {
                    id: props.contact?.id,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    date: getCurrentDate()
                };
            }

            return contact
        });

        localStorage.setItem(contactStore(), JSON.stringify(contacts));
    }

    useEffect(() => {
        reset(props.contact);
    }, [props.contact, reset]);

    return (
        <div className="wrapper">
            <form action="" id="form" onSubmit={handleSubmit(saveInfo)} className="form">
                <div className={errors?.name ? "form-control error" : "form-control"}>
                    <input type="text"
                           placeholder="Name"
                           {...register('name', {required: {value: true, message: 'Name is required!'}}) }
                    />
                    <small>{errors?.name && errors?.name.message}</small>
                </div>
                <div  className={errors?.phone ? "form-control error" : "form-control"}>
                    <input type="phone"
                           placeholder="Phone"
                           {...register("phone", {
                               required: { value: true, message: "Phone is required!" },
                               pattern: { value: /^-?\d+\.?\d*$/, message: 'Phone is invalid format!' },
                               minLength: { value: 9, message: 'Min digit 9' },
                           })}
                    />
                    <small>{errors?.phone && errors.phone.message}</small>
                </div>
                <div  className={errors?.email ? "form-control error" : "form-control"}>
                    <input type="text"
                           placeholder="jonh@example.com"
                           {...register("email", {
                               required: { value: true, message: "Email is required!" },
                               pattern: { value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/, message: 'Email is invalid format!' }
                           })}
                    />
                    <small>{errors?.email && errors.email.message}</small>
                </div>
                    {props.contact.id && (
                        <a href="/" className="link-cancel">Cancel</a>
                    )}
                <button type="submit" className="btn-success" value="Save" id="submit">{props.contact?.action === 'Save' ? 'Save': 'Update'}</button>
            </form>
        </div>
    );
}

export default ContactForm;