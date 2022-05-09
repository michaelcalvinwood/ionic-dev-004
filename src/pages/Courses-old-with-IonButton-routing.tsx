import React from 'react';
import { IonHeader, IonContent, IonToolbar, IonTitle, IonButton, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';

export const COURSE_DATA = [
    {
        id: 'C1',
        title: 'My C1 Class'
    },
    {
        id: 'C2',
        title: 'My C2 Class'
    },
    {
        id: 'C3',
        title: 'My C3 Class'
    }
];

const Courses: React.FC = () => {
    // alertnative way of changing pages
    // const history = useHistory();

    // const changePageHandler = () => {
    //     history.push('/course-goals');
    // }
    return (
        <IonPage>        
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Courses
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>Courses Page</h2>
                <IonButton routerLink='/course-goals'>To Course Goals</IonButton>
                {/* <IonButton onClick={changePageHandler}>To Course Goals</IonButton> */}
            </IonContent>
        </IonPage>

    )
}

export default Courses;