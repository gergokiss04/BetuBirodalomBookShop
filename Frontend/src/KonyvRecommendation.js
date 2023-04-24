import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export function KonyvRecommendation(props) {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);
  //Könyv kosárba tevése:
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

  const [konyvrecommendation, setkonyvrecommendation] = useState([]);
  const [randomId, setRandomId] = useState(null);
  const [isPending, setPending] = useState(false);
  //Randomszám generátor ami véletlenül sorsol egy id-t és azt mutatja be:
  useEffect(() => {
    if (!randomId) {
      setRandomId(Math.floor(Math.random() * 80) + 1);
    } else {
      fetch(`https://localhost:7280/Book/GetBookBy/${randomId}`)
        .then((response) => response.json())
        .then((data) => setkonyvrecommendation(data));
    }
  }, [randomId]);

  console.log(konyvrecommendation);

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      <div
        id="bookrecommendation"
        className="container-fluid text-white scrollspy light-brown-background-color"
      >
        <div className="p-5 m-auto text-center content bg-lavender">
          {isPending || !konyvrecommendation.length ? (
            <div className="spinner-border"></div>
          ) : (
            <div className="container">
              <div className="row">
                <h1>Könyvajánló</h1>
                <hr></hr>
                {konyvrecommendation.map((konyv, index) => (
                  <React.Fragment key={index}>
                    <div className="col-xs-1 col-sm-12 col-md-6 col-lg-6 col-xl-6 img-center">
                      <NavLink to={"/Book/" + konyv.bookId}>
                        <img
                          className="img-fluid image-container"
                          alt={konyv.title}
                          decoding="async"
                          width={300}
                          height={500}
                          style={{ maxHeight: 500 }}
                          src={
                            konyv.cover
                              ? konyv.cover
                              : "https://via.placeholder.com/400x800"
                          }
                        />
                      </NavLink>
                    </div>
                    <div className="col-xs-1 col-sm-12 col-md-6 col-lg-6 col-xl-6 ">
                      <h2>{konyv.author + ": " + konyv.title}</h2>
                      <p className="justify">{konyv.description}</p>
                      <h5>
                        <b>Ára:</b> {konyv.price} Ft
                      </h5>
                      <button
                        id="regisztralcio"
                        type="button"
                        className="btn btn-success btn-rounded btn-width"
                        onClick={() => handleAddToCart(konyv)}
                      >
                        Kosárba
                      </button>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KonyvRecommendation;
