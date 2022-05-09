import React from "react";
import { 
  IonHeader, 
  IonContent, IonToolbar, 
  IonTitle, IonPage, IonButtons, IonBackButton, IonList, IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { useParams } from 'react-router-dom';
import { COURSE_DATA } from "./Courses";
import { create } from 'ionicons/icons';

const deleteGoalHandler = () => {
  console.log('delete');
};

const editGoalHandler = (e: React.MouseEvent) => {
  e.stopPropagation();
  console.log('edit')
};

const CourseGoals: React.FC = () => {
  const selectedCourseId = useParams<{courseId: string}>().courseId;
  const selectedCourse = COURSE_DATA.find(c => c.id === selectedCourseId);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{selectedCourse ? selectedCourse.title : 'No course found!'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        { selectedCourse && 
          <IonList>
            {selectedCourse.goals.map(goal => (
              <IonItem key={goal.id} lines='full' button onClick={deleteGoalHandler}>
                <IonLabel>{goal.text}</IonLabel>
                <IonButton fill='clear' color='dark' slot="end" onClick={editGoalHandler}>
                  <IonIcon slot="icon-only" icon={create}/>
                </IonButton>
              </IonItem>
            ))}
          </IonList>
}
      </IonContent>
    </IonPage>
  );
};

export default CourseGoals;
