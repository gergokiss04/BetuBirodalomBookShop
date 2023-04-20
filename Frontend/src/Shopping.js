import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Shopping() {
  //Itt tárolom az könyv adatokat:
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [{ bookId: 0 }]
  );

  //Itt tárolom az könyv árainak adatát:
  const [totalPrice, setTotalPrice] = useState(0);

  //A kosárban lévő termékek törlése:
  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.location.reload(true);
  };

  //Végösszeg kiszámolása:
  useEffect(() => {
    let sum = 0;
    cart.forEach((book) => {
      sum += book.price;
    });
    setTotalPrice(sum);
  }, [cart]);

  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 50,
      behavior: "instant",
    });
  }, []);

  const navigate = useNavigate();
  const bookId = cart.length > 0 ? cart[0].id : 0;

  //Amennyiben a rendelésnél üres lesz akkor visszaugrik a főoldalra
  useEffect(() => {
    if (totalPrice === 0 && cart.length === 0) {
      navigate("/");
    }
  }, [totalPrice, cart.length, navigate]);

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      <div
        id="contact"
        className="container-fluid text-white scrollspy light-brown-background-color"
      >
        <h1>Megrendelés</h1>
        <hr></hr>
        <p>
          Kérem pontosan töltse ki az adatait,hogy az ön által választott
          szállítási módon sikeresen tudjuk kézbesíteni a megvásárolt
          könyvét/könyveit.
        </p>
        <p>Bármilyen probléma esetén forduljon hozzánk bizalommal!</p>
        {/*"Megrendelés véglegesítése" gombra kattintva megtörténik a fetch*/}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.target);
            const id = 0;
            const username = data.get("username");
            const email = data.get("email");
            const phonenumber = data.get("phonenumber");
            const zipcode = data.get("zipcode");
            const location = data.get("location");
            const street = data.get("street");
            const number = data.get("housenumber");
            const orderType = data.get("ordertype");
            const personalRequest = data.get("personalrequest");
            const totalAmount = totalPrice;

            //Kosárba tett könyvekeket itt tárolom
            const selectedBooks = JSON.parse(localStorage.getItem("cart"));
            console.log(selectedBooks);

            //Fetch számolása kosárba tett könyvek alapján
            const totalFetches = selectedBooks.length;
            let successfulFetches = 0;

            // a kosárba tett könyvek alapján küldöm a fetchet ahány könyv van
            selectedBooks.forEach((book) => {
              const bookId = book.bookId;
              const stockNumber = 1;

              const orderDateGet = new Date().toLocaleString("hu-HU", {
                timeZone: "Europe/Budapest",
              }); // helyi időzóna szerint
              const orderDate = new Date(orderDateGet).toISOString(); // UTC időzóna szerint

              fetch("https://localhost:7280/Orders/PostOrders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id,
                  username,
                  email,
                  bookId,
                  stockNumber,
                  orderDate,
                  phonenumber,
                  zipcode,
                  location,
                  street,
                  number,
                  orderType,
                  personalRequest,
                  totalAmount,
                }),
              })
                .then((response) => {
                  console.log(id);
                  console.log(username);
                  console.log(email);
                  console.log(bookId);
                  console.log(stockNumber);
                  console.log(orderDate);
                  console.log(phonenumber);
                  console.log(zipcode);
                  console.log(location);
                  console.log(street);
                  console.log(number);
                  console.log(orderType);
                  console.log(personalRequest);
                  console.log(totalAmount);
                  console.log(response);
                  if (!response.ok) {
                    // Hiba dobása ha probléma történt a küldés során
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }
                  if (response.ok) {
                    successfulFetches++;
                    //Ha megtörtént az összes fetch ahány könyv volt a kosárban akkor jön fel az alert
                    if (successfulFetches === totalFetches) {
                      localStorage.removeItem("cart");
                      alert("Sikeres rendelés!");
                      navigate("/");
                      setTimeout(() => {
                        window.location.reload(true);
                      }, 1000);
                    }
                  }
                  return response;
                })
                .catch((error) => console.log(error));
            });
          }}
        >
          <div className="row">
            <div className="col-lg-12" id="contact-center">
              <div className="col-lg-12">
                <div className="form-floating mb-3 colorblack">
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    placeholder="nev"
                    required
                  />
                  <label htmlFor="nev">Teljes Név:</label>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="csapatnev@iskola.hu"
                    required
                  />
                  <label htmlFor="email">E-mail</label>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <input
                    type="tel"
                    name="phonenumber"
                    className="form-control"
                    id="phonenumber"
                    placeholder="+36123456789"
                    required
                  />
                  <label htmlFor="phonenumber">Telefonszám:</label>
                </div>
                <div className="row ">
                  <div className="col-md-3 form-floating mb-3 colorblack">
                    <input
                      type="text"
                      name="zipcode"
                      className="form-control"
                      id="iranyitoszam"
                      placeholder="3521"
                      required
                    />
                    <label htmlFor="iranyitoszam">Irányítószám:</label>
                  </div>
                  <div className="col-md-3 form-floating mb-3 colorblack">
                    <input
                      type="text"
                      name="location"
                      className="form-control"
                      id="lakhely"
                      placeholder="Miskolc"
                      required
                    />
                    <label htmlFor="lakhely">Lakhely:</label>
                  </div>
                  <div className="col-md-3 form-floating mb-3 colorblack">
                    <input
                      type="text"
                      name="street"
                      className="form-control"
                      id="utca"
                      placeholder="AranyJanosutca"
                      required
                    />
                    <label htmlFor="utca">Utca:</label>
                  </div>
                  <div className="col-md-3 form-floating mb-3 colorblack">
                    <input
                      type="text"
                      name="housenumber"
                      className="form-control"
                      id="hazszam"
                      placeholder="11"
                      required
                    />
                    <label htmlFor="hazszam">Házszám:</label>
                  </div>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <select
                    className="form-select"
                    name="ordertype"
                    title="dropdownmenu"
                    id="floatingInput"
                    defaultValue={
                      "Kérem válasszon az alábbi szállítási opciókból:"
                    }
                    required
                  >
                    <option disabled defaultValue={""}>
                      Kérem válasszon az alábbi szállítási opciókból:
                    </option>
                    <option value="futarszolgalat">Futárszolgálat</option>
                    <option value="csomagautomata">Csomagautomata</option>
                    <option value="postan_marado_csomag">
                      Postán maradó csomag
                    </option>
                  </select>
                </div>
                <div className="form-floating mb-3 colorblack">
                  <textarea
                    className="form-control"
                    name="personalrequest"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                  ></textarea>
                  <label htmlFor="egyedikeres">Egyedi kérés:</label>
                </div>
              </div>

              <h2>Megrendelésre váró könyv/könyvek:</h2>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <ul className="list-group list-group-flush">
                      {cart.map((book, index) => (
                        <li className="list-group-item" key={index}>
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                src={book.cover}
                                alt={book.title}
                                style={{ maxHeight: "150px" }}
                                className="img-fluid rounded-start d-flex align-items-center"
                              />
                            </div>
                            <div className="col-md-8">
                              <h4 className="card-title colorblack">
                                {book.author + ":" + book.title}
                              </h4>
                              <p className="card-text colorblack">
                                Ár: {book.price} Ft
                              </p>
                              <button
                                className="btn btn-danger"
                                onClick={() => removeFromCart(index)}
                              >
                                Törlés
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <br></br>
              <h3>Teljes végösszeg: {totalPrice} Ft</h3>
              <hr></hr>
              <div className="col-auto">
                <button type="submit" value="Send" className="btn btn-primary">
                  Megrendelés véglegesítése
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

export default Shopping;
