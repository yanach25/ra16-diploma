import headerLogo from '../../assets/img/header-logo.png';
import {NavLink, useNavigate} from "react-router-dom";
import navElementsList from "../common/nav-elements-list";
import {useState, useRef} from "react";
import headerLinks from "./header-links";
import {useSelector} from "react-redux";

function Header() {
    const cartState = useSelector(state => state.cart);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');
    const [searchExpanded, setSearchExpanded] = useState(false);
    const textInput = useRef(null);
    const linkEls = navElementsList(headerLinks);

    const toggleSearchExpander = () => {
        setSearchExpanded((prev) => !prev);
        setTimeout(() => {
            textInput.current.focus();
        })
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setInputValue(e.target.value);
    }

    const handleOnKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            const link = `catalog.html/?q=${inputValue}`;
            setInputValue('');
            setSearchExpanded((prev) => !prev);
            navigate(link);
        }
    }

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink to={'/'} className="navbar-brand">
                            <img src={headerLogo} alt="Bosa Noga" />
                        </NavLink>
                        <div className="collapase navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                {linkEls}
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div data-id="search-expander"
                                         onClick={toggleSearchExpander}
                                         className="header-controls-pic header-controls-search">
                                    </div>
                                    {/*// Do programmatic navigation on click to /product.html*/}
                                    <NavLink to={'/cart.html'}>
                                        <div className="header-controls-pic header-controls-cart">
                                            {cartState.length ? <div className="header-controls-cart-full">{cartState.length}</div> : ''}
                                            <div className="header-controls-cart-menu">
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                                <form data-id="search-form"
                                      className={`header-controls-search-form form-inline ${searchExpanded ? '' : 'invisible'}`}>
                                    <input ref={textInput}
                                           value={inputValue}
                                           onChange={(e) => handleOnChange(e)}
                                           onKeyDown={(e) => handleOnKeyDown(e)}
                                           className="form-control"
                                           placeholder="Поиск" />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;
