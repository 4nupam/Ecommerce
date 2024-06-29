import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import "./Login.css";
import { useNavigate } from "react-router";


function Sign() {
  const [show, setShow] = useState(true);
  const [email,setEmail] = useState("")
  const [pass, setPass] = useState("")
  const navigate = useNavigate();
  function toggle() {
    setShow(!show);
  }

  function validation(e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("Users")) || [];
    const cemail = users.some((user)=> email === user.email)
    const cpass = users.some((user)=> pass === user.pass)
    const Confirmtoken = users.some((user)=> user.token)
    if(cemail && cpass && Confirmtoken){
       document.getElementById("welcome").style.display = "block"
       setTimeout(()=>{
        navigate("/Hero");
       },2000)
    }
    else{
        document.getElementById("s_email").style.display = "block"
        document.getElementById("s_pass").style.display = "block"

    }
  }
  return (
    <div className="main_continer">
      <div className="container">
        <form action="/">
          <label htmlFor="i_email">Email</label>
          <input
            type="text"
            id="i_email"
            className="input-field"
            placeholder="Enter Your Email"
            onChange={(e)=> setEmail(e.target.value)}
          />
          <span className="error-message" id="s_email">
           Correct Email Required
          </span>

          <label htmlFor="i_pass">Password</label>
          <div className="password-container">
            <input
              type={show ? "password" : "text"}
              id="i_pass"
              className="input-field"
              placeholder="Enter Your Password"
              onChange={(e)=>{setPass(e.target.value)}}
            />
            {show ? (
              <FaEye onClick={toggle} className="password-icon" />
            ) : (
              <FaEyeSlash onClick={toggle} className="password-icon" />
            )}
          </div>
          <span className="error-message" id="s_pass">
           Correct Password Required
          </span>

          <span className="error-message" id="sc_pass">
            Password Didn't Match
          </span>

          <button
            type="submit"
            className="btn"
            id="sub_btn"
            onClick={validation}
          >
            Sign In
          </button>
          <span className="error-message" id="welcome">
            Welcome Back
          </span>
        </form>
      </div>
    </div>
  );
}

export default Sign;
