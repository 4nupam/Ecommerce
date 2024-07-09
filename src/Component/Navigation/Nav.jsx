import React, { useContext } from "react";
import "./Nav.css";
import logo from "../../Assests/logo.png";
import { CiShoppingCart } from "react-icons/ci";
import { UserContext } from "../../UserContext";
import { Link, useNavigate } from "react-router-dom";

function Nav() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src={logo} alt="Logo" style={{ width: "30px" }} />
            <span className="ml-3 text-xl">Xclusive</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <Link className="mr-5 hover:text-gray-900" to="/">
              Home
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="/Contact">
              Contact
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="/About">
              About
            </Link>

            <Link className="mr-5 hover:text-gray-900" to="/sign">
              Sign Up
            </Link>
            <Link className="mr-5 hover:text-gray-900" to="/cart">
             
                <CiShoppingCart />
              
            </Link>
          </nav>
          <div className="flex items-center">
            <i className="mr-5">Welcome {user.name}</i>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            >
              Log in
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Nav;
