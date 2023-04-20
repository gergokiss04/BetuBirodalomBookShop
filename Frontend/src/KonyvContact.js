import { useEffect } from "react";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export function KonyvContact() {
  //EMAIL-JS beállítások:
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bexohbg",
        "template_ls7y3jj",
        form.current,
        "d2UttfK538cw2Ha72"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("Message sent");
          toast.success("Sikeres Üzenetküldés!", { autoClose: 2000 });
          setTimeout(() => {
            window.location.reload(true);
          }, 3000);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      <div
        id="contact"
        className="container-fluid text-white scrollspy light-brown-background-color"
      >
        <h1>Kapcsolat:</h1>
        <hr></hr>
        <p>
          Segítségre vagy tanácsra van szükséged, vagy csak nem vagy biztos
          benne, hogy milyen szállítási megoldásokat tudunk ajánlani a könyveink
          kapcsán? Kérj segítséget ügyfélszolgálatunktól, és segítünk megtalálni
          a számodra legmegfelelőbb megoldásokat.A Betű Birodalom munkatársai
          munkanapokon, hétvégén és ünnepnapokon reggel 8 és 17 óra között
          fogadják üzeneteidet.{" "}
        </p>
        <p>
          Amennyiben ritka,dedikált vagy külföldi könyvet keres jelezze nekünk
          és megpróbálunk önnek beszerezni.
        </p>
        <p>Forduljon hozzánk bizalommal!</p>
        <p>
          A csillaggal jelölt részeket{" "}
          <u>
            <b>kötelezően</b>
          </u>{" "}
          kérem kitölteni:
        </p>
        <form ref={form} onSubmit={sendEmail}>
          <div className="row">
            <div className="col-lg-12" id="contact-center">
              <div className="col-lg-12">
                <div className="form-floating mb-3 colorblack">
                  <input
                    type="text"
                    name="from_name"
                    className="form-control"
                    placeholder="nev"
                    required
                  />
                  <label>*Név:</label>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <input
                    type="email"
                    name="user_email"
                    className="form-control"
                    id="email"
                    placeholder="csapatnev@iskola.hu"
                    required
                  />
                  <label>*E-mail</label>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <input
                    type="tel"
                    name="user_phone"
                    className="form-control"
                    id="phonenumber"
                    placeholder="+36123456789"
                    required
                  />
                  <label htmlFor="phonenumber">Telefonszám:</label>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <select
                    className="form-select"
                    name="user_topics"
                    title="dropdownmenu"
                    id="floatingInput"
                    defaultValue={"*Kérem válasszon az alábbi menüpontokból:"}
                    required
                  >
                    <option disabled defaultValue={""}>
                      *Kérem válasszon az alábbi menüpontokból:
                    </option>
                    <option value="Általános_kérdés_könyv/könyvekkel_kapcsolatban">
                      Általános kérdés könyv/könyvekkel kapcsolatban
                    </option>
                    <option value="Fizetéssel_kapcsolatos_kérdés">
                      Fizetéssel kapcsolatos kérdés
                    </option>
                    <option value="Szállítással_kapcsolatos_kérdés">
                      Szállítással kapcsolatos kérdés
                    </option>
                    <option value="Egyéb">Egyéb</option>
                  </select>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "200px" }}
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Üzenet:</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    required
                  />
                  <label
                    className="form-check-label left"
                    htmlFor="flexCheckDefault"
                  >
                    *Kijelentem, hogy az Betű Birodalom{" "}
                    <a
                      className="link-bold-white"
                      target="_blank"
                      href="../GDPR/Adatkezelesi_utmutato.pdf"
                    >
                      személyes adataim kezelésére vonatkozó irányelveit
                    </a>{" "}
                    elolvastam.
                  </label>
                </div>
                <hr></hr>
              </div>

              <div className="col-auto">
                <button type="submit" value="Send" className="btn btn-primary">
                  Küldés
                </button>
              </div>
            </div>
          </div>
        </form>

        <a
          target="blank"
          title="facebook"
          className="left"
          href="https://www.facebook.com/kandomiskolc"
        >
          <i
            className="bi bi-facebook"
            style={{ fontSize: "30px", padding: "5px 5px 5px 5px" }}
          ></i>
        </a>
        <a
          target="blank"
          title="gmail"
          className="left"
          href="mailto:betubirodalominfo@gmail.com"
        >
          <i className="bi bi-envelope-at" style={{ fontSize: "30px" }}></i>
        </a>
      </div>
    </div>
  );
}

export default KonyvContact;
