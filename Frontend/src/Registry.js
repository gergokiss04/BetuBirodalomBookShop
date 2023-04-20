import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as sha256 from "crypto-js/sha256";
import "./App.css";
import { toast } from "react-toastify";

//Jelszó titkosítása SALT segítségével
function GenerateSalt() {
  let salt = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 64; i++) {
    salt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return salt;
}

export function Registry() {
  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      <div className="login-registration-form ">
        <h2>Regisztráció</h2>
        {/*"Regisztrálció" gombra kattintásával megtörténik a regisztrálció fetch kéréssel*/}
        <form
          onSubmit={(event) => {
            event.persist();
            event.preventDefault();
            let lekertSalt = "";
            let username = event.target.elements.username.value;
            let password = event.target.elements.password.value;
            let tomb = [];
            let salt = GenerateSalt();
            let Key = "";
            salt =
              "dkBczmjgWSy0aujs7sjUppKkICH17L0eYo2XGYUCmOp9Dia1uWrsCDjyZaUxeriL";
            let hash = sha256(sha256(password + salt).toString()).toString();
            console.log(password);
            console.log(salt);
            console.log(hash);

            fetch(`https://localhost:7280/Registry`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: event.target.elements.username.value,
                fullname: event.target.elements.fullname.value,
                salt: salt,
                hash: hash,
                email: event.target.elements.email.value,
                Key: Key,
              }),
            })
              .then((response) => {
                if (!response.ok) {
                  // Hiba dobása ha probléma történt a küldés során
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
              })
              .then((data) => {
                console.log(data);
                if (data.ok) {
                  lekertSalt = salt;
                  let tmpHash = sha256(password + lekertSalt).toString();
                  console.log(tmpHash);
                  tomb = data;
                  console.log(tomb);
                  toast.success("Sikeres regisztrálció!", { autoClose: 4000 });
                  toast.success("Kérem hitelesítse regisztrálcióját e-mail fiókjába kapott e-mailen!", { autoClose: 4000 });
                  navigate("/");
                } else {
                }
              })
              .catch((error) => console.log(error));
          }}
        >
          <div className="form-group">
            <label htmlFor="registration-username">Teljes név:</label>
            <input
              title="fullname"
              type="text"
              name="fullname"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="registration-email">Email cím:</label>
            <input
              title="email"
              type="email"
              name="email"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="registration-username">Felhasználónév:</label>
            <input
              title="username"
              type="text"
              name="username"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="registration-password">Jelszó:</label>
            <input
              title="password"
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <button type="submit">Regisztráció</button>
        </form>
      </div>
    </div>
  );
}

export default Registry;
