import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {catalogRequest, categoriesRequest} from "../../store/actions";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import prepareQueryByParam from "./prepare-query-by-param";
import Preloader from "../preloader";
import getCategoryClassName from "./get-category-class-name";
import localizePrice from "../common/localize-price";
import PropTypes from "prop-types";

function Catalog(props) {
    const {withInput} = props;
    const categoriesState = useSelector(state => state.categories);
    const catalogState = useSelector(state => state.catalog);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {search} = useLocation();

    const [activeCategory, setActiveCategory] = useState(() => {
        const searchParams = new URLSearchParams(search);
        return +searchParams.get('categoryId');
    });
    const [currentOffset, setCurrentOffset] = useState(() => {
        const searchParams = new URLSearchParams(search);
        return +searchParams.get('offset');
    });

    const [currentSearch, setCurrentSearch] = useState(() => {
        const searchParams = new URLSearchParams(search);
        return searchParams.get('q') ?? '';
    });

    const handleOffset = () => {
        const query = prepareQueryByParam('offset', +currentOffset + 6);
        navigate(query);
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const categoryId = searchParams.get('categoryId');
        let offset = searchParams.get('offset');
        let search = searchParams.get('q');

        // если изменился поиск или категория, обнуляем оффсет
        if (+categoryId !== +activeCategory) {
            offset = null;
            setActiveCategory(categoryId ?? null);
        }

        setCurrentOffset(offset);

        dispatch(catalogRequest(categoryId, offset, search));
    }, [search]);

    useEffect(() => {
        dispatch(categoriesRequest());
    }, []);

    const categoriesEls = categoriesState.items.map((item) => (
        <li className="nav-item" key={item.id}>
            <NavLink to={prepareQueryByParam('categoryId', item.id)}
                     className={({_}) => getCategoryClassName(item.id, activeCategory)}>
                {item.title}
            </NavLink>
        </li>
    ))

    const catalogEls = catalogState.items.map((item) => (
        <div className="col-4" key={item.id}>
            <div className="card catalog-item-card">
                <img src={item.images[0]}
                     className="card-img-top img-fluid" alt={item.title}/>
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{localizePrice(item.price)}</p>
                    <NavLink to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">Заказать</NavLink>
                </div>
            </div>
        </div>
    ))

    const loaded = (<div className="row">{catalogEls}</div>);

    const handleOnChange = e => {
        e.preventDefault();
        setCurrentSearch(e.target.value);
    }

    const handleOnKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            const searchParams = new URLSearchParams(window.location.search);
            currentSearch ? searchParams.set('q', currentSearch): searchParams.delete('q');
            searchParams.delete('offset');

            navigate(`?${searchParams.toString()}`);
        }
    }

    const inputBlock = withInput
        ? (
            <form className="catalog-search-form form-inline">
                <input value={currentSearch}
                       onChange={e => handleOnChange(e)}
                       onKeyDown={e => handleOnKeyDown(e)}
                       className="form-control"
                       placeholder="Поиск"/>
            </form>
        )
        : '';

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {inputBlock}
            <ul className="catalog-categories nav justify-content-center">
                {categoriesEls}
            </ul>
            {catalogState.loading ? <Preloader/> : loaded}
            <div className="text-center">
                <button disabled={catalogState.disableLoadMore} className="btn btn-outline-primary"
                        onClick={handleOffset}>Загрузить ещё
                </button>
            </div>
        </section>
    )
}

Catalog.defaultProps = {
    withInput: true,
}

Catalog.propTypes = {
    withInput: PropTypes.bool,
}

export default Catalog;
