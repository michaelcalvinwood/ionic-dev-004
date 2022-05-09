import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel } from "@ionic/react";
import { create, trash } from "ionicons/icons";
import React from "react";

const EditableGoal: React.FC<{
        slidingRef: React.Ref<HTMLIonItemSlidingElement>;
        onStartDelete: () => void;
        onStartEdit: (event: React.MouseEvent) => void;
        text: string;
    }> = props => {
    return (
        <IonItemSliding 
        ref={props.slidingRef}>
        <IonItemOptions side="start">
          <IonItemOption onClick={props.onStartDelete} color="danger">
            <IonIcon slot="icon-only" icon={trash} />
          </IonItemOption>
        </IonItemOptions>
        <IonItemOptions side="end">
          <IonItemOption onClick={props.onStartEdit}>
            <IonIcon slot="icon-only" icon={create} />
          </IonItemOption>
        </IonItemOptions>
        <IonItem lines="full">
          <IonLabel>{props.text}</IonLabel>
        </IonItem>
      </IonItemSliding>
    )
}

export default EditableGoal;