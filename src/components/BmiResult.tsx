import React from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

import './BmiResult.css';

const BmiResult: React.FC<{ calcResultUser: number ; color: string; bmiResultUserInfo: string}> =
  (props) => {
    return (
      
          <IonCard className="ion-text-center" id="result">
            <IonCardHeader>
              <IonCardSubtitle>Online BMI-Rechner</IonCardSubtitle>
              <IonCardTitle color={props.color}>{props.bmiResultUserInfo}</IonCardTitle>
              <IonCardContent>
                <h2>BMI {props.calcResultUser.toFixed(2)}</h2>
              </IonCardContent>
            </IonCardHeader>
          </IonCard>
   
    );
  };

export default BmiResult;
