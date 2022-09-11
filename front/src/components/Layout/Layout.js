import React, { Fragment, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Exchange from "../Exchange/Exchange";
import LeadsGenModal from "../LeadsGenModal/LeadsGenModal";
import style from "./Layout.module.scss";

const Layout = (props) => {

  const { t } = props;

  const [darkMode, setdarkMode] = useState(true);
  const [modal, setModal] = useState(true);

  const themeToggleHandler = () => {
    const newMode = !darkMode;
    localStorage.setItem("darkMode", newMode);
    setdarkMode(newMode);
  };

  const toggleModal = () => {
    setModal(!modal)
  }

  // DARK/LIGHT MODE SETUP
  useEffect(() => {
    const modeStorage = localStorage.getItem("darkMode");
    if (modeStorage != undefined && typeof modeStorage == "boolean")
      setdarkMode(modeStorage);
    else localStorage.setItem("darkMode", darkMode);
  });


  return (
    <>
      <Exchange> </Exchange>
      <div
        className={style.mainContainer + " bg-opacity-70 " + (darkMode ? "dark " + style.dark : "light " + style.light)}
      >
        <LeadsGenModal>
          <Header
            themeToggleHandler={themeToggleHandler}
            darkMode={darkMode}
          ></Header>
          <Fragment>
            <main className="mt-20">
              {React.cloneElement(props.children, { toggleModal: () => toggleModal() })}
            </main>
          </Fragment>
          <Footer></Footer>
        </LeadsGenModal>
      </div>
    </>
  );
};

Layout.propTypes = {};

Layout.defaultProps = {};

export default withTranslation()(Layout);
