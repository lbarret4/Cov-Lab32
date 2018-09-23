import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Links from './Links';
const Header = (props) => {

    let userLinks = (
        <li className="nav-item dropdown">
            <div className="nav-item dropdown" >
                <a className="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose user
                </a>

                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    < Links users={props.users} />
                </div>
            </div >
        </li>
    );

    let link = (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
            <div classNames="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Go Home</Link>
                    </li>
                    {props.withMentions ?   userLinks: props.withMentions}
                </ul>
            </div>
        </nav>
    );


    return (
        <Fragment>
            <h1 className="text-center">Welcome to Chirper !</h1>
            {props.withoutButton ? props.withoutButton : link}
        </Fragment>

    );

}

export default Header;