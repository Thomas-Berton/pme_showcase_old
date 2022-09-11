import React, { useImperativeHandle, useEffect, useRef, useState, forwardRef, } from "react";
import ReactMarkdown from "react-markdown";
import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.css";

import api from "../../api";

import styles from "./AboutUsPage.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faEnvelope, faPhone, faUser, } from "@fortawesome/free-solid-svg-icons";

import Map3d from "../../components/Map3d/Map3d";
import teams from "../../public/images/team.png";
import pmeLogo from "../../public/images/pme-logo.png";
import coverServices from "../../public/images/coverService.png";
import mrs_white from "../../public/images/mrs_white.png";
import mrs from "../../public/images/mrs.png";


const AboutUsPage = forwardRef((props, ref) => {

  const sliderCard = useRef();

  const [cards, setCards] = useState([]);
  const [services, setServices] = useState(null);

  useImperativeHandle(ref, () => sliderCard.current);

  const options = {
    type: "carousel",
    perView: 1,
    focusAt: "center",
    startAt: 1,
    gap: 20,
  }

  const fetchCards = async () => {
    try {
      const res = await api.General.fetchCards();
      let cards = null;
      if (res && res.data) {
        cards = res.data.data.attributes.cards
        return cards ? cards : null
      } else return null;
    } catch (error) {
      console.error("Erreur : ", error)
      return null;
    }

  };

  const fetchServices = async () => {
    try {
      const res = await api.General.fetchServices();
      let services = null;
      if (res && res.data) {
        services = res.data.data.attributes
        return services ? services : null
      } else return null;
    } catch (error) {
      console.error("Erreur : ", error)
      return null;
    }
  };


  useEffect(async () => {
    const cards = await fetchCards();
    const services = await fetchServices();

    setCards(cards);
    setServices(services)

    const glideCard = new Glide(
      sliderCard.current,
      (options)
    );
    glideCard.mount();
  }, []);

  return (
    <>
      <div className="mt-40 mb-14">
        <div className="px-6 sm:px-10 mb-96 md:mt-20 relative">
          <div className="flex flex-wrap items-end xl:items-center justify-end w-full pt-5 mb-20">
            <div
              className={
                styles.sectionTitleMobile +
                " py-6 sm:py-12 mx-auto w-full sm:w-2/3 flex flex-col rounded-2xl shadow-lg bg-white dark:bg-stone-900 bg-opacity-80 relative"
              }
            >
              <img
                src={teams}
                className={
                  styles.imgEquipe +
                  " absolute w-16 sm:w-24 xl:w-32 top-0 left-0"
                }
              />
              <p
                className={
                  styles.titleYellow + " text-yellow-300 text-sm mb-0"
                }
              >
                Qui sommes nous ?
              </p>
              <h1
                className={
                  styles.title +
                  " text-gray-800 dark:text-gray-50 text-2xl leading-none"
                }
              >
                Notre équipe
              </h1>
            </div>
            <div
              data-aos="fade-right"
              data-aos-duration="600"
              data-aos-delay="200"
              className="flex flex-col items-center justify-center w-full md:w-2/4 2xl:w-2/5 "
            >
              <div
                className={
                  styles.sectionTitle +
                  " py-6 sm:py-8 w-full xl:w-2/3 flex flex-col rounded-2xl shadow-lg bg-white dark:bg-stone-900 bg-opacity-80 relative"
                }
              >
                <img
                  src={teams}
                  className={
                    styles.imgEquipe +
                    " absolute w-20 sm:w-24 xl:w-32 top-0 left-0"
                  }
                />
                <p
                  className={
                    styles.titleYellow +
                    " text-yellow-300 text-base mb-0"
                  }
                >
                  {services && services.subTitleSection1}
                </p>
                <h1
                  className={
                    styles.title +
                    " text-gray-800 dark:text-gray-100 text-2xl leading-none"
                  }
                >
                  {services && services.titleSection1}
                </h1>
              </div>
              <p
                className={
                  styles.ekipText +
                  " md:hidden xl:block text-center text-gray-800 dark:text-gray-100 mt-8"
                }
              >
                Chez{" "}
                <span className="font-semibold text-yellow-300">PME M</span>
                <span className="font-semibold">anageur</span>, nous partageons
                tous la même <span className="font-semibold ">passion</span>{" "}
                pour le numérique. Chacun d'entre nous a pour objectif non
                seulement de créer les meilleures{" "}
                <span className="font-semibold ">applications web</span>
                <span className="font-semibold"> et </span>
                <span className="font-semibold ">mobiles</span>, mais aussi de
                faire en sorte que nos clients sachent en tirer le meilleur
                parti. Nous sommes fiers des{" "}
                <span className="font-semibold ">connaissances </span>
                de nos collaborateurs, qui résultent en des{" "}
                <span className="font-semibold ">innovations</span> qui
                comptent.
              </p>
              <p
                className={
                  styles.ekipText +
                  " hidden md:block xl:hidden text-left text-gray-800 dark:text-gray-100 mt-8"
                }
              >
                Chez <span className="font-semibold ">PME M</span>
                <span className="font-semibold">anageur</span>, nous partageons
                tous la même <span className="font-semibold ">passion</span>{" "}
                pour le numérique. Chacun d'entre nous a pour objectif non
                seulement de créer les meilleures{" "}
                <span className="font-semibold ">applications web</span>
                <span className="font-semibold"> et </span>
                <span className="font-semibold ">mobiles</span>
              </p>
            </div>
            <div
              data-aos="zoom-in"
              data-aos-duration="600"
              className="w-2/4 hidden md:flex items-center justify-start"
            >
              <img src={coverServices} />
            </div>
          </div>
          <p
            className={
              styles.ekipText +
              " hidden md:block xl:hidden text-left text-gray-800 dark:text-gray-100 mt-0"
            }
          >
            Mais aussi de faire en sorte que nos clients sachent en tirer le
            meilleur parti. Nous sommes fiers des{" "}
            <span className="font-semibold ">connaissances </span>
            de nos collaborateurs, qui résultent en des{" "}
            <span className="font-semibold ">innovations</span> qui comptent.
          </p>
          <div
            data-aos="zoom-in-up"
            data-aos-duration="600"
            className="hidden lg:flex items-center justify-between w-full 2xl:w-3/4 m-auto pt-0"
          >
            {cards.map((card, i) => {
              return <Card key={i} user={card}></Card>;
            })}
          </div>
          <div className="glide lg:hidden my-12" ref={sliderCard}>
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
              className={
                "glide__track w-3/4 sm:w-2/4 mx-auto " +
                styles.glideTrackCard
              }
              data-glide-el="track"
            >
              <div className={"glide__slides " + styles.glide__slideCard}>
                {cards.map((item, index) => {
                  return <SlideCard key={index} user={item}></SlideCard>;
                })}
              </div>
            </div>
          </div>

          <h1
            className={
              styles.titleService +
              " font-extrabold text-center text-gray-800 dark:text-gray-50 text-4xl md:text-5xl lg:text-6xl tracking-tight mx-auto mb-6 mt-16"
            }
          >
            {services && services.titleFrTech}
          </h1>

          <div className=" w-2/5 xl:w-1/4 mx-auto justify-center flex-col relative shadow-lg">
            <div
              style={{ backgroundColor: "#001d6e" }}
              className=" w-full h-2 rounded-tr-md rounded-tl-md"
            ></div>
            <div
              style={{ backgroundColor: "#fff" }}
              className=" w-full h-2"
            ></div>
            <div
              style={{ backgroundColor: "#9b051a" }}
              className=" w-full h-2 rounded-br-md rounded-bl-md"
            ></div>

            <img
              src={pmeLogo}
              className="absolute translate-x-1/2 right-1/2 top-1/2 -translate-y-1/2 h-10 shadow-md rounded-full w-10"
            />
          </div>

          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => (
                <p
                  className="text-center lg:w-3/4 mx-auto my-8 text-xl xl:text-2xl text-gray-800 dark:text-gray-50"
                  {...props}
                />
              ),
            }}
          >
            {services && services.textFrTech}
          </ReactMarkdown>

          <div className=" pt-12 lg:pt-24 w-full px-8 sm:px-16 2xl:max-w-7xl 2xl:px-40 flex flex-col relative">
            <p
              data-aos="slide-left"
              className={
                "text-yellow-300 font-medium text-2xl sm:text-3xl text-left md:ml-8"
              }
            >
              Mais aussi
              <span className="text-gray-800 dark:text-gray-50 text-3xl sm:text-4xl font-extrabold ml-1">
                ,
              </span>
            </p>
            <h1
              data-aos="slide-left"
              data-aos-delay="100"
              className={
                styles.titleService +
                " md:w-2/3 xl:w-1/2 md:ml-6 font-extrabold text-left text-gray-800 dark:text-gray-50 text-3xl md:text-4xl lg:text-5xl tracking-tight"
              }
            >
              <span>une équipe originaire du </span>
              <span className={styles.pmeE}>S</span>
              <span className={styles.pmeE}>u</span>
              <span className={styles.pmeE}>d.</span>
            </h1>
            <p
              data-aos="fade-up"
              data-aos-duration="600"
              data-aos-delay="600"
              className="raleway text-left sm:mt-8 font-medium tracking-wide text-base text-gray-800 dark:text-gray-50 2xl:pr-44"
            >
              Venez nous rendre visite ! <span className="text-xl">👋</span>
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-duration="600"
            data-aos-delay="600"
            className=" py-6 flex justify-center relative h-32 w-4/5 m-auto"
          >
            <img
              src={mrs}
              className="absolute sm:w-full md:w-4/5 xl:w-3/5 -bottom-2 right-0 dark:hidden block"
            />
            <img
              src={mrs_white}
              className="absolute sm:w-full md:w-4/5 xl:w-3/5 -bottom-2 right-0 dark:block hidden "
            />
          </div>

          <div
            id="map"
            className="absolute -bottom-80 w-full left-0 flex justify-center"
          >
            <Map3d />
          </div>
        </div>
      </div>
    </>
  );
});

const SlideCard = forwardRef((props, ref) => {
  const { user } = props;

  return (
    <div className={styles.cardSlider + " shadow-md h-fit"}>
      <p
        className={
          styles.username +
          " mb-auto mt-20 text-gray-50 dark:text-gray-800  font-extrabold text-left pl-3 sm:pl-6"
        }
      >
        {user.name}
      </p>
      <img
        className="rounded-full z-10"
        src={process.env.REACT_APP_BACKEND_URL + user.img.data.attributes.url}
      />
      <div className={styles.aboutMe + " aboutMe p-3 sm:p-6"}>
        <h4 className="text-gray-800 dark:text-gray-50 font-extrabold mb-4">
          À propos
        </h4>
        <p className="text-gray-800 dark:text-gray-50 text-left raleway font-medium">
          {user.about}
        </p>
      </div>
      <div
        className={
          styles.cardInfo +
          " flex flex-col items-center justify-start w-full bg-gray-50 dark:bg-stone-900 p-3 sm:p-6"
        }
      >
        <div
          className={
            styles.cardInfoRow +
            " raleway text-gray-800 dark:text-gray-50 w-full flex items-center justify-start font-medium mb-1 sm:mb-2"
          }
        >
          <span
            className={
              styles.cardInfoRowIcon +
              " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
            }
          >
            <FontAwesomeIcon icon={faUser} />
          </span>
          {user.role}
        </div>
        <div
          className={
            styles.cardInfoRow +
            " raleway text-gray-800 dark:text-gray-50 w-full flex items-center justify-start font-medium my-1 sm:my-2"
          }
        >
          <span
            className={
              styles.cardInfoRowIcon +
              " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
            }
          >
            <FontAwesomeIcon icon={faPhone} />
          </span>
          {user.phone}
        </div>
        <div
          className={
            styles.cardInfoRow +
            " raleway text-gray-800 dark:text-gray-50 w-full flex items-center justify-start font-medium mt-1 mb-2 sm:mb-0 sm:mt-2"
          }
        >
          <span
            className={
              styles.cardInfoRowIcon +
              " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
            }
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          {user.email}
        </div>
        <div className="w-full flex items-center justify-center">
          <a
            target="blank"
            href={user.linkedin_link}
            className={
              styles.cardInfoRow}
          >
            <svg
              className="h-6 w-6 fill-yellow-400"
              viewBox="0 0 50 50"
            >
              <path
                fillRule="evenodd"
                d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                clipRule="evenodd"
              />
            </svg>

          </a>
        </div>
      </div>
    </div>
  );
});

const Card = (props) => {
  const { user } = props;

  if (user.type == "left") {
    return (
      <div
        className={
          styles.card +
          " " +
          styles.cardLeft +
          " cardLeft shadow-xl flex flex-col items-center justify-end mt-40"
        }
      >
        <img
          className={
            styles.pmeLogo + " z-10 absolute inset-x-1 rounded-full shadow-lg"
          }
          src={pmeLogo}
        />

        <p
          className={
            styles.username +
            " mb-auto mt-24 self-start text-gray-50 dark:text-gray-800 font-extrabold ml-6"
          }
        >
          {user.name}
        </p>
        <img
          className="rounded-full z-10"
          src={process.env.REACT_APP_BACKEND_URL + user.img.data.attributes.url}
        />
        <div className={styles.aboutMe + " aboutMe p-6"}>
          <h4 className="text-gray-800 dark:text-gray-50 font-extrabold text-left mb-4">
            À propos
          </h4>
          <p className="text-gray-800 dark:text-gray-50 text-left raleway font-medium">
            {user.about}
          </p>
        </div>
        <div
          className={
            styles.cardInfo +
            " flex flex-col items-center justify-start w-full bg-white dark:bg-stone-900 p-6"
          }
        >
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-50 w-full flex items-center justify-start font-medium mb-2"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
            {user.role}
          </div>
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-50 w-full flex items-center justify-start font-medium my-2"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faPhone} />
            </span>
            {user.phone}
          </div>
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-50 w-full flex items-center justify-start font-medium mt-2"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            {user.email}
          </div>
          <div className="w-full flex items-center justify-end absolute right-2">
            <a
              target="blank"
              href={user.linkedin_link}
              className={
                styles.cardInfoRow}
            >
              <svg
                className="h-6 w-6 fill-yellow-400"
                viewBox="0 0 50 50"
              >
                <path
                  fillRule="evenodd"
                  d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                  clipRule="evenodd"
                />
              </svg>

            </a>
          </div>
        </div>
      </div>
    );
  } else if (user.type == "center") {
    return (
      <div
        className={
          styles.card +
          " " +
          styles.cardCenter +
          " cardCenter dark:bg-stone-900 shadow-2xl flex flex-col items-center justify-end p-6 pb-4 z-10"
        }
      >
        <img
          src={pmeLogo}
          className={styles.logoCard + " rounded-full shadow-xl z-30 absolute"}
        />
        <p
          className={
            styles.username +
            " mb-auto mt-20 text-gray-800 dark:text-gray-100 shadow-md rounded-xl pb-5 pt-8 px-10 bg-white dark:bg-stone-900 font-extrabold z-20 absolute"
          }
        >
          {user.name}
        </p>
        <img
          className="z-10"
          src={process.env.REACT_APP_BACKEND_URL + user.img.data.attributes.url}
        />
        <div className={styles.aboutMe + " mb-10 z-10 "}>
          <h4 className="text-gray-800 dark:text-gray-100 font-extrabold text-center mx-auto mb-4 z-10">
            À propos
          </h4>
          <p className="text-gray-800 dark:text-gray-100 z-10	raleway font-medium">{user.about}</p>
        </div>
        <div
          className={
            styles.cardInfo + " flex flex-col items-center justify-start w-full"
          }
        >
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-100 w-full flex items-center justify-start mb-2 font-medium z-10"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
            {user.role}
          </div>
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-100 w-full flex items-center justify-start my-2 font-medium z-10"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faPhone} />
            </span>
            {user.phone}
          </div>
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-100 w-full flex items-center justify-start mt-2 font-medium z-10"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            {user.email}
          </div>
          <div className="w-full flex items-center justify-end absolute right-2">
            <a
              target="blank"
              href={user.linkedin_link}
              className={
                styles.cardInfoRow}
            >
              <svg
                className="h-6 w-6 fill-yellow-400"
                viewBox="0 0 50 50"
              >
                <path
                  fillRule="evenodd"
                  d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                  clipRule="evenodd"
                />
              </svg>

            </a>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={
          styles.card +
          " " +
          styles.cardRight +
          " cardRight shadow-xl flex flex-col items-center justify-end mt-40"
        }
      >
        <img
          className={
            styles.pmeLogo + " z-10 absolute inset-x-1 rounded-full shadow-lg"
          }
          src={pmeLogo}
        />
        <p
          className={
            styles.username +
            " mb-auto mt-24 self-end text-gray-50 dark:text-gray-800 font-extrabold text-right mr-6"
          }
        >
          {user.name}
        </p>
        <img
          className="rounded-full z-10"
          src={process.env.REACT_APP_BACKEND_URL + user.img.data.attributes.url}
        />
        <div className={styles.aboutMe + " aboutMe p-6"}>
          <h4 className="text-gray-800 dark:text-gray-50 font-extrabold text-center ml-auto mb-4">
            À propos
          </h4>
          <p className="text-gray-800 dark:text-gray-50 text-right raleway font-medium">
            {user.about}
          </p>
        </div>
        <div
          className={
            styles.cardInfo +
            " flex flex-col items-center justify-start w-full p-6 bg-white dark:bg-stone-900"
          }
        >
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-50 w-full flex items-center justify-start mb-2 font-medium"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faUser} />
            </span>
            {user.role}
          </div>
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-50 w-full flex items-center justify-start my-2 font-medium"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faPhone} />
            </span>
            {user.phone}
          </div>
          <div
            className={
              styles.cardInfoRow +
              " text-gray-800 raleway dark:text-gray-50 w-full flex items-center justify-start mt-2 font-medium"
            }
          >
            <span
              className={
                styles.cardInfoRowIcon +
                " text-gray-50 flex items-center justify-center shadow-sm rounded-md mr-2 sm:mr-8"
              }
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            {user.email}
          </div>
          <div className="w-full flex items-center justify-end absolute right-2">
            <a
              target="blank"
              href={user.linkedin_link}
              className={
                styles.cardInfoRow}
            >
              <svg
                className="h-6 w-6 fill-yellow-400"
                viewBox="0 0 50 50"
              >
                <path
                  fillRule="evenodd"
                  d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
                  clipRule="evenodd"
                />
              </svg>

            </a>
          </div>
        </div>
      </div>
    );
  }
};

AboutUsPage.propTypes = {};

AboutUsPage.defaultProps = {};

export default AboutUsPage;
