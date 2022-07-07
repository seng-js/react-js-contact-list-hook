import React, {useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
    getContactStorage,
    contactStore,
    getCurrentDate,
    findMaxId
} from "../../Helpers";

const ContactForm = (props) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    setValue('name', props.contact?.name);
    setValue('phone', props.contact?.phone);
    setValue('email', props.contact?.email);

    const validationOptions = {
        name: { required: "Name is required!" },
        phone: {
            required: "Phone is required!",
            pattern: {
                value: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
                message: 'Phone is invalid format!',
            }
        },
        email: {
            required: "Email is required!",
            pattern: {
                value: /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/,
                message: 'Email is invalid format!',
            }
        }
    };

    const saveInfo = (data) => {
        if (props.contact?.id == undefined) {
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

    return (
        <div className="wrapper">
            <form action="" id="form" onSubmit={handleSubmit(saveInfo)} className="form">
                <div className={errors?.name ? "form-control error" : "form-control"}>
                    <input type="text" id="name"
                           name="name"
                           onChange={(event) => {setValue('name', event.target.value)}}
                           placeholder="Name"
                           {...register('name', validationOptions.name) }
                    />
                    <small>{errors?.name && errors?.name.message}</small>
                </div>
                <div  className={errors?.phone ? "form-control error" : "form-control"}>
                    <input type="phone" id="phone"
                           name="phone"
                           onChange={(event) => {setValue('phone', event.target.value)}}
                           placeholder="(123) 456-7890"
                           {...register('phone', validationOptions.phone )}
                    />
                    <small>{errors?.phone && errors.phone.message}</small>
                </div>
                <div  className={errors?.email ? "form-control error" : "form-control"}>
                    <input type="text" id="email"
                           name="email"
                           placeholder="jonh@example.com"
                           onChange={(event) => {setValue('email', event.target.value)}}
                           {...register('email', validationOptions.email )}
                    />
                    <small>{errors?.email && errors.email.message}</small>
                </div>
                    {props.contact.id && (
                        <a href="/" className="link-cancel">Cancel</a>
                    )}
                <button type="submit" className="btn-success" value="Save" id="submit">{props.contact?.name == undefined ? 'Save': 'Update'}</button>
            </form>
        </div>
    );
}

export default ContactForm;