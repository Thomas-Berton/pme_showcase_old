import React, { useState } from "react";
import toast from "react-hot-toast";
import { withTranslation } from "react-i18next";
import ReCAPTCHA from "react-google-recaptcha";
import createDOMPurify from "dompurify";

import api from "../../api";

import styles from "./Contact.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DOMPurify = createDOMPurify(window);

const Contact = () => {

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recaptchaRef, setRecaptchaRef] = useState("");

  const submitContactForm = async (e) => {
    e.preventDefault();

    if ((email || phone) && (subject || message) && recaptchaRef) {
      let req = await api.General.contact({
        data: {
          firstname,
          lastname,
          email,
          phone,
          subject,
          message,
        },
      });

      return req.status === 200
        ? toast.success("Demande envoyée avec succès")
        : toast.error("Erreur lors de l'envoi");
    } else {
      return toast.error("Veuilez renseigner tous les champs");
    }
  };

  const handleCaptach = (e, set) => {
    set(e);
  };

  const handleContactForm = (e, set) => {
    let value = e.target.value;
    set(DOMPurify.sanitize(value));
  };

  return (
    <main className={styles.Contact + " relative pb-40"}>

      {/* HEADER TITLES */}
      <div className=" pt-12 lg:pt-40 w-full px-8 sm:px-16 2xl:max-w-7xl 2xl:px-40 flex flex-col relative">

        <p
          data-aos="slide-left"
          className={
            "text-yellow-300 font-medium text-2xl sm:text-3xl text-left md:ml-8"
          }
        >
          Une Question
          <span className="text-gray-800 dark:text-gray-50 text-3xl sm:text-4xl font-extrabold ml-1">
            ?
          </span>
        </p>

        <h1
          data-aos="slide-left"
          data-aos-delay="100"
          className={
            styles.titleService +
            " md:ml-6 font-extrabold text-left text-gray-800 dark:text-gray-50 text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
          }
        >
          <span>Contactez N</span>
          <span className={styles.pmeE}>o</span>
          <span className={styles.pmeE}>u</span>
          <span className={styles.pmeE}>s.</span>
        </h1>
        <p
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="600"
          className="raleway text-left mt-2 sm:mt-8 font-medium tracking-wide text-base text-gray-800 dark:text-gray-50 2xl:pr-44"
        >
          Une idée ? Un projet ? Nous sommes à votre écoute, alors
          contactez-nous !
        </p>
      </div>

      <div className="w-full mt-20 px-8 md:px-4 lg:px-16 2xl:max-w-7xl 2xl:px-40 flex relative md:flex-row flex-col">

        {/* CONTACT INFO LIST */}
        <ul
          data-aos="zoom-in-left"
          data-aos-duration="600"
          className="relief w-full md:w-fit relative rounded-lg before:rounded-lg after:rounded-lg bg-transparent dark:bg-gray-800 pr-6 md:px-6 md:mr-8 lg:mr-12 overflow-visible z-40"
        >

          {/* ADRESSE */}
          <li className="flex items-start justify-end my-8 md:my-16 w-full sm:w-2/4 md:w-full">
            <div className="flex flex-col items-end justify-center flex-wrap">
              <h4 className="font-extrabold text-right text-gray-800 dark:text-gray-50 text-2xl md:text-3xl lg:text-4xl tracking-tight">
                Adre
                <span className=" border-b-4 border-yellow-400 ">s</span>
                <span className=" border-b-4 border-yellow-400 ">s</span>
                <span className=" border-b-4 border-yellow-400 ">e</span>
              </h4>
              <p className="w-full text-right mt-1 text-sm md:text-base md:mt-2 lg:mt-4 text-gray-800 raleway font-semibold tracking-wide dark:text-gray-50 md:whitespace-nowrap">
                88 Rue Grignan, 13006 Marseille
              </p>
            </div>
            <a
              target="_blank"
              href="https://www.google.com/maps?q=88+Rue+Grignan,+Marseille,+France"
              className={
                styles.contacticoncust +
                " contact-icon-cust ml-4 lg:h-24 md:w-16 lg:w-24 md:h-16 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center "
              }
            >
              <FontAwesomeIcon
                className="text-yellow-500 text-2xl lg:text-4xl"
                icon={["fad", "map-location-dot"]}
              />
            </a>
          </li>

          {/* EMAIL */}
          <li className="flex items-start justify-end my-8 md:my-16 w-full sm:w-2/4 md:w-full">
            <div className="flex flex-col items-end justify-center flex-wrap">
              <h4 className="font-extrabold text-right text-gray-800 dark:text-gray-50 text-2xl md:text-3xl lg:text-4xl tracking-tight">
                Em
                <span className=" border-b-4 border-yellow-400 ">a</span>
                <span className=" border-b-4 border-yellow-400 ">i</span>
                <span className=" border-b-4 border-yellow-400 ">l</span>
              </h4>
              <p className="w-full text-right mt-1 text-sm md:text-base md:mt-2 lg:mt-4 text-gray-800 raleway font-semibold tracking-wide dark:text-gray-50 md:whitespace-nowrap">
                contact@pmemanageur.com
              </p>
            </div>
            <a
              href="mailto:contact@pmemanageur.com"
              className={
                styles.contacticoncust +
                " ml-4 lg:h-24 md:w-16 lg:w-24 md:h-16 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center "
              }
            >
              <FontAwesomeIcon
                className="text-yellow-500 text-2xl lg:text-4xl"
                icon={["fad", "envelope"]}
              />
            </a>
          </li>

          {/* PHONE NUMBER */}
          <li className="flex items-start justify-end my-8 md:my-16 w-full sm:w-2/4 md:w-full">
            <div className="flex flex-col items-end justify-center flex-wrap">
              <h4 className="font-extrabold text-right text-gray-800 dark:text-gray-50 text-2xl md:text-3xl lg:text-4xl tracking-tight">
                Téléph
                <span className=" border-b-4 border-yellow-400 ">o</span>
                <span className=" border-b-4 border-yellow-400 ">n</span>
                <span className=" border-b-4 border-yellow-400 ">e</span>
              </h4>
              <p className="w-full text-right mt-1 text-sm md:text-base md:mt-2 lg:mt-4 text-gray-800 raleway font-semibold tracking-wide dark:text-gray-50 md:whitespace-nowrap">
                06 79 57 12 32
              </p>
            </div>
            <a
              href="tel:+33679571232"
              className={
                styles.contacticoncust +
                " ml-4 lg:h-24 md:w-16 lg:w-24 md:h-16 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center"
              }
            >
              <FontAwesomeIcon
                className="text-yellow-500 text-2xl lg:text-4xl"
                icon={["fad", "phone"]}
              />
            </a>
          </li>

          {/* SOCIAL NETWORK */}
          <li className="flex items-start justify-end my-8 md:my-16 w-full sm:w-2/4 md:w-full">
            <div className="flex flex-col items-end justify-center flex-wrap">
              <h4 className="font-extrabold text-right text-gray-800 dark:text-gray-50 text-2xl md:text-3xl lg:text-4xl tracking-tight">
                Soc
                <span className=" border-b-4 border-yellow-400 ">i</span>
                <span className=" border-b-4 border-yellow-400 ">a</span>
                <span className=" border-b-4 border-yellow-400 ">l</span>
              </h4>
              <div className="w-full mt-4 flex item-center justify-end">
                <a href="https://www.facebook.com/Pme-Manageur-102520708814364">
                  <svg className="fill-yellow-300 h-8 w-8" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/company/pmemanageur/">
                  <svg
                    className="ml-2 fill-yellow-300 h-8 w-8"
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
            <div className="ml-4 lg:h-24 md:w-16 lg:w-24 md:h-16 h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center ">
              <FontAwesomeIcon
                className="text-yellow-500 text-2xl lg:text-4xl"
                icon={["fad", "square-share-nodes"]}
              />
            </div>
          </li>
        </ul>

        {/* CONTACT FORM */}
        <form
          onSubmit={submitContactForm}
          data-aos="zoom-in-right"
          data-aos-duration="600"
          className="w-full md:w-2/3 flex flex-col items-center jusitfy-center"
        >
          <div className="w-full grid grid-cols-2 gap-x-6 lg:gap-x-12 gap-y-10 pt-12">

            {/* FIRSTNAME */}
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-semibold tracking-wide text-yellow-400 raleway ml-1"
                htmlFor="firstname"
              >
                Prénom
              </label>
              <input
                onChange={(e) => {
                  handleContactForm(e, setFirstname);
                }}
                value={firstname}
                className="w-full border-0 border-b-4 border-yellow-400  bg-yellow-100 focus:border-yellow-200 focus:ring-0"
                type="text"
                name="firstname"
              ></input>
            </div>

            {/* LASTNAME */}
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-semibold tracking-wide text-yellow-400 raleway ml-1"
                htmlFor="lastname"
              >
                Nom
              </label>
              <input
                onChange={(e) => {
                  handleContactForm(e, setLastname);
                }}
                value={lastname}
                className="w-full border-0 border-b-4 border-yellow-400  bg-yellow-100 focus:border-yellow-200 focus:ring-0"
                type="text"
                name="lastname"
              ></input>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-semibold tracking-wide text-yellow-400 raleway ml-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                onChange={(e) => {
                  handleContactForm(e, setEmail);
                }}
                value={email}
                className="w-full border-0 border-b-4 border-yellow-400  bg-yellow-100 focus:border-yellow-200 focus:ring-0"
                type="email"
                name="email"
              ></input>
            </div>

            {/* PHONE */}
            <div className="flex flex-col items-start justify-center">
              <label
                className="font-semibold tracking-wide text-yellow-400 raleway ml-1"
                htmlFor="phone"
              >
                Téléphone
              </label>
              <input
                onChange={(e) => {
                  handleContactForm(e, setPhone);
                }}
                value={phone}
                className="w-full border-0 border-b-4 border-yellow-400  bg-yellow-100 focus:border-yellow-200 focus:ring-0"
                type="text"
                name="phone"
              ></input>
            </div>

          </div>

          {/* TOPIC */}
          <div className="flex flex-col items-start justify-center w-full my-10">
            <label
              className="font-semibold tracking-wide text-yellow-400 raleway ml-1"
              htmlFor="subject"
            >
              Sujet
            </label>
            <input
              onChange={(e) => {
                handleContactForm(e, setSubject);
              }}
              value={subject}
              className="w-full border-0 border-b-4 border-yellow-400  bg-yellow-100 focus:border-yellow-200 focus:ring-0"
              type="text"
              name="subject"
            ></input>
          </div>

          {/* MESSAGE */}
          <div className="flex flex-col items-start justify-center w-full mb-10">
            <label
              className="font-semibold tracking-wide text-yellow-400 raleway ml-1"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              onChange={(e) => {
                handleContactForm(e, setMessage);
              }}
              value={message}
              className="w-full border-0 border-b-4 border-yellow-400  bg-yellow-100 focus:border-yellow-200 focus:ring-0 h-32"
              type="text"
              name="message"
            ></textarea>
          </div>

          {/* CAPTCHA */}
          <div className="ml-auto mb-10">
            <ReCAPTCHA
              sitekey="6LdgjQYdAAAAAEUZm8gj-hLJ3qT_u0WSbpS5geHp"
              onChange={(e) => {
                handleCaptach(e, setRecaptchaRef);
              }}
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="ml-auto py-6 text-gray-50 text-base  text-center leading-6 font-extrabold items-center shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400"
          >
            <FontAwesomeIcon className="mr-2" icon={["fad", "paper-plane"]} />
            Envoyer
          </button>

        </form>
      </div>
    </main>
  );
};

Contact.propTypes = {};

Contact.defaultProps = {};

export default withTranslation()(Contact);
