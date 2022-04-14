import Banner from "../../components/banner";
import {useDispatch, useSelector} from "react-redux";
import localizePrice from "../../components/common/localize-price";
import {cartClearRequest, cartDeleteRequest} from "../../store/actions";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import Preloader from "../../components/preloader";
import toast, { Toaster } from 'react-hot-toast';

function Cart() {
    const cartState = useSelector(state => state.cart);
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [agreement, setAgreement] = useState(false);
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const contacts = localStorage.getItem('bosaNogaContacts');
        if (contacts) {
            const parsedContacts = JSON.parse(contacts);
            setPhone(parsedContacts.phone ?? '');
            setAddress(parsedContacts.address ?? '');
        }
    }, [])

    const onDeleteProduct = (e, id) => {
        e.preventDefault();
        dispatch(cartDeleteRequest(id));
    }

    const products = cartState.map((item, index) => (
        <tr key={item.product.id}>
            <td scope="row">{index + 1}</td>
            <td><NavLink to={`/catalog/${item.product.id}.html`}>{item.product.title}</NavLink></td>
            <td>{item.size}</td>
            <td>{item.qty}</td>
            <td>{localizePrice(item.product.price)}</td>
            <td>{localizePrice(item.product.price * item.qty)}</td>
            <td>
                <button className="btn btn-outline-danger btn-sm" onClick={(e) => onDeleteProduct(e, item.product.id)}>Удалить</button>
            </td>
        </tr>
    ))

    const countSum = () => {
        const sum = cartState.reduce((sum, item) => {
            return sum += item.product.price * item.qty;
        }, 0);

        return localizePrice(sum);
    }

    const handleChange = (e, prop) => {
        e.preventDefault();
        switch (prop) {
            case 'phone':
                setPhone(e.target.value);
                break;
            case 'address':
                setAddress(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleOnClick = (e) => {
        e.preventDefault();
        setLoader(true);
        localStorage.setItem('bosaNogaContacts', JSON.stringify({phone, address}));

        const items = cartState.map((item) => ({
            id: item.product.id,
            price: item.product.price,
            count: item.qty,
        }))
        const body = {
            owner: {
                phone,
                address,
            },
            items,
        }

        console.log(body);
        fetch(`${process.env.REACT_APP_URL}order`, {
            method: 'POST',
            body: JSON.stringify(body),
        }).then((res) => res.json()).then(() => {
            // success
            dispatch(cartClearRequest())
        }).catch((err) => {
            toast.error(err);
        }).finally(() => {
            setLoader(false);
        })
    }

    return (
        <div className="row">
            <div className="col">
                <Banner />
                {loader ? <Preloader /> : ''}
                <section className="cart">
                    <h2 className="text-center">Корзина</h2>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Название</th>
                            <th scope="col">Размер</th>
                            <th scope="col">Кол-во</th>
                            <th scope="col">Стоимость</th>
                            <th scope="col">Итого</th>
                            <th scope="col">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products}
                        <tr>
                            <td colSpan="5" className="text-right">Общая стоимость</td>
                            <td>{countSum()}</td>
                        </tr>
                        </tbody>
                    </table>
                </section>
                <section className="order">
                    <h2 className="text-center">Оформить заказ</h2>
                    <div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
                        <form className="card-body">
                            <div className="form-group">
                                <label htmlFor="phone">Телефон</label>
                                <input value={phone}
                                       onChange={(e) => handleChange(e, 'phone')}
                                       className="form-control"
                                       id="phone"
                                       placeholder="Ваш телефон" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Адрес доставки</label>
                                <input value={address}
                                       onChange={(e) => handleChange(e, 'address')}
                                       className="form-control"
                                       id="address"
                                       placeholder="Адрес доставки" />
                            </div>
                            <div className="form-group form-check">
                                <input onChange={() => setAgreement(!agreement)}
                                       type="checkbox"
                                       className="form-check-input"
                                       id="agreement" />
                                    <label className="form-check-label" htmlFor="agreement">Согласен с правилами
                                        доставки</label>
                            </div>
                            <button disabled={!(address && phone && agreement && cartState.length)} onClick={handleOnClick} type="submit" className="btn btn-outline-secondary">Оформить</button>
                        </form>
                    </div>
                </section>
            </div>
            <Toaster />
        </div>
    )
}

export default Cart;
