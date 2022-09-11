import React, { useState, useEffect, Fragment } from "react";
import ReactMarkdown from "react-markdown";
import api from "../../api";
import "@glidejs/glide/dist/css/glide.core.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./ServicesPage.module.scss";

import project from "../../public/images/project.png";
import knowledge from "../../public/images/knowledge.png";

import { Carousel } from "../../components/Carousel/Carousel";


const fetchServices = async () => {
  try {
    const res = await api.General.fetchServices();
    let services;
    if (res && res.data && res.data.data) {
      services = res.data.data.attributes.services
      return services
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};

const ServicesPage = () => {

  const [services, setServices] = useState([]);

  useEffect(async () => {
    const serv = await fetchserv();
    setServices(services);
  }, []);

  return (
    <div className="mt-20">
      <div className=" py-12 lg:py-40 w-full px-8 sm:px-16 lg:max-w-7xl lg:px-40 flex flex-col relative">

        {/* TITLE 1 */}
        <p
          data-aos="slide-left"
          className={
            "text-yellow-300 font-medium text-2xl sm:text-3xl text-left sm:ml-8"
          }
        >
          Notre Savoir-Faire
          <span className="text-gray-800 dark:text-gray-50 text-3xl sm:text-4xl font-extrabold ml-1">
            ,
          </span>
        </p>

        {/* TITLE 2 */}
        <h1
          data-aos="slide-left"
          data-aos-delay="100"
          className={
            styles.titleService +
            " sm:ml-6 font-extrabold text-left text-gray-800 dark:text-gray-50 text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
          }
        >
          <span>Nos Experti</span>
          <span className={styles.pmeE}>ses.</span>
        </h1>

        {/* DESCRIPTION 1 */}
        <p
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="600"
          className="raleway text-right mt-2 sm:mt-12 font-medium tracking-wide text-base text-gray-800 dark:text-gray-50 2xl:pr-44"
        >
          PME Manageur vous accompagne dans toutes les étapes necessaire au
          developpement numérique de votre activité, c’est pourquoi nous
          chercherons toujours à élargir nos compétences.
        </p>

        {/* DESCRIPTION 2 */}
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="raleway text-right mt-6 tracking-wide text-base text-gray-800 dark:text-gray-50 font-medium 2xl:pr-44"
        >
          <span className="font-bold text-yellow-400">Applications</span>,
          <span className="font-bold text-yellow-400"> NFT</span>,
          <span className="font-bold text-yellow-400"> LMS</span>,
          <span className="font-bold text-yellow-400"> CMS </span>
          autant de domaines dans lesquels nous vous appoterons des solutions.
        </p>

      </div>

      {/* MAIN AND SUB SERVICES DETAILS  */}
      <div className="lg:mx-auto lg:max-w-7xl lg:px-40 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
        {services.map((item, index) => {
          if (item.isMainService && item.position == "left") {
            return (
              <Fragment key={index}>
                <div className="flex items-start justify-center relative mt-20">
                  <div className="flex flex-col items-center justify-center lg:w-fit md:w-3/4 w-4/5 mr-auto md:mx-auto pl-4 md:pl-0">
                    <h3
                      data-aos="slide-right"
                      data-aos-delay="50"
                      className="w-full font-extrabold text-right text-gray-800 dark:text-gray-50 text-3xl md:text-4xl tracking-tight"
                    >
                      <span>{item.title.slice(0, item.title.length - 3)}</span>
                      <span className=" border-b-4 border-yellow-400 ">
                        {item.title.split("")[item.title.length - 3]}
                      </span>
                      <span className=" border-b-4 border-yellow-400 ">
                        {item.title.split("")[item.title.length - 2]}
                      </span>
                      <span className=" border-b-4 border-yellow-400 ">
                        {item.title.split("")[item.title.length - 1]}
                      </span>
                    </h3>

                    <ReactMarkdown
                      data-aos="zoom-in-right"
                      data-aos-delay="250"
                      components={{
                        p: ({ node, ...props }) => (
                          <p
                            className="raleway text-gray-500 dark:text-gray-50 mt-8 text-right sm:leading-8 font-medium"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {item.description}
                    </ReactMarkdown>
                  </div>
                  <div
                    data-aos="slide-right"
                    className=" lg:h-24 md:w-16 lg:w-24 md:h-16 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center absolute right-4 mt-2 lg:mt-0 lg:-right-32 -translate-y-1/4"
                  >
                    <FontAwesomeIcon
                      className="text-yellow-500 text-2xl lg:text-4xl"
                      icon={["fad", item.icon]}
                    />
                  </div>
                </div>
                <div data-aos="zoom-in-left" data-aos-duration="600">
                  <img
                    style={{ maxWidth: "510px" }}
                    className={styles.expertiseImg + " ml-2 sm:ml-10"}
                    src={
                      process.env.REACT_APP_BACKEND_URL +
                      item.img.data.attributes.url
                    }
                  />
                </div>
              </Fragment>
            );
          } else if (item.isMainService && item.position == "right") {
            return (
              <Fragment key={index}>
                <div
                  data-aos="zoom-in-right"
                  data-aos-duration="600"
                  className="flex items-center justify-end"
                >
                  <img
                    style={{ maxWidth: "510px" }}
                    className={
                      styles.expertiseImg + " mr-2 sm:mr-10 lg:mb-0 -mb-16"
                    }
                    src={
                      process.env.REACT_APP_BACKEND_URL +
                      item.img.data.attributes.url
                    }
                  />
                </div>
                <div className="flex items-start justify-center relative lg:mt-20">
                  <div className="flex flex-col items-center justify-center lg:w-fit md:w-3/4 w-4/5 ml-auto md:mx-auto pr-4 md:pr-0">
                    <h3
                      data-aos="slide-left"
                      data-aos-delay="50"
                      className="w-full font-extrabold text-left text-gray-800 dark:text-gray-50 text-3xl md:text-4xl tracking-tight"
                    >
                      <span className=" border-b-4 border-yellow-400 ">
                        {item.title.split("")[0]}
                      </span>
                      <span className=" border-b-4 border-yellow-400 ">
                        {item.title.split("")[1]}
                      </span>
                      <span className=" border-b-4 border-yellow-400 ">
                        {item.title.split("")[2]}
                      </span>
                      {item.title.slice(3, item.title.length + 1)}
                    </h3>

                    <ReactMarkdown
                      data-aos="zoom-in-left"
                      data-aos-delay="250"
                      components={{
                        p: ({ node, ...props }) => (
                          <p
                            className="raleway text-gray-500 dark:text-gray-50 mt-8 text-left sm:leading-8 font-medium"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {item.description}
                    </ReactMarkdown>
                  </div>
                  <div
                    data-aos="slide-left"
                    className=" lg:h-24 md:w-16 lg:w-24 md:h-16 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center mt-2 absolute left-6 lg:-left-32 -translate-y-1/4"
                  >
                    <FontAwesomeIcon
                      className="text-yellow-500 text-2xl lg:text-4xl"
                      icon={["fad", item.icon]}
                    />
                  </div>
                </div>
              </Fragment>
            );
          }
        })}
      </div>

      {/* SERVICE SECOND SECTION */}
      <div className="sm:py-16">
        <div className="lg:mx-auto lg:max-w-7xl lg:px-40 lg:grid lg:grid-cols-1 lg:gap-24 lg:items-start">
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 w-full">
            <div className="pt-12 sm:pt-16 lg:pt-20 mb-4 2xl:mb-20">

              {/* SERVICE SECOND SECTION TITLE */}
              <h2 className="text-3xl text-gray-800 font-extrabold tracking-tight sm:text-4xl">
                <span className="mr-4 text-gray-800 dark:text-yellow-400">
                  Des connaissances
                </span>
                <span
                  data-aos="slide-right"
                  className="before:block before:absolute mt-4 before:-inset-1 before:-skew-y-3 before:bg-yellow-400 dark:before:bg-stone-900 before:shadow-sm before:rounded-md p-4 relative inline-block"
                >
                  <span className="relative text-gray-50">
                    {" "}
                    multidisciplinaires
                  </span>
                </span>
              </h2>
              <div className="mt-6 text-gray-500 space-y-6"></div>

            </div>

            {/* STATS SUB SECTION */}
            <div className="mt-24 text-6xl flex 2xl:items-center 2xl:justify-evenly 2xl:flex-row flex-col justify-center items-center">
              <div
                data-aos="flip-right"
                data-aos-duration="600"
                className="grid grid-cols-2 gap-x-0 gap-y-24"
              >
                {services.map((item, i) => {
                  if (!item.isMainService) {
                    return (
                      <div
                        key={item.title}
                        className={
                          "p-4 relative mx-1 sm:mx-16 flex flex-col items-center justify-center shadow-md rounded-tl-3xl rounded-tr-lg rounded-br-3xl rounded-bl-lg  bg-gray-100 dark:bg-stone-900 bg-opacity-60 hover:scale-105 " +
                          (i % 2 == 0 ? styles.leftStat : styles.rightStat)
                        }
                      >
                        <div className="rounded-full absolute top-0 mx-auto -translate-y-2/4 bg-yellow-400 flex items-center justify-center text-6xl w-24 h-24 text-gray-50 shadow-sm cursor-pointer">
                          <FontAwesomeIcon
                            style={{ width: "50px" }}
                            className="text-gray-50 dark:text-stone-900"
                            icon={["fad", item.icon]}
                          />
                        </div>
                        <div className="raleway font-medium text-xl tracking-wide text-gray-800 dark:text-gray-50 cursor-pointer mt-12 mb-2">
                          {item.title}
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <img
                data-aos="flip-left"
                data-aos-duration="600"
                src={knowledge}
                className="mt-20"
              />
            </div>

          </div>
        </div>
      </div>

      {/* OUR PRODUCTS SECTION */}
      <div className="mb-20">

        {/* TITLE */}
        <div
          data-aos="flip-up"
          data-aos-duration="600"
          className={
            "py-6 sm:py-12 mx-6 md:mx-auto md:w-3/5 2xl:w-1/3 flex flex-col rounded-2xl shadow-lg bg-white dark:bg-stone-900 bg-opacity-80 relative mt-20"
          }
        >
          <img
            src={project}
            className={
              styles.imgEquipe + " absolute w-16 sm:w-24 xl:w-32 top-0 left-0"
            }
          />
          <p
            className={
              styles.titleYellow + " text-yellow-300 text-sm mb-2 sm:mb-4"
            }
          >
            UN PROJET ?
          </p>
          <h1
            className={
              styles.title + " text-gray-800 dark:text-gray-50 text-2xl"
            }
          >
            Nos réalisations
          </h1>
        </div>

        {/* PRODUCTS  */}
        <Carousel
          options={{
            type: "slider",
            perView: 9,
            focusAt: "center",
            startAt: 4,
            gap: 30,
            autoplay: 3000,
            breakpoints: {
              1600: {
                perView: 7,
                startAt: 4,
                gap: 25,
              },
              1250: {
                perView: 5,
                startAt: 3,
                gap: 20,
              },
              768: {
                perView: 3,
                startAt: 2,
                gap: 15,
              },
            },
          }}
        ></Carousel>


      </div>
    </div>
  );
};

ServicesPage.propTypes = {};

ServicesPage.defaultProps = {};

export default ServicesPage;
