import Banner from "../../components/banner";

function NoMatch() {
    return (
        <>
            <div className="row">
                <div className="col">
                    <Banner />
                    <section className="top-sales">
                        <h2 className="text-center">Страница не найдена</h2>
                        <p>
                            Извините, такая страница не найдена!
                        </p>
                    </section>
                </div>
            </div>
        </>
    )
}

export default NoMatch;
