import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


import french from "./public/locales/fr/translation.json";
import english from "./public/locales/en/translation.json";

// traductions
const resources = {
  fr: {
    translation: french,
  },
  en: {
    translation: english,
  },
};

i18n

  .use(LanguageDetector)

  .use(initReactI18next)

  .init({
    resources,
    lng: window.localStorage.getItem("i18n") || "fr",
    fallbackLng: "fr",
    debug: true,
    interpolation: {
      escapeValue: false
    },
  });

i18n.on("initialized", ({ lng }) => window.localStorage.setItem("i18n", lng));
i18n.on("languageChanged", (lng) => window.localStorage.setItem("i18n", lng));

export default i18n;
