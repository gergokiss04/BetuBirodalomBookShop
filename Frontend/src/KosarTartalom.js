import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export const KosarTartalom = () => {
  //Itt tárolom az adatokat:
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  //A kosárban lévő termékek törlése:
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload(true);
  };

  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  //Kosárba tett könyv árának számítása:
  useEffect(() => {
    let sum = 0;
    cart.forEach((book) => {
      sum += book.price;
    });
    setTotalPrice(sum);
  }, [cart]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      <div
        id="contact"
        className="container-fluid text-white scrollspy light-brown-background-color"
      >
        <div className="container mt-5">
          <h1 className="text-center mb-5">Kosár</h1>
          <hr></hr>
          {cart.length === 0 ? (
            <div className="row justify-content-center">
              <div className="col-12 alert alert-info" role="alert">
                A kosár tartalma üres!
              </div>
            </div>
          ) : (
            <div className="container">
              <div className="row">
                {cart.map((book, index) => (
                  <div className="col-md-4 col-lg-4 mb-4" key={index}>
                    <div className="card h-100">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={book.cover}
                            alt={book.title}
                            className="img-fluid rounded-start d-flex align-items-center"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h5 className="card-title colorblack ">
                              {book.author + ":" + book.title}
                            </h5>
                            <p className="card-text colorblack">
                              Ár: {book.price} Ft
                            </p>
                          </div>
                          <div className="card-footer">
                            <button
                              className="btn btn-danger"
                              onClick={() => removeFromCart(index)}
                            >
                              Törlés
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <h3>Teljes végösszeg: {totalPrice} Ft</h3>
                <br></br>
                <NavLink style={{ textDecoration: "none" }} to={"/shopping"}>
                  <button
                    type="button"
                    className="btn btn-success btn-rounded btn-width"
                  >
                    Tovább a megrendeléshez
                  </button>
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KosarTartalom;
