import React from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {

    const menuItems = [
        {
            link: "/",
            name: "Contact",
        },
        {
            link: "/import-csv",
            name: "Import CSV",
        }
    ];

    const listItem = menuItems.map((menu, key) => <Link key={key} to={menu.link}>{menu.name}</Link>);

    return (
        <>
            <div className="topnav">
                {listItem}
            </div>
        </>
    )
}

export default Navbar
