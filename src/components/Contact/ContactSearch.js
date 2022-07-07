import './ContactSearch.css';

const ContactSearch = (props) => {

    const searchInfo = (event) => {
        if (event.key == 'Enter') {
            props.searchInfo(event.target.value.trim());
        }
    }

    return (
        <div className="search">
            <input type="text" className="searchTerm" onKeyDown={searchInfo} placeholder="Search..." />
        </div>
    );
}

export default ContactSearch;