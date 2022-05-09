import { 
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
 } from "@ionic/react";
 import {
     Route,
     Redirect,
     Switch
 } from 'react-router-dom';

import Courses from "./Courses";
import AllGoals from "./AllGoals";
import CourseGoals from "./CourseGoals";

import { list, trophyOutline } from 'ionicons/icons';

import React from "react";

// This is a nested route. We got here via /courses and therefore all paths are nested therefrom.
const CourseTabs: React.FC = () => {
    return (
        <IonTabs>
          <IonRouterOutlet>
            <Redirect path='/courses' to='/courses/list' exact/>
            {/* Switch guarantees that only one Route will be active and that will be the first match */}
            <Switch>
                <Route path="/courses/list" exact>
                    <Courses />
                </Route>
                <Route path='/courses/all-goals' exact>
                    <AllGoals />
                </Route>
                <Route path="/courses/:courseId">
                    <CourseGoals />
                </Route>
            </Switch>
        </IonRouterOutlet>
        {/* TabBar goes below IonRouterOutlet yet within IonReactRouter */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="all-goals" href='/courses/all-goals'>
            <IonIcon icon={list}/>
            <IonLabel>All Goals</IonLabel>
          </IonTabButton>
          <IonTabButton tab="b" href='/courses/list'>
            <IonIcon icon={trophyOutline}/>
            <IonLabel>Courses</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    )
}

export default CourseTabs;