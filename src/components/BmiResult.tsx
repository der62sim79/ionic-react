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

const BmiResult: React.FC<{ calcResultUser: number ; color: string; bmiResultUserInfo: string}> =
  (props) => {
    return (
      <IonRow>
        <IonCol>
          <IonCard className="ion-text-center">
            <IonCardHeader>
              <IonCardSubtitle>Online BMI-Rechner</IonCardSubtitle>
              <IonCardTitle color={props.color}>{props.bmiResultUserInfo}</IonCardTitle>
              <IonCardContent>
                <h2>BMI {props.calcResultUser.toFixed(2)}</h2>
              </IonCardContent>
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
    );
  };

export default BmiResult;
