import {NavLink} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function navElementsList(links) {
    return links.map((item) => (
        <li className="nav-item" key={uuidv4()}>
            <NavLink to={item.link} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>{item.name}</NavLink>
        </li>))
}

export default navElementsList;
