import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
} from "@ionic/react";

import { list, options } from "ionicons/icons";

{
  /* IonMenu is the side drawer that sits outside of the tabs. */
}
{
  /* The contentId property tells the app which IonRouterOutlet should the menu be displayed within (by looknig for id property in the IonRouterOutlet) */
}

const SideDrawer: React.FC = () => {
  return (
    <IonMenu contentId="main">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Course Goals</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonMenuToggle>
            {/* The routerDirect prop determines which animation gets played (if any) when you navigate to the page */}
            <IonItem
              button
              routerLink="/courses/all-goals"
              routerDirection="none"
            >
              <IonIcon slot="start" icon={list}></IonIcon>
              <IonLabel>All Goals</IonLabel>
            </IonItem>
          </IonMenuToggle>
          <IonMenuToggle>
            <IonItem button routerLink="/filter" routerDirection="none">
              <IonIcon slot="start" icon={options}></IonIcon>
              <IonLabel>Filter</IonLabel>
            </IonItem>
          </IonMenuToggle>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default SideDrawer;
