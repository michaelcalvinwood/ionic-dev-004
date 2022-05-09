import React from "react";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonMenu,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonMenuToggle,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";
import { list, options } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/theme.css";
import Filter from "./pages/Filter";
import CourseTabs from "./pages/CourseTabs";
import SideDrawer from "./pages/SideDrawer";
import CoursesContextProvider from "./data/CoursesContextProvider";

const App: React.FC = () => (
  <IonApp>
          <CoursesContextProvider>
    <IonReactRouter>
      <SideDrawer />
        <IonRouterOutlet id="main">
          <Route path="/filter" exact>
            <Filter />
          </Route>
          {/* The Tabs section will not show up on /filter but will show up on /courses */}
          <Route path="/courses/">
            <CourseTabs />
          </Route>
          {/* If the address path is exactly / then redirect to /courses/list */}
          <Redirect path="/" to="/courses/list" exact />
        </IonRouterOutlet>
    </IonReactRouter>
    </CoursesContextProvider>
  </IonApp>
);

export default App;
