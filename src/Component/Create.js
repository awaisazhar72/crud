import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      setNameError("Name is required");
      return;
    } else {
      setNameError("");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    console.log("clicked");
    axios
      .post("https://65b8f703b71048505a89d875.mockapi.io/crud-operation", {
        name: name,
        email: email,
      })
      .then(() => {
        history("/read");
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Create</h2>
        <Link to="/read">
          <button type="button" className="btn btn-primary">
            Show Data
          </button>
        </Link>
      </div>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setname(e.target.value)}
          />
          <div className="text-danger">{nameError}</div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            onChange={(e) => setemail(e.target.value)}
          />
          <div className="text-danger">{emailError}</div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Create;
