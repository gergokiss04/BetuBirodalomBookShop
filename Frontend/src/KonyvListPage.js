import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export function KonyvListPage() {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);
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

  const [books, setbooks] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  useEffect(() => {
    setFetchPending(true);
    fetch("https://localhost:7280/Book/Books-by-genre")
      .then((res) => res.json())
      .then((konyvek) => {
        console.log(konyvek);
        return setbooks(konyvek);
      })
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);
  return (
    <div>
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div className="p-5 m-auto text-center content bg-lavender img-up">
          <div className="container-fluid text-white scrollspy dark-brown-background-color">
            <div>
              {Object.entries(books).map(([genre, bookList]) => (
                <div key={genre}>
                  <div className="row row-cols-1 row-cols-md-1 g-4">
                    <h2>{genre}</h2>
                  </div>
                  <hr></hr>
                  <div className="row row-cols-1 row-cols-md-4 g-4">
                    {bookList.map((konyv) => (
                      <div className="col" key={konyv.bookId}>
                        <div className="card h-100 ">
                          <NavLink
                            className={"cardbodycolor"}
                            to={"/Book/" + konyv.bookId}
                          >
                            <img
                              alt={konyv.title}
                              className="card-img-top"
                              width={280}
                              height={320}
                              style={{
                                maxWidth: 280,
                                maxHeight: 320,
                                paddingTop: 5,
                              }}
                              src={
                                "../img/" + konyv.cover
                                  ? "../img/" + konyv.cover
                                  : "https://via.placeholder.com/400x800"
                              }
                            />
                          </NavLink>
                          <div
                            className="card-body cardbodycolor"
                            style={{ Height: 400 }}
                          >
                            <p className="card-title cardfont">
                              {konyv.author}{" "}
                            </p>
                            <p className="card-title cardtitle">
                              {konyv.title}{" "}
                            </p>
                            <p className="text-dark cardfont">
                              Ára: {konyv.price} Ft
                            </p>
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
                  <div>
                    <NavLink
                      style={{ textDecoration: "none" }}
                      to={`/Book/Genre_book/${(() => {
                        switch (genre) {
                          case "Sport és természetjárás":
                            return 17;
                          case "Életmód és egészség":
                            return 2;
                          case "Család és gyermeknevelés":
                            return 1;
                          case "Történelem":
                            return 22;
                          case "Nyelvkönyv és szótár":
                            return 15;
                          case "Gyermek és ifjúsági":
                            return 6;
                          case "Irodalom":
                            return 9;
                          default:
                            return 0;
                        }
                      })()}`}
                    >
                      <s className="dropdown-item" href="1"></s>
                      <button
                        type="button"
                        className="btn btn-success btn-rounded btn-margin"
                      >
                        Ugrás a további könyvekre
                      </button>
                    </NavLink>
                    <hr></hr>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default KonyvListPage;
