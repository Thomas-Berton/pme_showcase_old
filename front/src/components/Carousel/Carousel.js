import React, { useState, useImperativeHandle, useEffect, useRef, forwardRef } from "react";

import styles from "./Carousel.module.scss";
import api from "../../api";

import Glide from "@glidejs/glide";
import "@glidejs/glide/dist/css/glide.core.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";


const fetchRealisations = async () => {
  try {
    const res = await api.General.fetchRealisations();
    let realisations = null;
    if (res && res.data) {
      realisations = res.data.data.attributes.items
      return realisations ? realisations : null
    } else return null;
  } catch (error) {
    console.error("Erreur : ", error)
    return null;
  }
};

export const Carousel = forwardRef(({ options }, ref) => {

  const sliderRef = useRef();
  const [sliderItems, setSlideritems] = useState([]);

  useImperativeHandle(ref, () => sliderRef.current);

  useEffect(async () => {
    const realisations = await fetchRealisations();
    setSlideritems(realisations)

    const tiltableElement = ".glide__container";
    const slider = new Glide(sliderRef.current, options);

    slider.mount({
      Coverflow: (Glide, Components, Events) => {

        const Plugin = {

          tilt() {
            const item = Components.Html.slides[slider.index];
            item.style.transform = "perspective(1500px) rotateY(0deg)";
            this.tiltPrevElements();
            this.tiltNextElements();
          },

          tiltPrevElements() {
            const activeSlide = Components.Html.slides[slider.index];
            const previousElements = [];

            const getPrevious = (element) => {
              const e = element.previousElementSibling;
              if (e) {
                previousElements.push(e.querySelector(tiltableElement));
                getPrevious(e);
              }
            };

            getPrevious(activeSlide);

            previousElements.forEach((item, index) => {
              item.style.transformOrigin = "100% 50%";
              item.style.transform = `perspective(1500px) rotateY(${20 * Math.max(index, 2)
                }deg)`;
            });
          },
          tiltNextElements() {
            const activeSlide = Components.Html.slides[slider.index];
            const nextElements = [];

            const getNext = (element) => {
              const e = element.nextElementSibling;
              if (e) {
                nextElements.push(e.querySelector(tiltableElement));
                getNext(e);
              }
            };
            getNext(activeSlide);

            nextElements.forEach((item, index) => {
              item.style.transformOrigin = "0% 50%";
              item.style.transform = `perspective(1500px) rotateY(${-20 * Math.max(index, 2)
                }deg)`;
            });
          },
        };

        Events.on(["mount.after", "run"], () => {
          Plugin.tilt(Components.Html.slides[slider.index]);
        });

        return Plugin;
      },
    });

    return () => slider.destroy();
  }, [options]);

  return (

    <div data-aos="flip-down" data-aos-duration="600" className={styles.container}>
      <div className="glide" ref={sliderRef}>

        {/* SLIDER ARROWS */}
        <div className="slider__arrows" data-glide-el="controls">
          <button data-glide-dir="<"
            className={styles.slider__arrow + " dark__arrow " + styles.slider__arrow__prev}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button data-glide-dir=">"
            className={styles.slider__arrow + " dark__arrow " + styles.slider__arrow__next}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>


        {/* SLIDER ITEMS */}
        <div
          className={"glide__track " + styles.glide__track}
          data-glide-el="track"
        >
          <ul className={"glide__slides " + styles.glide__slides}>
            {sliderItems.map((item, index) => <Slide key={index} children={item}></Slide>)}
          </ul>
        </div>

      </div>
    </div>
  );
});

export const Slide = forwardRef((item, ref) => {

  const { children } = item

  return (
    <li className={"glide__slide " + styles.glide__slide} ref={ref}>
      <div
        className={"glide__container box " + styles.glide__container + " " + styles.box}
      >
        <div
          className={"box__face box__faceFront " + styles.box__face + " " + styles.box__faceFront}
        >
          <img className={"boxCover " + styles.boxCover} src={process.env.REACT_APP_BACKEND_URL + children.cover.data.attributes.url} />
          <img className={"boxLogo " + styles.boxLogo} src={process.env.REACT_APP_BACKEND_URL + children.logo.data.attributes.url} />
          <div className={"boxSeeProject " + styles.boxSeeProject}>
            <a href={children.url} target="blank">
              <svg id="Layer_1" data-name="Layer 1" width="50" height="50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs></defs><title>eye-glyph</title><path fill="#3b4142" className="cls-1" d="M487.89,199.33C436.24,151.11,351.62,89.6,256,89.6S75.76,151.11,24.11,199.33c-32.15,30-32.15,83.32,0,113.33C75.76,360.89,160.38,422.4,256,422.4s180.24-61.51,231.89-109.73C520,282.65,520,229.35,487.89,199.33ZM256,371.2A115.2,115.2,0,1,1,371.2,256,115.2,115.2,0,0,1,256,371.2ZM320,256a64,64,0,1,1-64-64A64,64,0,0,1,320,256ZM243.2,38.4V12.8a12.8,12.8,0,1,1,25.6,0V38.4a12.8,12.8,0,1,1-25.6,0ZM93.35,60.25a12.8,12.8,0,0,1,18.1-18.1l25.6,25.6a12.8,12.8,0,1,1-18.1,18.1Zm294.4,25.6a12.8,12.8,0,0,1,0-18.1l25.6-25.6a12.8,12.8,0,0,1,18.1,18.1l-25.6,25.6a12.8,12.8,0,0,1-18.1,0ZM268.8,473.6v25.6a12.8,12.8,0,1,1-25.6,0V473.6a12.8,12.8,0,1,1,25.6,0ZM137.05,426.15a12.8,12.8,0,0,1,0,18.1l-25.6,25.6a12.8,12.8,0,0,1-18.1-18.1l25.6-25.6A12.8,12.8,0,0,1,137.05,426.15Zm294.4,25.6a12.8,12.8,0,1,1-18.1,18.1l-25.6-25.6a12.8,12.8,0,1,1,18.1-18.1Z" /></svg>
            </a>
          </div>
        </div>
        <div className={styles.box__face + " " + styles.box__faceRight}></div>
        <div className={styles.box__face + " " + styles.box__faceLeft}></div>
      </div>
    </li>
  );
});
