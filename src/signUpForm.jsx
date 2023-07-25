import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const SignUpForm = () => {

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});

  const fromLocal = () => {
    const data = localStorage.getItem("registeredUser");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  };
  const [userDetail, setUserDetail] = useState(fromLocal());

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const details = {
        id: userDetail.length + 1 || "",
        userName: inputs.userName || "",
        password: inputs.password || "",
        email: inputs.email || "",
        phoneNumber: inputs.phoneNumber || "",
      };

      setUserDetail([...userDetail, details]);
      setInputs({});
    }
  };

  useEffect(() => {
    localStorage.setItem("registeredUser", JSON.stringify(userDetail));
  }, [userDetail]);


  // Function to validate the form inputs
  const validateForm = () => {
    let valid = true;
    let error = {};

    if (!inputs.userName) {
      valid = false;
      error["userName"] = "Please enter your username!";
    }
    if (!inputs.password) {
      valid = false;
      error["password"] = "Please enter your password!";
    }
    if (!inputs.email) {
      valid = false;
      error["email"] = "Please enter your email!";
    } 
    if (!inputs.phoneNumber) {
      valid = false;
      error["phoneNumber"] = "Please enter your phone number!";
    } 
    setErrors(error);
    return valid;
  };

  return (
    <div className="container  pt-5 mt-5   ">
      <div className="row">
        <div className=" col-md-3"></div>
        <div className=" col-md-6 border bg-white shadow p-4 ">
          <h2 className="row justify-content-center">Sign up form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label"> user name</label>
              <input
                className="form-control"
                type="text"
                placeholder="Enter  your username"
                name="userName"
                value={inputs.userName || ""}
                onChange={handleChange}
              />

              {errors.userName && (
                <div className="text-danger"> {errors.userName}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label"> password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Enter your password"
                name="password"
                value={inputs.password || ""}
                onChange={handleChange}
              />

              {errors.password && (
                <div className="text-danger"> {errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                className="form-control"
                type="text"
                placeholder="Enter your email"
                name="email"
                value={inputs.email || ""}
                onChange={handleChange}
              />

              {errors.email && (
                <div className="text-danger"> {errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Phone number</label>

              <input
                className="form-control"
                type="number"
                placeholder="Enter your phone number"
                name="phoneNumber"
                value={inputs.phoneNumber || ""}
                onChange={handleChange}
              />

              {errors.phoneNumber && (
                <div className="text-danger"> {errors.phoneNumber}</div>
              )}
            </div>

            <div className="text-center ">
              <button type="submit" className="btn btn-primary  w-50">
                Sign up
              </button>
            </div>
          </form>
          <p className="  mt-4 text-center">Have an account <span><NavLink to={'login'}> Log in</NavLink></span></p>
        </div>

      </div>
    </div>
  );
};

export default SignUpForm;
