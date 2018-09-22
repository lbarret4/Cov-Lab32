import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
const Header = (props) => {
    let link = <Link className="btn btn-dark" to="/">Go Home</Link>;
    return (
        <Fragment>
            <h1 className="text-center">Welcome to Chirper !</h1>
            {props.withoutButton ? props.withoutButton : link}
        </Fragment>

    );

}

export default Header;