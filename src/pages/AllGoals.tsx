import React, { useContext } from 'react';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import CoursesContext from '../data/course-context';

const AllGoals: React.FC = () => {
    // alertnative way of changing pages
    // const history = useHistory();

    // const changePageHandler = () => {
    //     history.push('/course-goals');
    // }

    const coursesCtx = useContext(CoursesContext);

    let goals: { id: string; text: string; courseTitle: string}[] = [];

    coursesCtx.courses
    .filter(course => course.included)
    .forEach(course => {
        for (let i = 0; i < course.goals.length; ++i) goals.push({id: course.goals[i].id, text: course.goals[i].text, courseTitle: course.title});
        return course.goals;
    });

    return (
        <IonPage>        
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot='start'>
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>
                        AllGoals
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {goals.map(goal => (
                        <IonItem key={goal.id}>
                            <IonLabel>
                            <h2>{goal.text}</h2>
                            <h3>{goal.courseTitle}</h3>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                {/* <IonButton routerLink='/course-goals'>To Course Goals</IonButton> */}
                {/* <IonButton onClick={changePageHandler}>To Course Goals</IonButton> */}
            </IonContent>
        </IonPage>

    )
}

export default AllGoals;