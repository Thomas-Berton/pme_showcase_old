import React, { useImperativeHandle, useEffect, useRef, useState, forwardRef } from "react";
import ReactMarkdown from "react-markdown";
import { withTranslation } from "react-i18next";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.css";
import AOS from "aos";

import api from "../../api";

import styles from "./HomePage.module.scss";

import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import handshake from "../../public/images/handshake.png";
import ux from "../../public/images/ux.png";
import dev from "../../public/images/dev.png";
import google from "../../public/images/Google.png";

import { useModal } from "../../context/ModalContext";

import SmartForm from "../../components/SmartForm/SmartForm";
import TechnosWheel from "../../components/TechnosWheel/TechnosWheel";


AOS.init({
  startEvent: "load",
});

const fetchTechnos = async () => {
  try {
    const res = await api.General.fetchTechnos();
    let technos;
    if (res && res.data && res.data.data) {
      technos = res.data.data.attributes.technos
      return technos
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }

};

const fetchSteps = async () => {
  try {
    const res = await api.General.fetchSteps();
    let steps;
    if (res && res.data && res.data.data) {
      steps = res.data.data.attributes
      return steps
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};

const fetchSlider = async () => {
  try {
    const res = await api.General.fetchSlider();
    let slider;
    if (res && res.data && res.data.data) {
      slider = res.data.data.attributes.items
      return slider
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};

const HomePage = forwardRef((props, ref) => {

  const sliderRef = useRef();

  const { openModal } = useModal()

  useImperativeHandle(ref, () => sliderRef.current);

  const [technos, setTechnos] = useState([]);
  const [steps, setSteps] = useState([]);
  const [slider, setSlider] = useState([]);
  const [technoBg, setTechnoBg] = useState("239, 201, 18");
  const [sliderMounted, setSliderMounted] = useState(false);

  const options = {
    type: "carousel",
    perView: 5,
    focusAt: "center",
    startAt: 1,
    gap: 20,
    breakpoints: {
      1280: {
        perView: 3,
      },
      768: {
        perView: 1,
      },
    },
  }

  // FETCH DATA
  useEffect(async () => {
    const getItems = await fetchTechnos();
    const getSteps = await fetchSteps();
    const getSlider = await fetchSlider();

    setTechnos(getItems);
    setSteps(getSteps);
    setSlider(getSlider);

    if (!sliderMounted) {
      const slider = new Glide(
        sliderRef.current,
        (options)
      );
      slider.mount();
      setSliderMounted(true);
    }

  }, []);


  const technoBgHandler = (techno) => {
    if (techno.color != undefined) {
      setTechnoBg(techno.color);
    }
  };


  return (
    <>
      <main>

        {/* HEADER = SMARTFORM CTA */}
        <SmartForm
          props={props}
          technoBgHandler={technoBgHandler}
          technoBg={technoBg}
        />

        {/* TECHNO WHEEL */}
        <div
          className="relative bg-gray-100 h-80 "
          style={{
            background:
              "linear-gradient(90deg, rgba(" +
              technoBg +
              ",.6) 35%, rgba(255, 255, 255, 0) 100%)",
          }}
        >
          <div className="h-full flex flex-row justify-between items-center">
            <TechnosWheel technos={technos} technoBgHandler={technoBgHandler} />
          </div>
        </div>

        <div className="mb-6 relative">

          {/* PADDING TOP */}
          <div className="relative">
            <div
              className={
                styles.imgBot + " bg-transparent h-96 pt-0 sm:pt-36 pl-20 "
              }
            ></div>
            <div
              style={{
                clipPath: "polygon(0 0, 100% 0%, 100% 100%, 100% 100%)",
                background:
                  "linear-gradient(90deg, rgb(" +
                  technoBg +
                  ",.6) 35%, rgba(255, 255, 255, 0) 100%)",
              }}
              className={
                styles.polygonBot + " absolute w-full h-full bg-gray-100 top-0 "
              }
            ></div>
          </div>


          {/* PME MANAGEUR STEPS HEADER ( TITLES + COUNTDOWN) */}
          <div className="mx-auto -mt-64 sm:-mt-40 flex justify-start items-end w-full px-4 sm:px-0 sm:w-11/12 flex-col md:flex-row">
            <h1 className="text-left font-extrabold tracking-tight w-full sm:w-1/2 ">
              <span className="block text-gray-800 dark:text-gray-100 text-2xl sm:text-4xl">
                AVEC LE <br />
                <span className="text-2xl sm:text-4xl xl:text-6xl text-yellow-400">
                  PARCOURS PME
                </span>
                , <br />
                Travaillons ensemble en suivant un processus{" "}
                <span
                  className={
                    styles.textShadow +
                    " textShadow text-2xl sm:text-4xl text-yellow-400"
                  }
                >
                  simple
                </span>
                .
              </span>
              <span className="text-gray-800 dark:text-gray-100 font-medium mt-8">
                Allez.. on vous explique :
              </span>
            </h1>

            <Countdown></Countdown>
          </div>

          {/* STEPS */}
          <div
            className={
              styles.stepContainer +
              " relative w-full 2xl:w-4/5 px-4 md:px-8 2xl:px-0 mx-auto lg:mt-28"
            }
          >

            {/* STEPS SUBHEADER */}
            <div className={styles.step1 + " w-full h-full"}>
              <span className="block text-gray-800 dark:text-gray-100 xl:leading-loose font-bold lg:pl-32 text-xl sm:text-3xl w-full text-left lg:mt-0 mt-20">
                En seulement{" "}
                <span
                  className={
                    styles.bigText +
                    " bigText text-2xl sm:text-4xl xl:text-5xl font-bold text-yellow-400"
                  }
                >
                  4 étapes
                </span>{" "}
                <br />
                établissons ensemble un plan pour <br />
                <span
                  className={
                    styles.bigText +
                    " bigText text-2xl sm:text-4xl xl:text-5xl font-bold text-yellow-400"
                  }
                >
                  {" "}
                  Boostez
                </span>{" "}
                votre activité grâce à{" "}
                <span
                  className={
                    styles.bigText +
                    " bigText text-2xl sm:text-4xl xl:text-5xl font-bold text-yellow-400"
                  }
                >
                  l’informatique
                </span>
                .
              </span>

              <div className="flex flex-row mt-8 mx-auto justify-start 2xl:w-2/3 w-full 2xl:pl-0 lg:pl-40">
                <div className="rounded-xl flex items-center justify-center bg-gray-100 dark:bg-stone-900 w-3/5 sm:w-2/5 lg:w-1/4 mr-4 p-2 pr-4 shadow-md">
                  <img src={google} className="xl:w-12 xl:h-12 w-8 h-8 mr-2" />
                  <div
                    className="flex flex-col items-center"
                    style={{ width: "fit-content" }}
                  >
                    <span className="text-gray-900 dark:text-gray-100 font-bold text-sm sm:text-xs hidden sm:block">
                      Pme Manageur
                    </span>
                    <div className="flex flex-row text-yellow-400">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <span className="text-gray-400 text-xs sm:text-base">
                      12 avis Google
                    </span>
                  </div>
                </div>

                <div
                  className="flex flex-col items-start sm:pr-4"
                  style={{ width: "fit-content" }}
                >
                  <span className="w-full text-gray-800 dark:text-gray-100 text-left font-semibold text-xs sm:text-base">
                    “Une équipe très disponible qui a su nous apporter des{" "}
                    <br />
                    réponses et des solutions rapidement”
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                    Fabien B.
                  </span>
                </div>
              </div>
              <div className="w-full lg:w-4/5 ml-auto mt-10 md:mt-32 lg:pb-4 xl:pb-12">
                <h2
                  data-aos="zoom-in-left"
                  className={
                    styles.step1mobile +
                    " text-2xl sm:text-3xl lg:text-5xl text-gray-800 dark:text-gray-100 font-bold text-center lg:text-left"
                  }
                >
                  Echanger & Planifier
                </h2>
              </div>
            </div>

            {/* STEP 1 */}
            <div className={styles.step2 + " w-full h-full lg:pb-6"}>
              <div className="w-full 2xl:w-10/12 2xl:mt-8 mx-auto flex items-center justify-start flex-col md:flex-row">
                <div data-aos="slide-right" className="2xl:w-2/4 flex flex-col">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          className="mt-0 text-center md:text-left raleway font-medium text-base lg:text-xl lg:ml-8 text-gray-800 dark:text-gray-50 leading-7 lg:leading-9"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {steps.step1}
                  </ReactMarkdown>

                  <button
                    onClick={() => openModal('lead')}
                    className={
                      styles.btnStepsY +
                      " py-6 text-gray-50 lg:ml-8 mt-8 sm:mt-12 mx-auto sm:mr-auto text-base dark:text-gray-800 text-left leading-6 font-extrabold items-center mb-4 shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400"
                    }
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={["fad", "envelope"]}
                    />
                    Demander un audit
                  </button>
                </div>

                <img
                  src={handshake}
                  className="lg:w-auto w-2/3 md:w-2/4 sm:-mt-10 2xl:ml-12 object-contain"
                />
              </div>
              <h2
                data-aos="zoom-in-right"
                className={
                  styles.step2mobile +
                  " 1xl:ml-32 text-left sm:text-center lg:text-left xl:text-center text-2xl sm:text-3xl lg:text-5xl text-gray-800 mt-12 lg:mt-40 dark:text-gray-100 font-bold"
                }
              >
                Documenter & Maquetter
              </h2>
            </div>

            {/* STEP 2 */}
            <div className="w-full flex items-center md:items-start justify-center sm:mt-8 xl:mt-20 flex-col md:flex-row">
              <img
                src={ux}
                className="w-2/3 md:w-2/5 2xl:w-1/3 md:-mt-10 2xl:mr-12 object-contain"
              />

              <div className="2xl:w-2/4 flex flex-col" data-aos="slide-left">
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p
                        className="text-center md:text-right raleway text-base lg:text-xl lg:mr-8 xl:-mt-10 font-medium text-gray-800 dark:text-gray-50 leading-7 lg:leading-9"
                        {...props}
                      />
                    ),
                  }}
                >
                  {steps.step2}
                </ReactMarkdown>

                <button
                  onClick={() => openModal('lead')}
                  className={
                    styles.btnSteps +
                    " py-6 text-gray-50 lg:mr-8 mt-8 sm:mt-12 mx-auto sm:ml-auto text-base dark:text-gray-50 text-left leading-6 font-extrabold items-center mb-4 shadow-xl sm:text-xl rounded-full cursor-pointer hover:-translate-x-1  hover:bg-opacity-70 hover:dark:bg-gray-900 hover:dark:bg-opacity-70 px-12 bg-gradient-to-r from-gray-800 to-gray-900"
                  }
                >
                  <FontAwesomeIcon
                    className="mr-2"
                    icon={["fad", "compass-drafting"]}
                  />
                  Demandez votre maquette
                </button>
              </div>
            </div>

            {/* STEP 3 */}
            <div className={styles.step3 + " w-full h-full pb-24"}>
              <h2
                data-aos="zoom-in-left"
                className={
                  styles.step3mobile +
                  " lg:ml-40 pl-20 text-right sm:text-center lg:text-left text-2xl sm:text-3xl lg:text-5xl text-gray-800 mt-20 pt-10 2xl:pt-14 dark:text-gray-100 font-bold"
                }
              >
                Développer & Communiquer
              </h2>

              <div className="w-full lg:pl-8 2xl:pl-0 2xl:w-10/12 md:mt-8 lg:mt-16 mx-auto flex items-center justify-start flex-col md:flex-row">
                <div
                  className="2xl:w-2/4 flex flex-col xl:mt-10 md:mb-20 lg:mb-0"
                  data-aos="slide-right"
                >
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          className="text-center raleway md:text-left text-base lg:text-xl lg:ml-8 leading-7 font-medium text-gray-800 dark:text-gray-50 lg:leading-9"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {steps.step3}
                  </ReactMarkdown>
                  <button
                    onClick={() => openModal('lead')}
                    className={
                      styles.btnStepsY +
                      " py-6 text-gray-50 lg:ml-8 mt-8 sm:mt-12 mx-auto sm:mr-auto text-base dark:text-gray-800 text-left leading-6 font-extrabold items-center mb-4 shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400"
                    }
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={["fad", "envelope"]}
                    />
                    Nous contacter
                  </button>
                </div>

                <img
                  src={dev}
                  className="mt-8 md:-mt-10 xl:ml-12 w-4/5 sm:w-2/3 lg:w-1/3 xl:w-auto object-contain md:w-2/4"
                />
              </div>
            </div>

            {/* STEP 4 */}
            <div
              className={
                styles.step4 +
                " w-full h-full pt-16 lg:pt-20 xl:pt-32 2xl:pt-44"
              }
            >
              <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl text-gray-800 pt-0 sm:pt-8 dark:text-gray-100 font-bold">
                Déployer & Accompagner
              </h2>

              <div className="w-10/12 sm:mt-4 mx-auto flex items-center justify-start">
                <div className="w-full flex flex-col mt-10">
                  <ReactMarkdown
                    components={{
                      p: ({ node, ...props }) => (
                        <p
                          className="text-center text-base raleway font-medium lg:text-xl ml-0 text-gray-800 dark:text-gray-50 leading-7 lg:leading-9 w-full"
                          {...props}
                        />
                      ),
                    }}
                  >
                    {steps.step4}
                  </ReactMarkdown>

                  <button
                    onClick={() => openModal('lead')}
                    className={
                      styles.btnStepsY +
                      " py-6 hover:bg-gray-900 hover:scale-150 text-gray-50 mt-8 lg:mt-12 mx-auto text-base dark:text-gray-800 text-left leading-6 font-extrabold items-center mb-4 shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400"
                    }
                  >
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={["fad", "envelope"]}
                    />
                    Demander un devis
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      <div className="px-6 sm:px-10" data-aos="zoom-in">
        <div className="flex items-center justify-evenly w-full p-0 sm:p-16 pb-4 pt-8">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="glide" ref={sliderRef}>
              <div className="slider__arrows" data-glide-el="controls">
                <button
                  data-glide-dir="<"
                  className={
                    styles.slider__arrow +
                    " dark__arrow " +
                    styles.slider__arrow__prev
                  }
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                <button
                  data-glide-dir=">"
                  className={
                    styles.slider__arrow +
                    " dark__arrow " +
                    styles.slider__arrow__next
                  }
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              </div>
              <div
                className={"glide__track " + styles.glide__track}
                data-glide-el="track"
              >
                <ul className={"glide__slides " + styles.glideSlides}>
                  {slider.map((item, index) => {
                    return <Slide key={index} children={item}></Slide>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

const Countdown = () => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    countDownHandler();
  }, [countdown]);

  const countDownHandler = () => {
    if (countdown > 0) {
      let timer1 = setTimeout(() => {
        setCountdown(null);
        setCountdown(countdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
    }
  };

  const dom =
    countdown > 0 ? (
      <span className="uppercase ml-8 text-2xl sm:text-4xl text-gray-800 dark:text-gray-100 font-bold">
        Prets ?..{" "}
        <span
          style={{ fontFamily: "Racing Sans One" }}
          className={
            styles.textShadow + " textShadow text-yellow-400 text-9xl w-24"
          }
        >
          {countdown}
        </span>
      </span>
    ) : null;

  return dom;
};

const Slide = forwardRef((props, ref) => {
  const { children } = props;

  return (
    <a target="blank" href={children.url}>
      <li
        className={
          "bg-white dark:bg-stone-900 bg-opacity-80 rounded-xl shadow-md flex items-center justify-center py-8 glide__slide" +
          styles.glide__slide
        }
        ref={ref}
      >
        <img
          className={"boxLogo " + styles.boxLogo}
          src={
            process.env.REACT_APP_BACKEND_URL +
            children.logo.data.attributes.url
          }
        />
      </li>
    </a>
  );
});

HomePage.propTypes = {};

HomePage.defaultProps = {};

export default withTranslation()(HomePage);
