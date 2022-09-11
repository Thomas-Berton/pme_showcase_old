import React, { useState, useCallback, useMemo, useEffect } from "react";
import axios from "axios";
import logo from "../../public/images/pme-logo.png";
import styles from "./GlobalLoader.module.scss";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const ax = axios.create(); // a utiliser pour chaque requette créé en api

const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  const inc = useCallback(() => setCounter(counter => counter + 1), [
    setCounter
  ]); // +1 au nombre de requette en queue
  const dec = useCallback(() => setCounter(counter => counter - 1), [
    setCounter
  ]); // -1 au nombre de requette en queue

  const interceptors = useMemo(
    () => ({
      request: config => {
        inc();
        return config;
      },
      response: response => {
        dec();
        return response;
      },
      error: error => {
        dec();
        return Promise.reject(error);
      }
    }),
    [inc, dec]
  ); // init interceptors

  useEffect(() => {
    ax.interceptors.request.use(interceptors.request, interceptors.error);
    ax.interceptors.response.use(interceptors.response, interceptors.error);
    return () => {
      ax.interceptors.request.eject(interceptors.request);
      ax.interceptors.request.eject(interceptors.error);
      ax.interceptors.response.eject(interceptors.response);
      ax.interceptors.response.eject(interceptors.error);
    };
  }, [interceptors]);

  return [counter > 0];
};

const GlobalLoader = () => {

  const [loading] = useAxiosLoader();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setHidden(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      setHidden(false);
    }
  }, [loading]);


  return <div
    className={
      styles.Loader +
      " " +
      `${hidden ? styles.HideLoader : " "}`
    }
    style={{ zIndex: ' 100000 ' }}
  >
    <div className="relative flex justify-center align-center shadow-xl sm:overflow-hiddenbg-gray-900" style={{ height: "100vh" }}
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

  </div>;
};

export default GlobalLoader;