import React, { useState, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonButton,
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonButtons,
  IonMenuButton,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  isPlatform,
  IonIcon,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import AddCourseModal from "../components/AddCourseModal";
import { addOutline } from "ionicons/icons";
import CourseItem from "../components/CourseItem";
import CoursesContext from "../data/course-context";

export const COURSE_DATA = [
  {
    id: "C1",
    title: "My C1 Class",
    enrolled: new Date("03/22/19"),
    goals: [
      { id: "c1g1", text: "baladksld" },
      { id: "c1g2", text: "sakgeklsjdgj" },
    ],
  },
  {
    id: "C2",
    title: "My C2 Class",
    enrolled: new Date("03/22/19"),
    goals: [
      { id: "c2g1", text: "baladksld" },
      { id: "c2g2", text: "sakgeklsjdgj" },
    ],
  },
  {
    id: "C3",
    title: "My C3 Class",
    enrolled: new Date("03/22/19"),
    goals: [
      { id: "c3g1", text: "baladksld" },
      { id: "c3g2", text: "sakgeklsjdgj" },
    ],
  },
];


const Courses: React.FC = () => {
  const [isAdding, setIsAdding] = useState(false);

  const coursesCtx = useContext(CoursesContext);
  
  const startAddCourseHandler = () => {
    console.log('setIsAdding(true)');
    setIsAdding(true);
  }

  const cancelAddCourseHandler = () => {
    console.log('setIsAdding(false)');
    setIsAdding(false);
  }

  const courseAddHandler = (title: string, date: Date) => {
    console.log('Courses courseAddHandler', title, date);
    console.log(coursesCtx);
    coursesCtx.addCourse(title, date);
    setIsAdding(false);
  }
  
  return (
    <>
      <AddCourseModal show={isAdding} onCancel={cancelAddCourseHandler} onSave={courseAddHandler}/>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            {/* <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons> */}
            <IonTitle>Courses</IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddCourseHandler}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            {coursesCtx.courses.map((course) => (
              <IonRow key={course.id}>
                <IonCol size-md="4" offset-md="4">
                  <CourseItem 
                    title={course.title}
                    id={course.id}
                    enrollmentDate={course.enrolled}/>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddCourseHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default Courses;
