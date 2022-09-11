import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import GlobalLoader from "./components/GlobalLoader/GlobalLoader";
import Contact from "./pages/Contact/Contact";
import NotFound from "./pages/NotFound/NotFound";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import ServicesPage from "./pages/ServicesPage/ServicesPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import { library, config } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fat } from '@fortawesome/pro-thin-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'


library.add(fal)
library.add(fat)
library.add(far)
library.add(fas)
library.add(fad)

function App() {
  return (
    <>
      <GlobalLoader />
      <div className="App">
        <ScrollToTop />
        <Layout>
          <Switch>
            <Route path="/contact" exact>
              <Contact />
            </Route>
            <Route path="/equipe" exact>
              <AboutUsPage />
            </Route>
            <Route path="/services" exact>
              <ServicesPage />
            </Route>
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="*" exact>
              <NotFound />
            </Route>
          </Switch>
        </Layout>
      </div>
    </>

  );
}

export default App;
