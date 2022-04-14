import {useDispatch, useSelector} from "react-redux";
import {hitsRequest} from "../../store/actions";
import {useEffect} from "react";
import localizePrice from "../common/localize-price";
import Preloader from "../preloader";
import {NavLink} from "react-router-dom";

function Hits() {
    const hitsState = useSelector(state => state.hits);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(hitsRequest());
    }, [])

    if (!hitsState.loading && hitsState.items.length === 0) {
        return null;
    }

    const hits = hitsState.items.map((item) => (
        <div className="col-4" key={item.id}>
            <div className="card">
                <img src={item.images[0]}
                     className="card-img-top img-fluid" alt={item.title} />
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{localizePrice(item.price)}</p>
                    <NavLink to={`/catalog/${item.id}.html`} className="btn btn-outline-primary">Заказать</NavLink>
                </div>
            </div>
        </div>
    ));

    const loaded = <div className="row">
        {hits}
    </div>


    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            {hitsState.loading ? <Preloader/> : loaded }
        </section>
    )
}

export default Hits;
