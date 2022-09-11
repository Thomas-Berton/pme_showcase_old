import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import "./TechnosWheel.scss";

import logo from "../../public/images/pme-logo.png";
import cowork from "../../public/images/cowork.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useModal } from "../../context/ModalContext";


const TechnosWheel = (props) => {
  const { technoBgHandler, technos } = props;
  const [activeTech, setActiveTech] = useState(12);
  const [switchTech, setSwitchTech] = useState(false);

  const { openModal } = useModal()

  const defaultText = {
    id: 12,
    class: "",
    title: "DES SOLUTIONS A LA POINTE DE LA TECHNOLOGIE.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ante elit, sollicitudin vel erat sit amet, consectetur luctus nunc. Suspendisse pulvinar faucibus metus, ut iaculis est pulvinar sed.",
    img: logo,
    linkTitle: "Cliquez sur une technologie",
    link: "",
  };

  const getTechElem = (id) => {
    if (id == 12) return defaultText;
    else return technos.find((el) => el.id == id);
  };

  const selectTechnoHandler = (id) => {

    setSwitchTech(true);

    let timer1 = setTimeout(() => {
      setActiveTech(id);
      technoBgHandler(getTechElem(id));
      setSwitchTech(false);
    }, 100);

    return () => {
      clearTimeout(timer1);
    };

  };

  return (
    <div className=" w-full relative h-full">

      {/* TECHNOS DETAILS */}
      {!switchTech && (
        <div
          className=" w-full h-full mt-0 pl-4 xl:pl-16 "
          data-aos="fade-left"
          data-aos-duration="900"
        >
          <div className="flex flex-row h-full justify-start items-center w-full relative sm:pl-4">
            <div className=" py-10 lg:relative lg:h-full items-start w-full sm:w-3/5 pr-5 justify-between  flex flex-col">

              {/* DEFAULT IMAGE */}
              {activeTech != 12 && (
                <img
                  className="h-auto mr-4 w-auto max-h-40 max-w-1/4 absolute bottom-0 sm:-bottom-32 z-20 right-0"
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    getTechElem(activeTech).img.data.attributes.url
                  }
                  alt={getTechElem(activeTech).title}
                />
              )}

              {activeTech == 12 ? (
                <span className="xl:text-5xl md:text-3xl text-2xl font-extrabold text-left md:leading-10 text-gray-900 dark:text-gray-100 w-4/5 sm:w-full">
                  DES SOLUTIONS À LA POINTE DE LA TECHNOLOGIE.
                </span>
              ) : (
                <div className="flex flex-col justify-start items-start">
                  <span className="capitalize text-4xl xl:text-5xl font-extrabold text-left leading-10 text-gray-900 dark:text-gray-100 w-full ">
                    {getTechElem(activeTech).title}
                  </span>
                  <a
                    target={'_blank'}
                    href={getTechElem(activeTech).link}
                    className="text-left ml-3  dark:text-gray-200 text-gray-700 hover:scale-105 cursor-pointer px-3 py-1 rounded-md  font-semibold raleway text-sm  z-40"
                  >
                    👉 <span className="underline">{getTechElem(activeTech).linkTitle}</span>
                  </a>
                </div>
              )}

              {/* TECHNO DESCRIPTION */}
              {activeTech == 12 ? (
                <p className="xl:text-2xl text-lg text-left leading-6 font-medium text-gray-900 dark:text-gray-100 mb-8 w-full opacity-90">
                  Dans un secteur en perpétuelle évolution comme le numérique,
                  <span className="font-extrabold"> Pme Manageur</span> a su
                  rester à jour des dernières technologies et préparer ses
                  équipes aux défis de demain.
                </p>
              ) : (
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p
                        className="xl:text-2xl text-xl opacity-90 text-left leading-6 font-medium text-gray-900 dark:text-gray-100 my-4 w-full"
                        {...props}
                      />
                    ),
                  }}
                >
                  {getTechElem(activeTech).description}
                </ReactMarkdown>
              )}

              {/* GET CONTACTED CTA */}
              <button
                onClick={() => openModal('lead')}
                style={{ lineHeight: "1.5rem" }}
                className=
                " py-2 text-gray-900 hover:scale-2 text-left leading-6 font-semibold items-center mb-4 shadow-xl rounded-xl cursor-pointer hover:-translate-y-1 hover:bg-opacity-70 hover:dark:bg-gray-900 hover:dark:bg-opacity-70 px-5 bg-gradient-to-r from-yellow-300 to-yellow-400"

              >
                Demander un devis <FontAwesomeIcon
                  className=" text-gray-900 text-lg ml-2"
                  icon={["fad", "fa-ballot-check"]}
                />
              </button>

            </div>
          </div>
        </div>
      )}

      {/* WHEEL */}
      {technos.length > 0 && (
        <div
          className="technologies -right-56 sm:-right-44 md:-right-36 2xl:-right-20 flex flex-col lg:flex-row items-center justify-center mx-auto    "
          id="technologies"
        >
          <div className="technos ml-0 mt-5 ">
            <div className="cursor-pointer center shadow-xl dark:bg-gray-900 bg-gray-200">
              <img
                className="rounded-full"
                src={cowork}
                alt="Pme Manageur Logo"
              />
            </div>

            {technos.map((elem, i) => (
              <a
                key={i}
                onClick={() => selectTechnoHandler(elem.id)}
                className={elem.class + " techElem"}
              >
                <img
                  src={
                    process.env.REACT_APP_BACKEND_URL +
                    elem.img.data.attributes.url
                  }
                  alt={elem.title}
                />
              </a>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};


export default TechnosWheel;
