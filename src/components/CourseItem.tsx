import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from "@ionic/react";
import React from "react";

const CourseItem: React.FC<{
        title: string;
        enrollmentDate: Date;
        id: string;
    }> = props => {
    return (
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{props.title}</IonCardTitle>
          <IonCardSubtitle>
            Enrolled on{" "}
            {props.enrollmentDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </IonCardSubtitle>
        </IonCardHeader>
        <div className="ion-text-right">
          <IonButton
            fill="clear"
            color="primary"
            routerLink={`/courses/${props.id}`}
          >
            View Course Goals
          </IonButton>
        </div>
      </IonCard>
    )
}

export default CourseItem;