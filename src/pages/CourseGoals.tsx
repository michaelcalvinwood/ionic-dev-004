import React, { useState, useRef, useContext } from "react";
import {
  IonHeader,
  IonContent,
  IonToolbar,
  IonTitle,
  IonPage,
  IonButtons,
  IonBackButton,
  IonList,
  IonButton,
  IonIcon,
  IonFab,
  IonFabButton,
  isPlatform,
  IonAlert,
  IonToast,
} from "@ionic/react";
import { useParams } from "react-router-dom";
import { addOutline, create, trash } from "ionicons/icons";
import EditModal from "../components/EditModal";
import EditableGoal from "../components/EditableGoal";
import CoursesContext from '../data/course-context';

const CourseGoals: React.FC = () => {
  const [startedDeleting, setStartedDeleting] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(); // undefined is the default state

  const coursesCtx = useContext(CoursesContext);

  const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
  const selectedGoalIdRef = useRef<string | null>(null); // useRef can be used to store data that persists past reloads. Changes to data stored by ref do not cause an automatic reload.

  const selectedCourseId = useParams<{ courseId: string }>().courseId;
  const selectedCourse = coursesCtx.courses.find((c) => c.id === selectedCourseId);

  const startDeleteGoalHandler = (goalId: string) => {
    setToastMessage('');
    setStartedDeleting(true);
    selectedGoalIdRef.current = goalId; // store the current goalId in memory so that the confirmation modal can access it if the user confirms this choice
  };
  
  const deleteGoalHandler = () => {
    setStartedDeleting(false);
    coursesCtx.deleteGoal(selectedCourseId, selectedGoalIdRef.current!);
    setToastMessage('Deleted');
  }
  
  const startEditGoalHandler = (goalId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    slidingOptionsRef.current?.closeOpened(); // closes any opened descendant items
    const goal = selectedCourse?.goals.find(g => g.id === goalId);
    if (!goal) return;
    setIsEditing(true);
    setSelectedGoal(goal);
  };
  
  const startAddGoalHandler = () => {
    setIsEditing(true);
    setSelectedGoal(null);
  };

  const cancelEditGoalHandler = () => {
    setIsEditing(false);
    setSelectedGoal(null);
  }

  const saveGoalHandler = (text: string) => {
    if (selectedGoal) {
      coursesCtx.updateGoal(selectedCourseId, selectedGoal.id, text);
    } else {
      coursesCtx.addGoal(selectedCourseId, text);
    }
    coursesCtx.addGoal(selectedCourseId, text);
    setIsEditing(false);
  }
  return (
    <>
      {/* Remember TypeConversion: !! converts empty string to boolean false */}
      <EditModal
        show={isEditing} 
        onCancel={cancelEditGoalHandler}
        onSave={saveGoalHandler}
        editedGoal={selectedGoal}/>
      <IonToast 
        color="secondary"
        message={toastMessage}
        isOpen={!!toastMessage} 
        duration={2000} />
      <IonAlert 
        isOpen={startedDeleting} 
        header="Are you sure?" 
        message="Do you want to delete the goal. This cannot be undone." 
        buttons={[
          {text: 'No', role: 'cancel', handler: () => {setStartedDeleting(false)}},
          {text: 'Yes', handler: deleteGoalHandler}
          ]}/>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" />
            </IonButtons>
            <IonTitle>
              {selectedCourse ? selectedCourse.title : "No course found!"}
            </IonTitle>
            {!isPlatform("android") && (
              <IonButtons slot="end">
                <IonButton onClick={startAddGoalHandler}>
                  <IonIcon slot="icon-only" icon={addOutline} />
                </IonButton>
              </IonButtons>
            )}
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {selectedCourse && (
            <IonList>
              {selectedCourse.goals.map((goal) => (
                <EditableGoal 
                  key={goal.id}
                  slidingRef={slidingOptionsRef} 
                  text={goal.text}
                  onStartDelete={startDeleteGoalHandler.bind(null, goal.id)}
                  onStartEdit={startEditGoalHandler.bind(null, goal.id)}/>
              ))}
            </IonList>
          )}
          {isPlatform("android") && (
            <IonFab horizontal="end" vertical="bottom" slot="fixed">
              <IonFabButton color="secondary" onClick={startAddGoalHandler}>
                <IonIcon icon={addOutline} />
              </IonFabButton>
            </IonFab>
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default CourseGoals;
