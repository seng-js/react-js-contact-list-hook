import './ContactSearch.css';

const ContactSearch = (props) => {
    const searchInfo = (event) => {
        props.searchInfo(event.target.value.trim());
    }

    return (
        <div className="search">
            <input type="text" className="searchTerm" onChange={searchInfo} placeholder="Type to search name or phone" />
        </div>
    );
}

export default ContactSearch;