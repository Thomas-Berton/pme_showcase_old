import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast from "react-hot-toast";
import createDOMPurify from "dompurify";
// import ReCAPTCHA from "react-google-recaptcha";

import api from "../../api";

import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ModalContextProvider } from '../../context/ModalContext'

const DOMPurify = createDOMPurify(window);

const fetchTopics = async () => {
  try {
    const res = await api.General.fetchTopics();
    const topicList = []
    if (res && res.data && res.data.data) {
      for (let tpc of req.data.data) {
        if (tpc.attributes && tpc.attributes.nom) topicList.push(tpc.attributes.nom)
      }
      return topicList
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};

const fetchJobTopics = async () => {
  try {
    const res = await api.General.fetchJobTopics();
    const topicList = []
    if (res && res.data && res.data.data) {
      for (let tpc of req.data.data) {
        if (tpc.attributes && tpc.attributes.nom) topicList.push(tpc.attributes.nom)
      }
      return topicList
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};



const LeadsGenModal = ({ children, props }) => {

  // form data related
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState("");
  const [recaptchaRef, setRecaptchaRef] = useState("");

  // animation related
  const [byeAnimate, setByeAnimate] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // topics related
  const [selectedTopics, setSelectedTopics] = useState(['pmemanageur'])
  const [baseTopic, setBaseTopic] = useState(['pmemanageur'])

  // modal types 
  const [type, setType] = useState('lead')
  const [topics, setTopics] = useState([])
  const [jobTopics, setJobTopics] = useState([])

  const modalRef = useRef();

  useOnClickOutside(modalRef, () => closeModal(), showModal);

  useEffect(async () => {
    const topcisRes = await fetchTopics();
    const topcisJobsRes = await fetchJobTopics()

    if (topcisRes) setTopics(topcisRes)
    if (topcisJobsRes) setJobTopics(topcisJobsRes)

  }, [])

  useEffect(() => {
    const baseTopic = returnTopic()
    setBaseTopic(baseTopic)
  }, [type, topics, jobTopics])

  const animateAndleave = () => {
    setByeAnimate(true)
    let timer1 = setTimeout(() => {
      closeModal()
      resetModal()
      clearTimeout(timer1);
    }, 500);
  }

  const openModal = useCallback((type) => {
    if (type && typeof type == 'string') {
      setType(type)
    }
    setShowModal(true)
  }, []);


  const resetModal = () => {
    setSelectedTopics(['pmemanageur'])
  }

  const submitContactForm = async (e) => {
    e.preventDefault();

    if (firstname && (email || phone) && checked) {
      const topics = selectedTopics.join(', ')
      let req = await api.General.contact({
        data: {
          firstname,
          lastname,
          email,
          phone,
          subject,
          message,
          topics,
          type
        },
      });

      if (req.status === 200) {
        animateAndleave()
        toast.success("Demande envoyée avec succès")
      } else toast.error("Erreur lors de l'envoi");
    } else {
      return toast.error("Veuilez renseigner tous les champs");
    }
  };

  const handleContactForm = (e, set) => {
    let value = e.target.value;
    set(DOMPurify.sanitize(value));
  };

  const closeModal = () => {
    setShowModal(false)
  }

  const toggleTopics = (topic) => {
    const topicIndex = selectedTopics.indexOf(topic)
    if (topicIndex == -1) {
      const newSelectedTopics = [...selectedTopics, topic]
      setSelectedTopics(newSelectedTopics)
    } else {
      const selectedTopicsCopy = [...selectedTopics]
      const newSelectedTopics = selectedTopicsCopy.filter(el => el != topic)
      setSelectedTopics(newSelectedTopics)
    }
  }

  const returnTopic = () => {
    let toReturn = type == 'jobs' ? jobTopics : topics
    toReturn = toReturn.sort(() => .5 - Math.random())
    return toReturn;
  }

  // const handleCaptach = (e, set) => {
  //   set(e);
  // };

  return (
    <ModalContextProvider openModal={openModal}>

      {showModal && <div
        style={{ zIndex: '1000' }}
        className="modal-main-c fixed left-0 right-0 bottom-0 top-0 justify-center items-center dark:bg-gray-100 bg-gray-900 !bg-opacity-40 "
      >
        <div
          className="relative flex-1 z-auto flex max-w-6xl mx-auto flex-col justify-center items-center h-full"
        >
          <div
            ref={modalRef}
            id="modal"
            data-aos="zoom-in"
            data-aos-duration="600"
            className={(byeAnimate ? " animate__animated animate__fadeOut " : " ") + " w-11/12 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-50 lg:w-7/12 h-auto animate__animated animate__zoomIn animate__faster bg-cover bg-lightColor dark:bg-blackColor shadow-lg relative z-30 flex overflow-auto pt-5 pr-11 pl-11 flex-col text-center rounded-3xl"}
          >
            <div
              className="absolute top-1 right-1 h-12 w-12 flex justify-center items-center cursor-pointer hover:scale-110"
              onClick={() => animateAndleave()}
            >
              <FontAwesomeIcon className="text-2xl font-extrabold text-red-500" icon={faTimes} />

            </div>

            <span
              className="text-5xl absolute top-3 left-3 animate__animated animate__wobble animate__delay_3s"
            ><span className="rotate-12">
                📋
              </span>
            </span>
            <div
              data-name="contact-us"
              className="relative"
              aria-label="contact-us"
            >
              <h2 className="text-3xl leading-10 mb-0 font-black mt-5">
                {type == 'lead' ? 'Demandez votre audit' : 'Laissez-nous vos coordonnées'}
              </h2>
              <div
                className="mb-4 text-textLight dark:text-textDark"
              >
                {type == 'lead' ? 'Trouvons ensemble la solution qui vous correspond 🔎' : 'Nous vous recontacterons au plus vite 🚀'}
              </div>
            </div>
            <form

              onSubmit={submitContactForm}

            >


              <div className="flex flex-col justify-around items-center my-4">


                {/* <!-- NAME  --> */}
                <div
                  className="flex flex-col lg:flex-row w-full mb-5"
                >
                  <div
                    className="font-semibold bold mb-2 text-left w-full lg:w-3/12 dark:text-textDark"
                  >
                    Nom <span className="text-pink-600">*</span>
                  </div>
                  <input
                    onChange={(e) => {
                      handleContactForm(e, setFirstname);
                    }}
                    type="text"
                    className="block py-2.5 pr-2 pl-4 focus:ring-2 !ring-yellow-400 !border-none text-gray-900  rounded-full w-full lg:w-9/12"
                    maxLength="256"
                    name="nom"
                    data-name="nom"
                    placeholder="PME Manageur"
                    id="email-4"
                    required=""
                    formcontrolname="name"
                  />
                </div>

                {/* <!-- BUSINESS TYPE --> */}
                {/* <div
                  className="flex flex-col lg:flex-row w-full mb-3"
                >
                  <div
                    className="font-semibold bold mt-15 mb-2 text-left w-full lg:w-3/12 dark:text-gray-900"
                  >
                    Type de business
                  </div>
                  <div className="w-full lg:w-9/12">
                    <select
                      id="job"
                      name="job"
                      data-name="job"
                      className="block py-2.5 pr-2 pl-4 border-solid border-gray-200 w-full border-2 rounded-full"
                    >
                      <option value >Sélectionner</option>
                      <option
                      >
                      </option>
                    </select>
                  </div>
                </div> */}


                {/* <!-- TELEPHONE NUMBER --> */}
                {/* <div
                  className="flex flex-col lg:flex-row w-full mb-3"

                >
                  <div
                    className="font-semibold bold mb-2 text-left w-full lg:w-3/12 dark:text-textDark"
                  >
                    Téléphone
                    <span className="text-pink-600 ml-1">*</span>
                  </div>
                  <div className="div-block-31 w-full lg:w-9/12">
                    <div
                      className="relative w-full rounded-full overflow-hidden"
                    >
                      <input
                        type="text"
                        className="block text-gray-900 py-2.5 pr-2 pl-4 border-solid border-gray-200 w-full border-2 rounded-full"
                        maxLength="256"
                        name="phone"
                        data-name="phone"
                        placeholder="+33 6 00 00 00 00"
                        id="contactus-phone"
                        required=""
                        autoComplete="off"
                        data-intl-tel-input-id="0"
                        formcontrolname="phone"
                        onChange={(e) => {
                          handleContactForm(e, setPhone);
                        }}
                      />
                    </div>
                  </div>
                </div> */}

                {/* <!-- EMAIL --> */}
                <div
                  className="flex flex-col lg:flex-row w-full mb-5"
                >
                  <div
                    className="font-semibold bold mb-2 text-left w-full lg:w-3/12 dark:text-textDark"
                  >
                    Email <span className="text-pink-600">*</span>
                  </div>
                  <input
                    type="email"
                    className="block py-2.5 pr-2 pl-4 text-gray-900 focus:ring-2 !ring-yellow-400  !border-none  rounded-full w-full lg:w-9/12"
                    maxLength="256"
                    name="email"
                    data-name="email"
                    placeholder="contact@pmemanageur.com"
                    id="email-5"
                    required=""
                    formcontrolname="email"

                    onChange={(e) => {
                      handleContactForm(e, setEmail);
                    }}

                  />
                </div>

                {/* <!-- MESSAGES --> */}
                <div
                  className="flex flex-col lg:flex-row w-full mb-5"
                >
                  <div
                    className="font-semibold bold mt-15 text-left w-full lg:w-3/12 dark:text-textDark"
                  >
                    Message
                  </div>
                  <textarea
                    placeholder="Optionnel"
                    maxLength="500"
                    id="message"
                    name="message"
                    data-name="message"
                    formcontrolname="message"
                    className="block py-2.5 pr-2 pl-4 text-gray-900 focus:ring-2 !ring-yellow-400 !border-none   rounded-2xl w-full lg:w-9/12"
                    onChange={(e) => {
                      handleContactForm(e, setMessage);
                    }}
                  ></textarea>
                </div>


                {/* TOPICS */}
                <div
                  className="flex flex-col lg:flex-row w-full mb-3"
                >
                  <div
                    className="font-semibold bold mt-15 mb-2 text-left w-full lg:w-3/12 dark:text-textDark"
                  >
                    A quel sujet ?
                  </div>

                  <div className='w-full flex flex-wrap justify-start space-x-2 items-start px-3 py-2'>
                    {baseTopic.map(el => <span key={el} onClick={() => toggleTopics(el)} className={(selectedTopics.indexOf(el) != -1 ? ' dark:text-white text-gray-900  font-bold opacity-100 scale-110 space-x-1 ' : '  dark:text-gray-300 text-gray-500  font-semibold opacity-50 scale-95') + ' text-sm cursor-pointer px-1.5 py-1 hover:scale-105'}><span className='font-extrabold text-yellow-500'>#</span>{el}</span>)}
                  </div>

                </div>


                {/* CHECKBOX */}
                <div
                  className="w-full my-3"
                >
                  <label
                    className="flex flex-row justify-center items-center mb-1 pl-5 font-bold"
                  >
                    <input
                      onChange={(e) => {
                        handleContactForm(e, setChecked);
                      }}
                      formcontrolname="check"
                      type="checkbox"
                      id="allow_care_contact"
                      name="allow_care_contact"
                      data-name="allow_care_contact"
                      required=""
                      className="w-checkbox-input !border-none checkbox-2 text-sm"
                    />
                    <span
                      className="ml-3 pt-0 text-textLight dark:text-textDark text-xs font-semibold cursor-pointer"
                    >J’accepte de me faire recontacter pour
                      finaliser ma demande <span className=" text-base text-pink-600">*</span>
                    </span>
                  </label>
                </div>

                <div
                  className="mt-4 mb-4 flex flex-col lg:flex-row justify-around items-center w-full"
                >
                  {/* <ReCAPTCHA
                    sitekey="6LdgjQYdAAAAAEUZm8gj-hLJ3qT_u0WSbpS5geHp"
                    onChange={(e) => {
                      handleCaptach(e, setRecaptchaRef);
                    }}
                  /> */}

                  <button
                    className="py-3 mt-4 lg:mt-0 px-8 hover:scale-110 text-lg font-bold text-gray-900 bg-yellow-500 rounded-full"
                  >
                    Envoyer

                    <FontAwesomeIcon className="text-lg font-bold ml-2 text-gray-900" icon={faPaperPlane}></FontAwesomeIcon>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>}
      {children}
    </ModalContextProvider>
  )

};

export default LeadsGenModal;


// Hook
function useOnClickOutside(ref, handler, showModal) {
  useEffect(
    () => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    },
    [ref, handler, showModal]
  );
}
