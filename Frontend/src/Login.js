import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as sha256 from "crypto-js/sha256";
import { toast } from "react-toastify";
import axios from "axios";

function GenerateSalt() {
  let salt = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 64; i++) {
    salt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return salt;
}

export function Login() {
  const navigate = useNavigate();
  const [salt, setSalt] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  //Az oldal tetejére ugrik kattintásra:
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  useEffect(() => {
    setSalt(GenerateSalt());
  }, []);

  //"Bejelentkezés" gombra kattintva megtörténik az axios kérés
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements.username.value;
    const password = event.target.elements.password.value;

    axios
      .post("https://localhost:7280/Login/SaltRequest/" + username)
      .then((response) => {
        const lekertSalt = response.data;
        const tmpHash = sha256(password + lekertSalt).toString();
        const url =
          "https://localhost:7280/Login?name=" +
          username +
          "&tmpHash=" +
          tmpHash;

        axios
          .post(url)
          .then((response) => {
            console.log("Server response: ", response);
            const tomb = response.data;
            console.log("Response data: ", tomb);
            if (tomb[0] !== "Hibás jelszó!") {
              navigate("/");
              toast.success("Sikeres bejelentkezés!", { autoClose: 2000 });
              setTimeout(() => {
                window.location.reload(true);
              }, 3000);
              localStorage.setItem("loggedIn", true);
              localStorage.setItem("username", username);
              setLoggedIn(true);
              setUsername(username);
              console.log("Logged in user: ", username);
              console.log("Logged in status: ", loggedIn);
            } else {
              console.log("Incorrect username or password");
              toast.error("Hiba történt a bejelentkezés során!", {
                autoClose: 2000,
              });
            }
          })
          .catch((error) => {
            console.log("Error:", error);
            if (error.response && error.response.status === 400) {
              console.log("Incorrect username or password");
              toast.error("Hiba történt a bejelentkezés során!", {
                autoClose: 2000,
              });
            } else {
              toast.error("Hiba történt a bejelentkezés során!", {
                autoClose: 2000,
              });
            }
          });
      })
      .catch((error) => {
        console.log("Error:", error);
        toast.error("Hiba történt a bejelentkezés során!", { autoClose: 2000 });
      });
  };

  return (
    <div className="p-5 m-auto text-center content bg-lavender img-up">
      <div className="login-registration-form ">
        <h2>Bejelentkezés</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-email">Felhasználónév:</label>
            <input
            id="username"
              title="username"
              type="text"
              name="username"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="login-password">Jelszó:</label>
            <input
            id="password"
              title="password"
              type="password"
              name="password"
              className="form-control"
              required
            />
          </div>
          <button id="submit" type="submit">Bejelentkezés</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
