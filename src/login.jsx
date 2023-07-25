import React from "react";
import { useState, useEffect } from "react";
import { NavLink,  useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [regUser, setRegUser] = useState([]);
  
  const fromLocal = () => {
    const data = localStorage.getItem("loggedinuser");
    if (data) {
      return JSON.parse(data);
    }
    return [];
  };
  const [loggedUser, setLoggedUser] = useState(fromLocal());

  

  const navigate = useNavigate()
  // getting registered user data from  local storage
  useEffect(() => {
    const data = localStorage.getItem("registeredUser");
    if (data) {
      setRegUser(JSON.parse(data));
    }
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const checkLogin = regUser.find(
        (user) =>
          user.userName === inputs.userName && user.password === inputs.password
      );

      if (checkLogin) {
        // success
        console.log("Logged in successfully!");

        const Users = {
          id: loggedUser.length+1,
          userName: inputs.userName,
        };
        setLoggedUser((prev) => [...prev, Users]);
        setInputs({});
        
        localStorage.setItem("loggedinuser", JSON.stringify([...loggedUser, Users]));
        // Navigate after updating loggedUser
        navigate('/posts'); 
      } else {
        // error
        alert("Username or password incorrect");
      }
    }
  };



  // Function to validate the form inputs
  const validateForm = () => {
    let valid = true;
    let error = {};

    if (!inputs.userName) {
      valid = false;
      error["userName"] = "Please enter your username!";
    } else if (!inputs.password) {
      valid = false;
      error["password"] = "Please enter your password!";
    }

    setErrors(error);
    return valid;
  };

  return (
    <div className="container  pt-5 mt-5 m-3  ">
      <div className="row">
        <div className=" col-md-4"></div>
        <div className="  col-md-5 border bg-white shadow  my-5 py-4 ">
          <h2 className="row justify-content-center">Log in form</h2>
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

            <div className="text-center ">
              <button type="submit" className="btn btn-primary  w-50">
                Log in
              </button>
            </div>
          </form>
          <p className="  mt-4 text-center">
            {" "}
            Don't Have an account{" "}
            <span>
              <NavLink to={"/"}> sign up</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
