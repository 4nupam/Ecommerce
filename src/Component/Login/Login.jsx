import React, { useState, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { UserContext } from "../../UserContext";
import { useNavigate } from "react-router";

function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [mail, setMail] = useState("");
  const { saveUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  function validation(e) {
    e.preventDefault();
    if (!name || !pass || !cpass || !mail) {
      alert("Fill the form");
      if (!name) document.getElementById("s_name").style.display = "block";
      if (!mail) document.getElementById("s_email").style.display = "block";
      if (!pass) document.getElementById("s_pass").style.display = "block";
      if (!cpass) document.getElementById("s_cpass").style.display = "block";
    } else if (pass !== cpass) {
      document.getElementById("sc_pass").style.display = "block";
    } else {
      let users = JSON.parse(localStorage.getItem("Users")) || [];
      const emailExists = users.some((user) => user.email === mail);
      if (emailExists) {
        document.getElementById("s_email").style.display = "block";
        document.getElementById("s_email").innerHTML = "Email id Exists";
      } else {
        const token = "AnupamToken"
        users.push({ name, email: mail, pass: pass, token });
        localStorage.setItem("Users", JSON.stringify(users));
        saveUser(name, mail, pass);
        alert("Registration Successful");
        navigate("/Hero");
      }
    }
  }

  function toggle() {
    setShow(!show);
  }

  return (
    <div className="main_continer">
      <div className="container">
        <form action="/">
          <label htmlFor="i_name">Name</label>
          <input
            type="text"
            id="i_name"
            className="input-field"
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
          <span className="error-message" id="s_name">
            Name Required
          </span>

          <label htmlFor="i_email">Email</label>
          <input
            type="text"
            id="i_email"
            className="input-field"
            placeholder="Enter Your Email"
            onChange={(e) => setMail(e.target.value)}
          />
          <span className="error-message" id="s_email">
            Email Required
          </span>

          <label htmlFor="i_pass">Password</label>
          <div className="password-container">
            <input
              type={show ? "password" : "text"}
              id="i_pass"
              className="input-field"
              placeholder="Enter Your Password"
              onChange={(e) => setPass(e.target.value)}
            />
            {show ? (
              <FaEye onClick={toggle} className="password-icon" />
            ) : (
              <FaEyeSlash onClick={toggle} className="password-icon" />
            )}
          </div>
          <span className="error-message" id="s_pass">
            Password Required
          </span>

          <label htmlFor="c_pass">Re-enter Password</label>
          <input
            type="password"
            id="c_pass"
            className="input-field"
            placeholder="Re-enter Password"
            onChange={(e) => setCpass(e.target.value)}
          />
          <span className="error-message" id="sc_pass">
            Password Didn't Match
          </span>

          <button
            type="submit"
            className="btn"
            id="sub_btn"
            onClick={validation}
          >
            Submit
          </button>
          <span className="else"> Have Account ?</span>
          <button
            type="submit"
            className="btn"
            id="log_btn"
            onClick={() => navigate('/Sign')}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
