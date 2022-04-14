import Banner from "../../components/banner";
import Hits from "../../components/hits";
import Catalog from "../../components/catalog";

function Home() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <Banner />
                    <Hits />
                    <Catalog withInput={false} />
                </div>
            </div>
        </>
    )
}

export default Home;
