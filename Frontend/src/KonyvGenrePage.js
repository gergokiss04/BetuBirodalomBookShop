import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./App.css";

export function KonyvGenrePage(props) {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);

  const params = useParams();
  const id = params.genreId;
  const [konyv, setKonyv] = useState([]);
  const [isPending, setIsPending] = useState(false);
  //ID alapján történő lekérdezés:
  useEffect(() => {
    setIsPending(true);
    (async () => {
      try {
        const res = await fetch(`https://localhost:7280/Book/Genre_book/${id}`);
        const konyv = await res.json();
        setKonyv(konyv);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPending(false);
      }
    })();
  }, [id]);
  //Könyv kosárba tevés:
  const handleAddToCart = (konyv) => {
    const existingCart = localStorage.getItem("cart");
    if (!existingCart) {
      localStorage.setItem("cart", JSON.stringify([konyv]));
      toast.success("Könyv hozzáadva a kosárhoz!");
    } else {
      const cart = JSON.parse(existingCart);
      cart.push(konyv);
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Könyv hozzáadva a kosárhoz!", { autoClose: 2000 });
    }
    setTimeout(() => {
      window.location.reload(true);
    }, 3500);
  };

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      {isPending ? (
        <div className="spinner-border"></div>
      ) : konyv.length === 0 ? (
        <p>Nincs könyv ebben a kategóriában.</p>
      ) : (
        <div className="text-white scrollspy dark-brown-background-color">
          {id === "15" ? <h2>Nyelvkönyv és szótár</h2> : null}
          {id === "2" ? <h2>Életmód és egészség</h2> : null}
          {id === "22" ? <h2>Történelem</h2> : null}
          {id === "9" ? <h2>Irodalom</h2> : null}
          {id === "17" ? <h2>Sport</h2> : null}
          {id === "6" ? <h2>Gyermek és ifjúsági</h2> : null}
          {id === "1" ? <h2>Család és gyermeknevelés</h2> : null}
          <hr></hr>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {konyv.map((konyv, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <NavLink
                    className={"cardbodycolor"}
                    key={konyv.genreId}
                    to={"../Book/" + konyv.bookId}
                  >
                    <img
                      alt={konyv.cim}
                      title={konyv.title}
                      className="card-img-top"
                      width={280}
                      height={320}
                      style={{ maxWidth: 280, maxHeight: 320, paddingTop: 5 }}
                      src={
                        "../" +
                        (konyv.cover
                          ? konyv.cover
                          : "https://via.placeholder.com/400x800")
                      }
                    />
                  </NavLink>
                  <div
                    className="card-body cardbodycolor"
                    style={{ Height: 400 }}
                  >
                    <p className="card-title cardfont">{konyv.author}</p>
                    <p className="card-title cardtitle">{konyv.title}</p>
                    <p className="text-dark cardfont">Ára: {konyv.price} Ft</p>
                    <button
                      type="button"
                      className="btn btn-success btn-rounded"
                      onClick={() => handleAddToCart(konyv)}
                    >
                      Kosárba
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default KonyvGenrePage;
