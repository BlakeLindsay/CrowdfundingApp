import React, { useState } from "react";
import "./nav.css";
import fundrise from "../../assets/FundRise.svg";
import { useNavigate } from "react-router-dom";

function Navbar({ token, clearToken }) {
  const [isMenuHidden, setMenuHidden] = useState(true);
  const navigate = useNavigate();
  const handleBurgerClick = () => {
    setMenuHidden(!isMenuHidden);
  };

  function handleLogout() {
    clearToken();
    console.log("Logout successful");
    navigate("/"); // Redirect to the /
  }

  return (
    <nav>
      <div
        className={`bg-teal-50 transition-all duration-300 ${
          isMenuHidden ? "h-24" : "h-60"
        }`}
      >
        <div className="flex justify-between items-center">
          <a href="/">
            <img className="w-60 p-2 pl-3 md:w-80 " src={fundrise} alt="logo" />
          </a>
          <div className="pr-10 cursor-pointer flex justify-end relative">
            <svg
              id="burger"
              onClick={handleBurgerClick}
              className="w-6 text-cyan-900 md:hidden items-center title-svg"
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
              <ul
                className={`pr-4 pt-2  absolute right-0 top-full ${
                  isMenuHidden ? "hidden" : ""
                }`}
                id="menu"
              >
                {!token && (
                  <li className="text-cyan-900 font-bold md:hidden pb-1">
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                      <a href="/" className="pl-2 pt-1 flex justify-end ">
                        <span>Home</span>
                        <svg
                          className="w-6 ml-1 h-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                )}

                {!token && <hr className="border-t-2 border-cyan-900" />}

                {!token && (
                  <li className="text-cyan-900 font-bold md:hidden pt-1 pb-1 ">
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                      <a
                        href="/browser"
                        className="pl-1 pt-1 flex justify-end "
                      >
                        <span>Explore</span>
                        <svg
                          className="w-6 ml-1 h-6"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                )}

                {!token && <hr className="border-t-2 border-cyan-900" />}

                {!token && (
                  <li className="text-cyan-900 font-bold md:hidden pt-1 pb-1">
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                    <a href="/signup" className="pl-2 pt-1 flex justify-end ">
                      <span>Signup</span>
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
                    </a></div>
                  </li>
                )}

                {!token && <hr className="border-t-2 border-cyan-900" />}

                {!token && (
                  <li className="text-cyan-900 font-bold md:hidden pt-1">
                    <a
                      href="/login"
                      className="pl-2 pt-1 flex justify-end "
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
                )}

                {token ? (
                  <li className="text-cyan-900 font-bold md:hidden pb-1">
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                      <a href="/" className="pl-2 pt-1 flex justify-end ">
                        <span>Home</span>
                        <svg
                          className="w-6 ml-1 h-5"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21 8.77217L14.0208 1.79299C12.8492 0.621414 10.9497 0.621413 9.77817 1.79299L3 8.57116V23.0858H10V17.0858C10 15.9812 10.8954 15.0858 12 15.0858C13.1046 15.0858 14 15.9812 14 17.0858V23.0858H21V8.77217ZM11.1924 3.2072L5 9.39959V21.0858H8V17.0858C8 14.8767 9.79086 13.0858 12 13.0858C14.2091 13.0858 16 14.8767 16 17.0858V21.0858H19V9.6006L12.6066 3.2072C12.2161 2.81668 11.5829 2.81668 11.1924 3.2072Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                ) : null}

                {token ? <hr className="border-t-2 border-cyan-900" /> : null}

                {token ? (
                  <li className="text-cyan-900 font-bold md:hidden pt-1 pb-1">
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                      <a href="/create" className="pl-2 pt-1 flex justify-end ">
                        <span>Create</span>
                        <svg
                          className="w-6 ml-1 h-6"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                ) : null}

                {token ? <hr className="border-t-2 border-cyan-900" /> : null}

                {token ? (
                  <li className="text-cyan-900 font-bold md:hidden pt-1 pb-1 ">
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                      <a
                        href="/browser"
                        className="pl-1 pt-1 flex justify-end "
                      >
                        <span>Explore</span>
                        <svg
                          className="w-6 ml-1 h-6"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipule="evenodd"
                            d="M18.319 14.4326C20.7628 11.2941 20.542 6.75347 17.6569 3.86829C14.5327 0.744098 9.46734 0.744098 6.34315 3.86829C3.21895 6.99249 3.21895 12.0578 6.34315 15.182C9.22833 18.0672 13.769 18.2879 16.9075 15.8442C16.921 15.8595 16.9351 15.8745 16.9497 15.8891L21.1924 20.1317C21.5829 20.5223 22.2161 20.5223 22.6066 20.1317C22.9971 19.7412 22.9971 19.1081 22.6066 18.7175L18.364 14.4749C18.3493 14.4603 18.3343 14.4462 18.319 14.4326ZM16.2426 5.28251C18.5858 7.62565 18.5858 11.4246 16.2426 13.7678C13.8995 16.1109 10.1005 16.1109 7.75736 13.7678C5.41421 11.4246 5.41421 7.62565 7.75736 5.28251C10.1005 2.93936 13.8995 2.93936 16.2426 5.28251Z"
                            fill="currentColor"
                          />
                        </svg>
                      </a>
                    </div>
                  </li>
                ) : null}

                {token ? <hr className="border-t-2 border-cyan-900" /> : null}

                {token ? (
                  <li className="text-cyan-900 font-bold md:hidden pt-1 pb-1">
                    <a href="/profile" className="pl-2 pt-1 flex justify-end ">
                      <span className="">Profile</span>
                      <svg
                        className="w-6 ml-1 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
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
                ) : null}

                {token ? <hr className="border-t-2 border-cyan-900" /> : null}

                {token ? (
                  <li
                    className="text-cyan-900 font-bold md:hidden pt-1"
                    onClick={handleLogout}
                  >
                    <div className="px-0 ml-0 flex justify-end  border-r-2 border-teal-50">
                      <span>LogOut</span>
                      <svg
                        className="w-4 ml-2 h-4 mt-1 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                        />
                      </svg>
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>

            <div>
              {/*  buttons that display on desktop */}
              <ul className="flex justify-center md:space-x-4">
                <li>
                  {!token && (
                    <a href="/">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Home
                      </span>
                    </a>
                  )}
                </li>
                <li>
                  {!token && (
                    <a href="/browser">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Explore
                      </span>
                    </a>
                  )}
                </li>
                <li>
                  {!token && (
                    <a href="/signup">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Signup
                      </span>
                    </a>
                  )}
                </li>
                <li>
                  {!token && (
                    <a href="/login">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Login
                      </span>
                    </a>
                  )}
                </li>
                <li>
                  {token ? (
                    <a href="/">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Home
                      </span>
                    </a>
                  ) : null}
                </li>
                <li>
                  {token ? (
                    <a href="/create">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Create
                      </span>
                    </a>
                  ) : null}
                </li>
                <li>
                  {token ? (
                    <a href="/browser">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Explore
                      </span>
                    </a>
                  ) : null}
                </li>
                <li>
                  {token ? (
                    <a href="/profile">
                      <span className="btn text-cyan-900 font-bold border-cyan-900 border-2  hidden md:block  hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300">
                        Profile
                      </span>
                    </a>
                  ) : null}
                </li>
                <li>
                  {token ? (
                    <span
                      onClick={handleLogout}
                      className="btn text-cyan-900 font-bold border-cyan-900 border-2 hidden md:block mr-10 hover:-translate-y-1 hover:scale-110 hover:bg-cyan-900 hover:text-teal-50 duration-300"
                    >
                      LogOut
                    </span>
                  ) : null}
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