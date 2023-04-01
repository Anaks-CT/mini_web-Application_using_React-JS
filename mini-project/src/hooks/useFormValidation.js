import { useState } from "react";

const useFormValidation = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  ////////////////////////////// toggling errors in the form //////////////////////

  const [error, setError] = useState({
    emailError: false,
    passwordError: false,
    cpasswordError: false,
  });

  ///////////////////////////////// resetting the state after a submission or cancel /////////////////

  const reset = () => {
    setForm({ name: "", email: "", password: "", cPassword: "" });
  };
/////////////////////////////// reges for email validation ////////////////////////

  const emailCheck = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  ///////////////////////////////// on change function for forms //////////////////////
  const handleOnChange = (e) => {
    // email validation
    if (e.target.name === "email") {
      if (e.target.email !== "" && !emailCheck(e.target.value)) {
        setError((prevData) => {
          return {
            ...prevData,
            emailError: true,
          };
        });
      } else {
        setError((prevData) => {
          return {
            ...prevData,
            emailError: false,
          };
        });
      }
      // password validation
    } else if (e.target.name === "password") {
      if (
        e.target.password !== "" &&
        !e.target.value.match(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/)
      ) {
        setError((prevData) => {
          return {
            ...prevData,
            passwordError: true,
          };
        });
      } else {
        if (e.target.cpassword !== "" && e.target.value !== form.cPassword) {
          setError((prevData) => {
            return {
              ...prevData,
              cpasswordError: true,
            };
          });
        } else {
          setError((prevData) => {
            return {
              ...prevData,
              cpasswordError: false,
            };
          });
        }
        setError((prevData) => {
          return {
            ...prevData,
            passwordError: false,
          };
        });
      }
      // confirm password validation
    } else if (e.target.name === "cPassword") {
      if (e.target.cpassword !== "" && e.target.value !== form.password) {
        setError((prevData) => {
          return {
            ...prevData,
            cpasswordError: true,
          };
        });
      } else {
        setError((prevData) => {
          return {
            ...prevData,
            cpasswordError: false,
          };
        });
      }
    }
    // happens on every onchange
    setForm((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  return { form, error, handleOnChange, reset };
};

export default useFormValidation;
