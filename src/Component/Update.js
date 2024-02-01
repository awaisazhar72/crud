import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [id, setid] = useState(0);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setid(localStorage.getItem("id"));
    setname(localStorage.getItem("name"));
    setemail(localStorage.getItem("email"));
  }, []);

  const handleupdate = (e) => {
    e.preventDefault();
    console.log("id...", id);

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

    axios
      .put(`https://65b8f703b71048505a89d875.mockapi.io/crud-operation/${id}`, {
        name: name,
        email: email,
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <>
      <h2>Update</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
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
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <div className="text-danger">{emailError}</div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleupdate}
        >
          Update
        </button>
      </form>
    </>
  );
};

export default Update;
