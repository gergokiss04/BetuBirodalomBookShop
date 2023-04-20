import { NavLink } from "react-router-dom";
import React, { useEffect } from "react";

export function Orderdelivery() {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-down">
      <div
        id="loyaltyprogram"
        className="container-fluid  text-white scrollspy light-brown-background-color"
      >
        <h1>Rendelési tudnivalók</h1>
        <hr />
        <h4>A rendeléshez mindenféleképpen bejelentkezés szükséges!</h4>
        <p>
          Már regisztrálció nélkül is tud kosárba helyezni könyveket,de csak
          bejelentkezés után tudja megtekinteni a kosár tartalmát és azt később
          véglegesíteni.Amennyiben a regisztrálció sikeres akkor egy megerősítő
          emailt fog kapni a megadott email címre és ha rákattint akkor lesz
          érvényes a regisztrálciója.
        </p>
        <p>
          Bármilyen gondba,hibába ütközik kérem forduljon hozzánk bizalommal!
        </p>
        <h5>A legfontosabb tudnivalók:</h5>

        <div className="row mt-3">
          <div className=" col-auto col-md-auto col-lg-4 col-xl-3 mx-auto mb-4">
            <br />
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="bold-white-color">Kosárbatevés:</i>
            </h6>
            <i className="bi bi-basket-fill" style={{ fontSize: "130px" }}></i>
            <hr />
            <p className="justify">
              Amennyiben bejelentkezett akkor fogja látni a kosár tartalmát a
              jobb felső sarokban.Ha arra rákattint ott tudja átnézni a
              végösszeget és utána kitölteni a szükséges adatok illetve
              megrendelni a kívánt könyveket.
            </p>
          </div>

          <div className=" col-auto col-md-auto col-lg-4 col-xl-3 mx-auto mb-4">
            <br></br>
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="bold-white-color">Fizetés:</i>
            </h6>
            <i className="bi bi-wallet2" style={{ fontSize: "130px" }}></i>
            <hr></hr>
            <p className="justify">
              Jelenleg utánvételes vásárlásra van lehetőség minden kiszállítási
              módunknál.Kérem ha lehetséges helyezze előnybe a bankkártyás
              fizetést partnereinknél.Kollégáink dolgoznak azon,hogy modern
              érintésmentes fizetés is elérhetővé váljon hamarosan az
              oldalunkon.
            </p>
          </div>

          <div className=" col-auto col-md-auto col-lg-4 col-xl-3 mx-auto mb-4">
            <br />
            <h6 className="text-uppercase fw-bold mb-4">
              <i className="bold-white-color">Szállítás:</i>
            </h6>
            <i className="bi bi-truck" style={{ fontSize: "130px" }}></i>
            <hr />
            <p className="justify">
              3 fajta szállítás forma közül lehet nálunk választani:
            </p>
            <ul>
              <li>Csomagautomata</li>
              <li>Futárszolgálat</li>
              <li>Postán maradó csomag</li>
            </ul>
          </div>

          <hr></hr>
          <h4>A gombra kattintásával tud regisztrálni weboldalunkra:</h4>

          <NavLink style={{ textDecoration: "none" }} to={"/registration"}>
            <button
              id="registration"
              type="button"
              className="btn btn-success btn-rounded"
            >
              Regisztrálció
            </button>
          </NavLink>

          <p className="left">Adatok kezelése és védelme:</p>
          <p>
            A kártya adatlapjának kitöltésével a Vásárló hozzájárul, hogy a
            megadott információkat - beleértve személyes adatait is - a Betű
            Birodalom elektronikus nyilvántartásba felvegye és feldolgozza. Az
            adatokat a Betű Birodalom, bizalmasan kezeli, azt harmadik félnek
            nem adja ki.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Orderdelivery;
