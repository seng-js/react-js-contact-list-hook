import {confirm} from "react-confirm-box";

const contactStore = () => {
    return 'contact-info';
}

const getContactStorage = () => {
    if (localStorage.getItem(contactStore()) != null) {
        return JSON.parse(localStorage.getItem(contactStore()));
    }

    return [];
}

const getDataById = (id) => {
    return getContactStorage().filter(el => el.id === id)[0];
}

const findMaxId = () => {
    const ids = getContactStorage().map(object => {
        return object.id;
    });

    return ids.length == 0 ? 0 : Math.max(...ids);
}

const getCurrentDate = () => {
    let date = new Date();
    return date.getFullYear() + '/' +
        ('00' + (date.getMonth() + 1)).slice(-2) + '/' +
        ('00' + date.getDate()).slice(-2) + ' ' +
        ('00' + date.getHours()).slice(-2) + ':' +
        ('00' + date.getMinutes()).slice(-2);
}

const deleteInfo = async (id) => {
    let email = getDataById(id).email;
    const result = await confirm(`Are you sure to delete email: ${email}?`)
    if (result) {
        let filtered = getContactStorage().filter(function(el) { return el.id != id; });
        localStorage.setItem(contactStore(), JSON.stringify(filtered));
    }
    window.location.reload();
}

const searchContactInfo = (search) => {
    const contacts = getContactStorage();
    if (search.length > 0) {
        const result = contacts.find(obj => obj.name === search);
        if (result != undefined) {
            return [result];
        }
        return contacts;
    } else {
        return contacts;
    }
}

export {
    contactStore,
    getContactStorage,
    getDataById,
    findMaxId,
    deleteInfo,
    searchContactInfo,
    getCurrentDate,
}