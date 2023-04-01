import Button from "./Button";
import { Link } from "react-router-dom";
import useFormValidation from "../hooks/useFormValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

function UserSignupForm() {
  const { error, form, handleOnChange, reset } = useFormValidation();
  const [signupError, setError] = useState(false);
  const Navigate = useNavigate();

  ///////////////////////////// registering user /////////////////////////////

  const register = async () => {
    await axios
      .post("http://127.0.0.1:8000/user/signup", form)
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Registration successfull",
          showConfirmButton: false,
          timer: 1200,
          width: "300px",
        });
      })
      .then(() => {
        Navigate("/signin");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  ///////////////////////////////////// register  function evoked when submit is clicked ////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();
    register();
    reset();
  };

  //////////////////////////////////// passing the disabled prop to the Button component//////////////////////

  const disabled = () =>
    error.emailError ||
    error.passwordError ||
    (error.cpasswordError && "disabled");

  return (
    <div className="col-4 border shadow rounded p-5">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <h2 className="mb-3">SIGN UP</h2>
        <input
          required
          name="name"
          onChange={handleOnChange}
          value={form.name}
          className="form-control my-2"
          placeholder="Name"
        />
        <input
          required
          name="email"
          onChange={handleOnChange}
          value={form.email}
          className="form-control my-2"
          placeholder="Email Address"
        />
        {error.emailError && <span className="text-danger">Invalid Email</span>}
        <input
          required
          name="password"
          onChange={handleOnChange}
          type="password"
          value={form.password}
          className="form-control my-2"
          placeholder="Password"
        />
        {error.passwordError && (
          <span className="text-danger text-center">
            Password should be atleast 8 characters
          </span>
        )}
        <input
          required
          name="cPassword"
          onChange={handleOnChange}
          value={form.cPassword}
          type="password"
          className="form-control my-2"
          placeholder="ConfirmPassword"
        />
        {error.cpasswordError && (
          <span className="text-danger">Passwords not Matching</span>
        )}
        <div className="container-fluid p-0 mb-4 d-flex justify-content-between">
          <Link to="/signin">Sign In</Link>
          <Link to="/adminsignin">Im an Admin</Link>
        </div>
        {signupError && <span className="text-danger">{signupError}</span>}
        <Button rounded primary disabled={disabled()} disable={disabled()}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default UserSignupForm;
