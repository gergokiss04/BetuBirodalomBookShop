import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { KonyvSinglePage } from "./KonyvSinglePage";
import { KonyvGenrePage } from "./KonyvGenrePage";
import { NavLink } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import KonyvContact from "./KonyvContact";
import KonyvAboutUs from "./KonyvAboutUs";
import KonyvRecommendation from "./KonyvRecommendation";
import Registry from "./Registry";
import KosarTartalom from "./KosarTartalom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shopping from "./Shopping";
import Orderdelivery from "./Orderdelivery";
import { toast } from "react-toastify";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // bejelentkezés állapot
  const [username, setUsername] = useState(""); // felhasználónév állapot
  const navigate = useNavigate;

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn");
    const username = localStorage.getItem("username");

    if (loggedInStatus === "true" && username) {
      setLoggedIn(true);
      setUsername(username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
    toast.success("Viszlát!", { autoClose: 1000 });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <Router>
        {/*NAVBAR KEZDETE*/}
        <nav className="navbar  sticky-top navbar-expand-lg navbar-dark fw-bold shadow-5-strong header-footer-background-image">
          <div className="container-fluid">
            <NavLink
              className="navbar-brand"
              title="brandlogo"
              style={{ textDecoration: "none" }}
              to={"/"}
              onClick={() => window.scrollTo(0, 0)}
            >
              {" "}
              <img
                src="/img/logo.webp"
                alt=""
                width="200"
                height="40"
                className="d-inline-block align-text-top"
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <NavLink id="fooldal" style={{ textDecoration: "none" }} to={"/"}>
                  <li className="nav-item nav-link">Főoldal</li>
                </NavLink>
                <NavLink id="konyvajanlo"
                  style={{ textDecoration: "none" }}
                  to={"/bookrecommendation"}
                >
                  <li className="nav-item nav-link">Könyvajánló</li>
                </NavLink>
                <li id="lenyilomenu" className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#hetikonyvajanlo"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Könyvek
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <NavLink id="nyelvkonyvesszotar"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/15"}
                    >
                      <li>
                        <s className="dropdown-item" href="1">
                          Nyelvkönyv és szótár
                        </s>
                      </li>
                    </NavLink>
                    <NavLink id="eletmod"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/2"}
                    >
                      <li>
                        <s className="dropdown-item" href="#eletmod">
                          Életmód és egészség
                        </s>
                      </li>
                    </NavLink>
                    <NavLink id="tortenelem"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/22"}
                    >
                      <li>
                        <s className="dropdown-item" href="#tortenelem">
                          Történelem
                        </s>
                      </li>
                    </NavLink>
                    <NavLink id="irodalom"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/9"}
                    >
                      <li>
                        <s className="dropdown-item" href="#irodalom">
                          Irodalom
                        </s>
                      </li>
                    </NavLink>
                    <NavLink id="sport"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/17"}
                    >
                      <li>
                        <s className="dropdown-item" href="#sport">
                          Sport
                        </s>
                      </li>
                    </NavLink>
                    <NavLink id="gyermek"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/6"}
                    >
                      <li>
                        <s className="dropdown-item" href="#gyermek">
                          Gyermek és ifjúsági
                        </s>
                      </li>
                    </NavLink>
                    <NavLink id="csalad"
                      style={{ textDecoration: "none" }}
                      to={"/Book/Genre_book/1"}
                    >
                      <li>
                        <s className="dropdown-item" href="1">
                          Család és gyermeknevelés
                        </s>
                      </li>
                    </NavLink>
                  </ul>
                </li>
                <NavLink id="rendelesitudnivalok"
                  style={{ textDecoration: "none" }}
                  to={"/orderdeliveryoptions"}
                >
                  <li className="nav-item nav-link">Rendelési tudnivalók</li>
                </NavLink>
                <NavLink id="rolunk" style={{ textDecoration: "none" }} to={"/aboutus"}>
                  <li  className="nav-item nav-link">Rólunk</li>
                </NavLink>
                <NavLink id="kapcsolat" style={{ textDecoration: "none" }} to={"/contact"}>
                  <li className="nav-item nav-link">Kapcsolat</li>
                </NavLink>
              </ul>
              <ul className="navbar-nav ms-auto">
                {loggedIn ? (
                  <>
                    <li className="nav-item nav-link">Üdv, {username}!</li>
                    <button
                      className="btn btn-danger btn-rounded"
                      onClick={handleLogout}
                    >
                      Kijelentkezés
                    </button>
                    <NavLink to="/basket" className="nav-link">
                      <i className="bi bi-basket-fill"></i> (
                      {JSON.parse(localStorage.getItem("cart"))?.length || 0})
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink id="bejelentkezes" style={{ textDecoration: "none" }} to={"/login"}>
                      <li className="nav-item nav-link">Bejelentkezés</li>
                    </NavLink>
                    <NavLink id="regisztracio"
                      style={{ textDecoration: "none" }}
                      to={"/registration"}
                    >
                      <li className="nav-item nav-link">Regisztráció</li>
                    </NavLink>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {/*NAVBAR VÉGE*/}
        <Routes>
          <Route
            path="/bookrecommendation"
            exact
            element={<KonyvRecommendation />}
          />
          <Route path="/aboutus" exact element={<KonyvAboutUs />} />
          <Route path="/book/:bookId" exact element={<KonyvSinglePage />} />
          <Route
            path="/book/Genre_book/:genreId"
            exact
            element={<KonyvGenrePage />}
          />
          <Route path="/" exact element={<Home />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" exact element={<Registry />} />
          <Route path="/contact" exact element={<KonyvContact />} />
          <Route path="/basket" exact element={<KosarTartalom />} />
          <Route path="/shopping" exact element={<Shopping />} />
          <Route
            path="/orderdeliveryoptions"
            exact
            element={<Orderdelivery />}
          />
        </Routes>
      </Router>
      <ToastContainer />

      {/*LÁBLÉC KEZDETE*/}
      <footer className="text-center text-lg-start bg-dark text-muted header-footer-background-image">
        <section>
          <div className="container text-center text-md-start ">
            <div className="row ">
              <div className=" col-auto col-md-auto col-lg-4 col-xl-3 mx-auto mb-4">
                <br></br>
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="bold-white-color">Betű Birodalom Webshop</i>
                </h6>
                <p className="bold-white-color">
                  Szeretettel köszöntjük a Betű Birodalom honlapján!
                </p>
                <img
                  title="bblogo"
                  decoding="async"
                  src="/img/footerlogo.webp"
                  alt="brand"
                  width="240"
                  height="120"
                />
              </div>
              <div className="col-auto col-md-auto col-lg-4 col-xl-3 mx-auto mb-4">
                <br></br>
                <iframe
                  title="myFrame"
                  decoding="async"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2664.249255215737!2d20.777774115056214!3d48.10542726137953!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47409fe48c01588b%3A0xdc6303e601794631!2sMiskolc%20SZC%20Kand%C3%B3%20K%C3%A1lm%C3%A1n%20IT%20School!5e0!3m2!1sen!2shu!4v1648740734869!5m2!1sen!2shu"
                  width="300"
                  height="200"
                  style={{ border: "0" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="col-auto col-md-auto col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">
                <br></br>
                <h6 className="text-uppercase fw-bold mb-4 bold-white-color">
                  Elérhetőség:
                </h6>
                <ul>
                  <li className="bold-white-color">
                    Cím:3525 Miskolc, Palóczy László utca 3.
                  </li>
                  <li className="bold-white-color">Telefon: +36 46 500 930</li>
                  <li className="bold-white-color footermargin">
                    E-mail:betubirodalominfo@gmail.com
                  </li>
                  <li>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      className="bold-white-color none-text-decoration"
                      href="https://www.kkszki.hu/"
                    >
                      <img
                        src="/img/kandologo.webp"
                        decoding="async"
                        title="kandologo"
                        alt="brand"
                        width="80"
                        height="80"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </footer>
      {/*Lábléc vége*/}
    </div>
  );
}

export default App;
