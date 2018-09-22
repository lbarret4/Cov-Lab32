import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


const ChirpCard = (props) => {

    let chirp = props.chirp;
    let timeStyle = {
        position: "relative",
        bottom: "1em"
    };
    let path = "";
    let details = "";
    if (props.isFeed) {
        path = `/chirps/${chirp.index}`;
        details = (<div className="d-flex justify-content-end">
            <Link className="btn btn-outline-primary" to={path} key={path}>See Details </ Link>
        </div>
        );
    }
    let closeBtn = <button type="button" className="close" aria-label="Close" onClick={props.onClick}><span aria-hidden="true">&times;</span></button>;


    return (
        <Fragment>

            <li className="list-group-item">
                <div className="d-flex justify-content-between ">
                    <small className="text-muted " style={timeStyle}>
                        {chirp.user} on {chirp.time.toLocaleString()}
                    </small>

                    {props.isFeed ? props.isFeed : closeBtn}
                </div>

                <p className="ml-5">{chirp.content}</p>
                {props.isFeed ? details : props.isFeed}


            </li>







        </Fragment>
    );



}

export default ChirpCard;