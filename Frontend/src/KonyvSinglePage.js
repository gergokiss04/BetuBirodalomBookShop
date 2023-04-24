import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { toast } from "react-toastify";

export function KonyvSinglePage(props) {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);

  //A könyv kosárhoz adása:
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

  const params = useParams();
  const id = params.bookId;
  const [konyv, setkonyv] = useState([]);
  const [isPending, setPending] = useState(false);
  useEffect(() => {
    setPending(true);
    (async () => {
      try {
        const res = await fetch(`https://localhost:7280/Book/GetBookBy/${id}`);
        const konyv = await res.json();
        setkonyv(konyv);
        console.log(konyv);
        console.log(id);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    })();
  }, [id]);

  return (
  <div className="p-5 m-auto text-center content bg-lavender img-up">
    {isPending || !konyv.length ? (
      <div className="spinner-border"></div>
    ) : (
      <div className="container-fluid text-white scrollspy dark-brown-background-color">
        <div className="row">
          <h2>{konyv[0].author + ": " + konyv[0].title}</h2>
          <hr></hr>
          <div className="col-xs-1 col-sm-12 col-md-12 col-lg-3 col-xl-3 img-center ">
            <img
              alt="book"
              className="img-fluid img-border"
              style={{ maxHeight: 500 }}
              src={
                konyv[0].cover
                  ? konyv[0].cover
                  : "https://via.placeholder.com/400x800"
              }
            />
          </div>
          <div className="col-xs-1 col-sm-12 col-md-12 col-lg-9 col-xl-9 order-2 order-lg-1  ">
            <p className="justify">{konyv[0].description}</p>
            <h5>Ár: {konyv[0].price + " Ft"}</h5>

            <button
              type="button"
              className="btn btn-success btn-rounded"
              onClick={() => handleAddToCart(konyv[0])}
            >
              Kosárba
            </button>
          </div>
          <div className="col-xs-1 col-sm-12 col-md-12 col-lg-3 col-xl-3 order-1 order-lg-2  ">
            <p>
              <b>Kiadó:</b> {konyv[0].publisher}
            </p>
            <p>
              <b>Írta:</b> {konyv[0].author}
            </p>
            <p>
              <b>Lapszám:</b> {konyv[0].pageNumber}
            </p>
            <p>
              <b>Nyelv:</b> {konyv[0].language}
            </p>
            <p>
              <b>Kiadás éve:</b> {konyv[0].relaseYear}
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

}
export default KonyvSinglePage;
