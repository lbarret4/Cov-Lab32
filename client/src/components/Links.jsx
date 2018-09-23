import React,{ Fragment } from 'react';
import{ Link }from 'react-router-dom';


const Links = (props) => {

    
    let mentionLinks =[];
    ((users = props.users) => {
        for (let index in users) {
            let name =users[index].user;
            let path=`/chirps/${name}/${index}`;
            mentionLinks.push(<Link className="dropdown-item" to={path} key={`${index}`}>{name} </Link>);
            


         };
     })();
    
    return (
        <Fragment>        
        {mentionLinks}
        </Fragment>
    );
 
       
        
}

export default Links;

