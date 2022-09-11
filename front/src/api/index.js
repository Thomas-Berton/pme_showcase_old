import toast from "react-hot-toast";
import { ax } from '../components/GlobalLoader/GlobalLoader'

//===============================================================================================================
// config header ================================================================================================
ax.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("tkn");
    const language = window.localStorage.getItem("i18n") || "en";

    if (token && !config.url.endsWith("refresh"))
      config.headers["Authorization"] = `Bearer ${token}`;
    if (language) config.headers["Accept-Language"] = `${language}`;

    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

//=====================================================================================================================
// config interceptors ================================================================================================
ax.interceptors.response.use(null, (err) => {
  if (err.message === "Network Error" && !err.response) {
    toast.error(`Network Error!`);
  }

  const { status, data } = err.response || {};

  if (status === 404) toast.error("Error Unknow endpoint..");

  if (status === 401 || status === 400) {
    window.localStorage.removeItem("tkn");
    // window.location.href = "/";
    // toast.info("Connexion expirée");
    return Promise.reject(err);
  }

  if (status === 500) toast.error(`500 ${data.errors}`);

  throw err.response;
});




//=====================================================================================================================
// Build API ================================================================================================

const General = {
  contact: (data) => ax.post("contacts", data),

  game: (data) => ax.post("games", data),

  fetchRealisations: () => ax.get("realisation?populate=items%2Citems.cover%2Citems.logo"),

  fetchTechnos: () => ax.get("home?populate=technos%2Ctechnos.img"),

  fetchSlider: () => ax.get("realisation?populate=items.logo"),

  fetchSteps: () => ax.get("home"),

  fetchServices: () => ax.get("service?populate=services.img"),

  fetchCards: () => ax.get("team?populate=cards%2Ccards.img"),

  fetchTopics: () => ax.get("topics"),

  fetchJobTopics: () => ax.get("job-topics"),

  fecthRecrutement: () => ax.get("recrutement"),
};


//Build export var
const routes = {
  General,
};

export default routes;
