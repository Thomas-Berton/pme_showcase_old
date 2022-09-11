import React, { useEffect, useRef } from "react";
import { withTranslation } from "react-i18next";

import "./ContentExchange.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SlotMachine from "../SlotMachine/SlotMachine";

const ContentExchange = (props) => {


  const { t } = props;

  const wrapperRef = useRef(null);

  useEffect(() => {

    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        document.querySelector(".closeButton").click();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [wrapperRef]);


  return (
    <div
      style={{ height: "98.5%" }}
      data-aos="zoom-in"
      className="bg-gray-50 dark:bg-stone-900 flex flex-col justify-start shadow-md rounded-2xl relative top-2 w-full sm:w-11/12 max-h-screen xl:w-2/4 mx-auto"
      ref={wrapperRef}
    >

      {/* HEADER SLOT MACHINE */}
      <a
        onClick={props.onActivate}
        className="closeButton absolute top-1 sm:top-3 right-1 sm:right-3 px-4 py-2 hover:bg-opacity-100 bg-yellow-200 bg-opacity-80 rounded-lg cursor-pointer z-50"
      >
        <FontAwesomeIcon
          className=" text-base text-yellow-500"
          icon={["fas", "xmark"]}
        />
      </a>

      <span className=" absolute top-6  left-3 text-5xl -rotate-12 animated">
        🏆
      </span>

      <h1 className="mt-6 p-2 raleway bottom-0 text-gray-800 font-bold text-2xl text-center md:text-3xl xl:text-4xl dark:text-gray-50">
        Niveau bonus débloqué
      </h1>

      <div className="confetti absolute">
        {[...Array(14)].map((el, i) => <div key={i} className="confetti-piece"></div>)}
      </div>

      <h1 className="slotText relative text-gray-800 raleway dark:text-gray-50 text-lg sm:text-xl text-left tracking-tight font-extrabold w-fit mr-auto z-40 mt-8 ml-6 sm:ml-10 xl:ml-20 mb-4">
        Tentez de gagner un code promo ! 👍
      </h1>
      <p className="raleway text-gray-600 dark:text-gray-50 tracking-wide mx-6 sm:mx-10 xl:mx-20 text-left font-medium text-sm sm:text-lg">
        Vous avez <span className="text-yellow-300 text-xl font-bold">3 </span>
        <span className="text-gray-900 font-bold">essais</span> pour tenter de
        remporter un ticket pour être contacté par nos équipes gratuitement
      </p>

      {/* SLOT MACHINE COMPONENT */}
      <SlotMachine />

    </div>
  );
};

ContentExchange.propTypes = {};

ContentExchange.defaultProps = {};

export default withTranslation()(ContentExchange);
