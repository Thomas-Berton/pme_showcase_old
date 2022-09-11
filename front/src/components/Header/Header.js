import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { Popover, Transition, Switch } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

import logo from "../../public/images/pme-logo.png";

import CtaRecruitment from '../CtaRecruitment/CtaRecruitment'
import style from "../Layout/Layout.module.scss";

const Header = (props) => {

  const { t, darkMode, themeToggleHandler } = props;

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleScroll = () => {
    const position = ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100)
    setScrollPosition(position);
  };

  const horizontalScrollBar = <div className="h-1 bg-gray-50 absolute top-0 left-0 w-full bg-transparent">
    <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-100 rounded-full"
      style={{
        width: scrollPosition + "%"
      }}></div>
  </div>;


  const menuLinks = [
    {
      name: "Accueil",
      to: '/'
    },
    {
      name: "Services",
      to: '/services'
    },
    {
      name: "Equipe",
      to: '/equipe'
    },
    {
      name: "Contact",
      to: '/contact'
    },
  ]


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <menu
        className="menu w-full z-50 m-0 p-0 fixed"
        data-aos="fade-down"
        data-aos-delay="200"
      >
        <Popover
          className={
            style.mainCnav +
            " main-c-nav relative p-2 px-6 flex flex-wrap justify-between items-center mx-auto"
          }
        >


          {horizontalScrollBar}

          {/* MOBILE Popover section  */}
          <div className="ml-2 md:hidden">
            <Popover.Button className="bg-gray-200 dark:bg-gray-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-300">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6 text-white" aria-hidden="true" />
            </Popover.Button>
          </div>


          {/* WEB LOGO */}
          <div
            className="flex justify-start"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <NavLink to="/">
              <div className=" flex flex-row items-center">
                <span className="sr-only">Logo Pme</span>
                <img
                  className="h-10 sm:h-14 md:h-16 w-auto shadow-md rounded-full "
                  src={logo}
                  alt="Logo PME Manageur"
                />
                <CtaRecruitment></CtaRecruitment>
              </div>
            </NavLink>
          </div>

          {/* WEB LINKS */}
          <Popover.Group
            as="nav"
            className="hidden md:flex ml-12 mr-10 tracking-widest uppercase font-semibold"
          >
            {menuLinks.map((el, i) => <NavLink
              key={i}
              to={el.to}
              exact
              activeClassName="text-yellow-400"
              aria-current="page"
              className="nav-links text-lg  text-gray-900 dark:text-gray-100 hover:text-yellow-400 dark:hover:text-yellow-400 mx-6 raleway font-bold"
            >
              {el.name}
            </NavLink>)}
          </Popover.Group>

          {/* DARK/LIGHT MODE SWITCH */}
          <Switch
            checked={!darkMode}
            onChange={themeToggleHandler}
            className={classNames(
              darkMode ? "bg-gray-600" : "bg-gray-200",
              "right-6 inline-flex flex-shrink-0 h-9 w-16 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
            )}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={classNames(
                !darkMode ? "translate-x-7" : "translate-x-0",
                "pointer-events-none flex justify-center items-center h-8 w-8 rounded-full dark:bg-gray-900 bg-gray-100 shadow transform ring-0 transition ease-in-out duration-200"
              )}
            >
              <FontAwesomeIcon
                icon={!darkMode ? faSun : faMoon}
                className="text-xl duration-75"
                style={{ color: darkMode ? "#F3F4F6" : "#e7913a" }}
              />
            </span>
          </Switch>


          {/* MOBILE MENU MODAL */}
          <Transition
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              trigger="focus"
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg bg-gray-100 dark:bg-gray-800">
                <div className="p-4 border-none">
                  <div className="flex items-center justify-between">

                    {/* MOBILE LOGO */}
                    <div>
                      <img className="h-8 w-auto" src={logo} alt="Workflow" />
                    </div>

                    {/* MOBILE MODAL CLOSE BTN */}
                    <div className="-mr-2">
                      <Popover.Button className="bg-yellow-300 rounded-md p-2 inline-flex items-center justify-center text-white hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>

                  </div>
                </div>

                {/* MOBILE LINKS */}

                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    {menuLinks.map((el, i) =>
                      <NavLink
                        key={i}
                        to={el.to}
                        className="nav-links text-base font-semibold text-gray-800 dark:text-gray-50 hover:text-yellow-400"
                      >
                        {el.name}
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </menu>
    </>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
