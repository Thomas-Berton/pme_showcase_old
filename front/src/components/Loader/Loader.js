import React, { useEffect, useState } from "react";
import styles from "./Loader.module.scss";
import logo from "../../public/images/pme-logo.png";

const Loader = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
       setHidden(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={
        styles.Loader +
        " " +
        `${hidden === true ? styles.HideLoader + " z-50" : "z-50"}`
      }
    >
      <div className="relative flex justify-center align-center shadow-xl sm:overflow-hidden " style={{height : "100vh"}}

>
        <div className="absolute inset-0 h-screen">
     
          <div
            className="absolute inset-0 bg-yellow-400 mix-blend-multiply"
            data-aos="circle-reverse"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-easing="ease-in"
          />

          <img
            className={
              styles.Logo + " absolute h-32 w-auto shadow-md rounded-full z-50"
            }
            src={logo}
            alt="Logo PME Manageur"
          />
        </div>
      </div>

    </div>
  );
};

Loader.propTypes = {};

Loader.defaultProps = {};

export default Loader;
