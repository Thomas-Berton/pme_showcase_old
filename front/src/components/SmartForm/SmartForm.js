import React from "react";
import { withTranslation } from "react-i18next";

import styles from "./SmartForm.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import coworkLg from "../../public/images/cowork-lg.jpg";

import { useModal } from "../../context/ModalContext";

const SmartForm = (props) => {

  const { t, technoBg } = props;
  const { openModal } = useModal()

  return (
    <div className="relative -mt-20">
      <div className="w-full ">
        <div
          className={
            styles.polygonTop + " absolute w-full h-full bg-gray-100 top-0"
          }
          style={{
            clipPath: "polygon(100% 53%, 0% 100%, 100% 100%, 100% 100%)",
            background:
              "linear-gradient(90deg, rgba(" +
              technoBg +
              ", 0.6) 35%, rgba(255, 255, 255, 0) 100%)",
          }}
        ></div>

        <div className="absolute  inset-0 overflow-hidden">
          <img
            className={styles.imgTop + " h-full w-full object-cover"}
            src={coworkLg}
            alt="People working on laptops"
          />
          <div
            className={
              styles.imgTop +
              " absolute  inset-0 back mix-blend-multiply h-full w-full bg-gray-900 bg-opacity-80"
            }
          />
        </div>

        <div
          className={
            styles.backImg +
            " relative flex justify-start align-center flex-col sm:overflow-hidden h-full w-full "
          }
        >
          <div className="flex justify-start px-4 sm:px-28  mt-32 ">
            <span
              data-aos="fade-in"
              className="font-semibold text-gray-900 dark:text-gray-100 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight  "
            >
              <span className="text-yellow-400 font-semibold  mr-2">PME</span>
              manag
              <span className={styles.pmeE}>e</span>
              <span className={styles.pmeU}>u</span>
              <span className={styles.pmeR}>r.</span>
            </span>
          </div>
          <div className="relative px-4 sm:px-28 flex justify-center align-center flex-col mr-2">
            <h1 className="lg:text-left  tracking-tight text-base md:text-lg lg:text-xl font-bold mt-2">
              <span
                className="text-sm sm:text-base block mt-1 text-gray-900 dark:text-gray-100 text-left "
                data-aos="fade-down"
                data-aos-delay="950"
              >
                {t("")}
                <span className=" text-yellow-400">Ensemble</span>, trouvons la
                solution informatique dont votre activité a{" "}
                <span className=" text-yellow-400">vraiment besoin</span>.
              </span>
            </h1>
          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="950"
            className="flex justify-center items-start flex-col px-4 sm:px-28 "
          >
            <div className=" flex flex-col justify-center items-start mt-12 my-4 rounded-xl">
              <span className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                <FontAwesomeIcon
                  className={
                    styles.rightHand + " mr-2 text-gray-900 dark:text-gray-200"
                  }
                  icon={["fad", "hand-point-right"]}
                />{" "}
                Suivez notre{" "}
              </span>

              <button
                onClick={() => openModal('lead')}
                style={{ lineHeight: "1.5rem" }}
                className={
                  styles.audit +
                  " py-4 text-gray-900 hover:scale-2 text-left leading-6 font-extrabold items-center mb-4 shadow-xl rounded-xl cursor-pointer hover:-translate-y-1 hover:bg-opacity-70 hover:dark:bg-gray-900 hover:dark:bg-opacity-70 px-8 bg-gradient-to-r from-yellow-300 to-yellow-400"
                }
              >
                <FontAwesomeIcon
                  className=" text-gray-900 mr-2"
                  icon={["fad", "comments-question-check"]}
                />
                Audit intelligent{" "}
              </button>

              <small className="text-left font-bold text-gray-900 dark:text-gray-100 ">
                trouvez l'outil informatique dont votre activité a besoin en 1
                minute 🚀
              </small>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(SmartForm);
