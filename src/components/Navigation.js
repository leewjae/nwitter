import React from "react";
import {Link} from "react-router-dom"

const Navigation = ({userObj}) => (<nav>
    <ul>
        <li>
            <Link to="/">Home</Link>
        </li>
        <li>
        {userObj ? 
        <>  
            <Link to="/profile">Hello {userObj.displayName}</Link>
        </>
 : 
            <Link to="/profile">Hello unknown</Link>
        }
        </li>
    </ul>
</nav>)

export default Navigation