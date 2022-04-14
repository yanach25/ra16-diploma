import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./components/header";
import Home from "./pages/home";
import Footer from "./components/footer";
import About from "./pages/about";
import Contacts from "./pages/contacts";
import NoMatch from "./pages/no-match";
import Catalog from "./components/catalog";
import Product from "./pages/product";
import Cart from "./pages/cart";

function App() {
    return (
        <Router>
            <div>
                <Header/>
                <main className="container">
                    <Routes>
                        <Route path="/" exact element={<Home/>}/>
                        <Route path="/about.html" element={<About/>}/>
                        <Route path="/contacts.html" element={<Contacts/>}/>
                        <Route path="/catalog.html" exact element={<Catalog/>}/>
                        <Route path="/catalog/:id.html" element={<Product/>}/>
                        <Route path="/cart.html" element={<Cart/>}/>
                        <Route path="*" element={<NoMatch/>}/>
                    </Routes>
                </main>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;
