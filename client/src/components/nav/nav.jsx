import React, { useState } from "react";
import "./nav.css";
import fundrise from "./FundRise.svg";

function Navbar() {
  const [isMenuHidden, setMenuHidden] = useState(true);

  const handleBurgerClick = () => {
    setMenuHidden(!isMenuHidden);
  };

  return (
    <nav>
      <div className="bg-teal-50 pb-3">
        <div className="flex justify-between items-center">
          <img className="w-60 p-2 pl-3 md:w-80" src={fundrise} alt="logo" />
          <div
            className="px-4 cursor-pointer flex justify-end "
          >
            <svg 
              id="burger"
              onClick={handleBurgerClick}
              className="w-6 text-cyan-900 md:hidden items-center"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <div>
              <ul className={`p-2 ${isMenuHidden ? "hidden" : ""}`} id="menu">
                <li className="text-cyan-900 font-bold md:hidden">
                  <a href="#" className="px-2 flex justify-end">
                    <span>Signup </span>
                    <svg
                      className="w-6 ml-1 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </a>
                </li>

                <li className="text-cyan-900 font-bold md:hidden">
                  <a
                    href="#"
                    className="px-2 pt-1 flex justify-end border-r-2 border-teal-50"
                  >
                    <span>Login </span>
                    <svg
                      className="w-6 ml-1 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div >
              <ul className="flex justify-center space-x-4">
                <li>
                  <a href="#">
                  <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">Signup</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">Login</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
