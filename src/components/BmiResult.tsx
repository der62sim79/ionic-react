import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonRow,
} from "@ionic/react";

const BmiResult: React.FC<{ calcResultUser: number ; color: string }> =
  (props) => {
    return (
      <IonRow>
        <IonCol>
          <IonCard className="ion-text-center">
            <IonCardHeader>
              <IonCardSubtitle>Online BMI-Rechner</IonCardSubtitle>
              <IonCardTitle color={props.color}>Dein BMI</IonCardTitle>
              <IonCardContent>
                <h2>{props.calcResultUser.toFixed(2)}</h2>
              </IonCardContent>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
    );
  };

export default BmiResult;
