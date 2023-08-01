import "./FormSection.css";
import React from "react";
import FormErrors from "./FormErrors";
import { post } from "../lib/Requests";
import Cookies from "js-cookie";

export default function FormSection() {
  const [state, setState] = React.useState({ form: "" });
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [errors, setErrors] = React.useState([]);

  const name_onchange = (event) => {
    setName(event.target.value);
  };
  const username_onchange = (event) => {
    setUsername(event.target.value);
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    if (username.length <= 0) {
      setErrors(["Username is required"]);
      return false;
    }
    if (/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,30}$/.test(username) === false) {
      setErrors(["Invalid username"]);
      return false;
    }
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/signin`;
      const payload_data = {
        username: username,
      };
      post(url, payload_data, {
        setErrors: setErrors,
        success: function (data) {
          Cookies.set("username", username);
          window.location.href = `/home`;
        },
      });
    } catch (error) {
      setErrors([error.message]);
    }
    return false;
  };

  const onSignUpSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    if (username.length <= 0) {
      setErrors(["Username is required"]);
      return false;
    }
    if (name.length <= 0) {
      setErrors(["Name is required"]);
      return false;
    }
    if (/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{1,30}$/.test(username) === false) {
      setErrors(["Invalid username"]);
      return false;
    }
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/signup`;
      const payload_data = {
        username: username,
        name: name,
      };
      post(url, payload_data, {
        setErrors: setErrors,
        success: function (data) {
          Cookies.set("username", username);
          Cookies.set("name", name);
          window.location.href = `/home`;
        },
      });
    } catch (error) {
      setErrors([error.message]);
    }
    return false;
  };

  return (
    <div className="form-wrapper">
      {state.form === "" || state.form === "login" ? (
        <div className="login">
          <form className="signup_form" onSubmit={onLoginSubmit}>
            <h2>Sign In to your EverWrite account</h2>
            <div className="fields">
              <div className="field text_field username">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={username_onchange}
                />
              </div>
            </div>
            <FormErrors errors={errors} />
            <div className="submit">
              <button type="submit" style={{ cursor: "pointer" }}>
                Sign In
              </button>
            </div>
          </form>
          <div className="already-have-an-account">
            <span>Don't have an account?</span>
            <p
              style={{ cursor: "pointer", fontWeight: "bold", margin: 0 }}
              onClick={() => {
                setErrors([])
                setState((s) => ({ ...s, form: "signup" }))
              }}
            >
              Sign Up!
            </p>
          </div>
        </div>
      ) : (
        <div className="signup">
          <form className="signup_form" onSubmit={onSignUpSubmit}>
            <h2>Sign Up to create an EverWrite account</h2>
            <div className="fields">
              <div className="field text_field name">
                <label>Name</label>
                <input type="text" value={name} onChange={name_onchange} />
              </div>

              <div className="field text_field username">
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={username_onchange}
                />
              </div>
            </div>
            <FormErrors errors={errors} />
            <div className="submit">
              <button type="submit" style={{ cursor: "pointer" }}>
                Sign Up
              </button>
            </div>
          </form>
          <div className="already-have-an-account">
            <span>Already have an account?</span>
            <p
              style={{ cursor: "pointer", fontWeight: "bold", margin: 0 }}
              onClick={() => {
                setErrors([])
                setState((s) => ({ ...s, form: "login" }))
              }}
            >
              Sign in!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
