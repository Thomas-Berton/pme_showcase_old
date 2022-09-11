import React from "react";
import { Link } from "react-router-dom";
import { withTranslation } from "react-i18next";

const NotFound = () => (
  <div className="bg-transparent min-h-screen px-4 md:grid md:place-items-center lg:px-8 mt-40 md:-mt-20">
    <div className="max-w-max mx-auto">
      <p className="my-10 notfound font-extrabold text-yellow-400 text-8xl">
        404
      </p>
      <main className="flex items-center justify-center">
        <div>
          <div className="w-full">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight sm:text-5xl">
              Page non trouvée
            </h1>
            <p className="mt-3 text-base text-gray-500 raleway">
              Veuillez vérifier l'URL dans la barre d'adresse et réessayer.
            </p>
          </div>
          <div className="mt-10 flex items-center flex-wrap space-x-3 sm:border-transparent justify-center">
            <Link
              to="/"
              className=" py-6 my-4 text-gray-50 text-base  text-center leading-6 font-extrabold items-center shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400 mr-2"
            >
              Retour à l'accueil
            </Link>

            <Link
              to="/contact"
              className=" py-6 my-4 text-gray-50 text-base text-center leading-6 font-extrabold items-center shadow-xl sm:text-xl rounded-full cursor-pointer px-12 bg-gradient-to-r from-yellow-300 to-yellow-400 ml-2"
            >
              Contact
            </Link>
          </div>
        </div>
      </main>
    </div>
  </div>
);

export default withTranslation()(NotFound);
