import React, { useEffect } from "react";

export function KonyvAboutUs() {
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
        id="aboutus"
        className="container-fluid text-white scrollspy dark-brown-background-color"
      >
        <h1>Rólunk:</h1>
        <hr />
        <div className="row mt-3">
          {/*DOMINIK ELEJE*/}
          <div className=" col-auto col-md-auto col-lg-4 col-xl-4 mx-auto mb-4">
            <br />
            <div className="card testimonial-card mt-2 mb-3">
              <div className="card-up aqua-gradient"></div>
              <div className="avatar mx-auto white">
                <img
                  src="../img/dominik.webp"
                  decoding="async"
                  width={140}
                  height={140}
                  className="rounded-circle img-fluid"
                  alt="dominik"
                />
              </div>
              <div className="card-body text-center">
                <h4 className="card-title font-weight-bold colorblack">
                  Kovács Dominik
                </h4>
                <h6 className="card-title font-weight-bold colorblack">
                  Backend és adatbázis fejlesztő
                </h6>
                <hr />
                <p className="colorblack justify">
                  Szabadidőmben szeretek programozni. Programozással nem rég
                  ismerkedtem meg de első látásra nagyon bejött. Sok érdekes
                  dolgot meglehet vele valósítani. A jövömet mindenképp ebben a
                  szakmában képzelem el. További szabadidőmben szeretek
                  olvasni,kerékpározni vagy edzeni.
                </p>
              </div>
            </div>
          </div>
          {/*DOMINIK VÉGE*/}

          {/*TAMÁS ELEJE*/}
          <div className=" col-auto col-md-auto col-lg-4 col-xl-4 mx-auto mb-4">
            <br></br>
            <div className="card testimonial-card mt-2 mb-3">
              <div className="card-up aqua-gradient"></div>
              <div className="avatar mx-auto white">
                <img
                  src="../img/tamas.webp"
                  decoding="async"
                  width={140}
                  height={140}
                  className="rounded-circle img-fluid"
                  alt="tamas"
                />
              </div>
              <div className="card-body text-center">
                <h4 className="card-title font-weight-bold colorblack">
                  Juhász Tamás
                </h4>
                <h6 className="card-title font-weight-bold colorblack">
                  C# WPF fejlesztő
                </h6>
                <hr></hr>
                <p className="colorblack justify">
                  Környezetvédelmi technikusnak tanultam Tokajban, ahol
                  informatikusokkal voltam körbevéve és itt tetszett meg a
                  programozás. Szeretek olvasni, legfőképpen a
                  természettudományi és önéletrajzi témájú könyvek érdekelnek.
                  Állatbarát vagyok, előszeretettel gondoskodom az elesett
                  állatokról. Zenében a Hip-Hop stílust kedvelem, mert a
                  különböző élethelyzeteket nagyon sajátosan tudja bemutatni.
                </p>
              </div>
            </div>
          </div>
          {/*TAMÁS VÉGE*/}

          {/*GERGŐ ELEJE*/}
          <div className=" col-auto col-md-auto col-lg-4 col-xl-4 mx-auto mb-4">
            <br></br>
            <div className="card testimonial-card mt-2 mb-3">
              <div className="card-up aqua-gradient"></div>
              <div className="avatar mx-auto white">
                <img
                  src="../img/gergo.webp"
                  decoding="async"
                  width={140}
                  height={140}
                  className="rounded-circle img-fluid"
                  alt="gergo"
                />
              </div>
              <div className="card-body text-center">
                <h4 className="card-title font-weight-bold colorblack">
                  Kiss Gergő Zsolt{" "}
                </h4>
                <h6 className="card-title font-weight-bold colorblack">
                  Frontend fejlesztő
                </h6>
                <hr></hr>
                <p className="colorblack justify">
                  Engem mindig is vonzott az informatika így gépészeti
                  tanulmányaim után úgy döntöttem, hogy szerencsét próbálok az
                  informatika területén. Számomra nagyszerű lépés volt, hiszen
                  nagyon magával ragadott a programozás világa. Ebben képzelem
                  el a jövőmet és programtervező informatikus szakirányban
                  szeretnék továbbtanulni egyetemen.
                </p>
              </div>
            </div>
          </div>
          {/*GERGŐ VÉGE*/}
        </div>
      </div>
    </div>
  );
}

export default KonyvAboutUs;
