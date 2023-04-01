import React, { useState } from "react";
import Button from "./Button";
import useFormValidation from "../hooks/useFormValidation";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewUser } from "../store/slices/users";

function SigninForm({ use }) {
  const dispatch = useDispatch();
  const [loginError, setError] = useState("");
  const { error, form, handleOnChange, reset } = useFormValidation();
  const Navigate = useNavigate();
  const routTo = () => (use === "admin" ? "/signin" : "/adminsignin");

  /////////////////////// user side//////////////////////////

  const currentUser = {
    email: form.email,
    password: form.password,
  };
  const userAuth = async () => {
    axios
      .post("http://127.0.0.1:8000/user/login", currentUser)
      .then((res) => {
        const data = {
          ...res.data.data,
          token: res.data.token,
        };
        localStorage.setItem("currentUser", JSON.stringify(data));
        dispatch(addNewUser(data));
      })
      .then(() => Navigate("/"))
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  /////////////////////////////////// admin side///////////////////////////

  const currentAdmin = {
    email: form.email,
    password: form.password,
  };
  const adminAuth = () => {
    axios
      .post("http://127.0.0.1:8000/admin/login", currentAdmin)
      .then((res) => {
        Navigate("/dashboard");
      })
      .catch((error) => setError(error.response.data.message));
  };

  //////////////////////////////////// form submission////////////////////
  
  const handleSubmit = (e) => {
    e.preventDefault();
    use === "admin" ? adminAuth() : userAuth();
    reset();
  };
  const disabled = () => error.emailError && "disabled";
  return (
    <div className="col-4 border shadow rounded p-5">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h2 className="mb-3 text-center">
          {use === "admin" ? "ADMIN SIGNIN" : "USER SIGNIN"}
        </h2>
        <input
          onChange={handleOnChange}
          value={form.email}
          name="email"
          className="form-control my-2"
          placeholder="Email Address"
        />
        {error.emailError && <span className="text-danger">Invalid Email</span>}
        <input
          type="password"
          name="password"
          onChange={handleOnChange}
          value={form.password}
          className="form-control my-2"
          placeholder="Password"
        />
        <div className="container-fluid p-0 mb-4 d-flex justify-content-between">
          <Link to="/signup">Sign Up</Link>
          <Link to={routTo()}>
            {use === "admin" ? "Im a User" : "Im an Admin"}
          </Link>
        </div>
        {loginError && <span className="text-danger">{loginError}</span>}
        <Button rounded primary disabled={disabled()} disable={disabled()}>
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default SigninForm;
