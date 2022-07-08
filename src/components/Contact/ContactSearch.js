import './ContactSearch.css';

const ContactSearch = (props) => {
    const searchInfo = (event) => {
        if (event.key === 'Enter') {
            props.searchInfo(event.target.value.trim());
        }
    }

    return (
        <div className="search">
            <input type="text" className="searchTerm" onKeyDown={searchInfo} placeholder="Type to search name and enter" />
        </div>
    );
}

export default ContactSearch;