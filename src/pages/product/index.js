import Banner from "../../components/banner";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Preloader from "../../components/preloader";
import {useDispatch} from "react-redux";
import {cartAddRequest} from "../../store/actions";

function Product() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(null);
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}items/${params.id}`).then(res => res.json()).then(currentCart => {
            currentCart.sizes = currentCart.sizes.filter(item => item.avalible);
            setProduct(currentCart)
        }).catch(err => {
            setError(err);
        }).finally(() => {
            setLoader(false);
        })
    }, []);

    if (loader) {
        return <Preloader/>;
    }

    const onSelectSize = (index) => {
        setSelectedSize(prev => prev === null ? index : null);
    }

    const sizes = product.sizes.map((item, index) => {
        return (
            <span
                className={`catalog-item-size ${selectedSize === item.size ? 'selected' : ''}`}
                key={index}
                onClick={() => onSelectSize(item.size)}>
            {item.size}
        </span>
        )
    })

    const addProduct = (e) => {
        e.preventDefault();
        dispatch(cartAddRequest(product, selectedSize, qty));
        navigate('/cart.html');
    }

    return (
        <div className="row">
            <div className="col">
                <Banner/>

                <section className="catalog-item">
                    <h2 className="text-center">{product.title}</h2>
                    <div className="row">
                        <div className="col-5">
                            <img src={product.images[0]}
                                 className="img-fluid" alt={product.title} />
                        </div>
                        <div className="col-7">
                            <table className="table table-bordered">
                                <tbody>
                                <tr>
                                    <td>Артикул</td>
                                    <td>{product.sku ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Производитель</td>
                                    <td>{product.manufacturer ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Цвет</td>
                                    <td>{product.color ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Материалы</td>
                                    <td>{product.material ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Сезон</td>
                                    <td>{product.season ?? ''}</td>
                                </tr>
                                <tr>
                                    <td>Повод</td>
                                    <td>{product.reason ?? ''}</td>
                                </tr>
                                </tbody>
                            </table>
                            <div className="text-center">
                                <p>Размеры в наличии: {sizes}</p>
                                {sizes.length ? (
                                    <p>Количество: <span className="btn-group btn-group-sm pl-2">
                                        <button className="btn btn-secondary"
                                                disabled={qty < 1}
                                                onClick={() => setQty((prev) => prev - 1)}>-</button>
                                        <span className="btn btn-outline-primary">{qty}</span>
                                        <button className="btn btn-secondary"
                                                disabled={qty >= 10}
                                                onClick={() => setQty((prev) => prev + 1)}>+</button>
                                    </span>
                                    </p>
                                ) : ''}
                            </div>
                            {sizes.length
                                ? (<button disabled={selectedSize === null || qty === 0}
                                           className="btn btn-danger btn-block btn-lg"
                                           onClick={addProduct}>В корзину</button>)
                                : ''}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Product;
