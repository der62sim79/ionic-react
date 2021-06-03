import React, { useRef, useState } from "react";
import {
  IonApp,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonTitle,
  IonToolbar,
  IonAlert,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { BmiControls } from "./components/BmiControls";
import BmiResult from "./components/BmiResult";

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number | string>();
  const [color ,setColor] = useState<string> ('');
  const [error, setError] = useState<string> ();

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    // Fragezeichen ist eine abkürtzung ob input null ist,  wenn der wert definitiv nicht null ist ! kann man es mit einem ausrufezeichen ersetzen
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeigt = heightInputRef.current!.value;
    
    // Eingabe Kontrolle und Warnung
    if (!enteredHeigt || !enteredWeight || +enteredHeigt <=0 || +enteredWeight <=0 ) {
      setError('Deine Eingabe ist unglütig bitte gib eine Zahl ein!');
      return;
    }

    //BMI RechenFormel
    const bmi = +enteredWeight / (+enteredHeigt * +enteredHeigt);

    setCalculatedBmi(bmi);

    //BMI Warnung an Benutzer
    if(bmi >20){
      setColor('danger')
    }
  };

  const resetInput = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    setCalculatedBmi('');
  };


  const clearError = () =>{
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
    setError('');
  };

  return (
    // React.Fragment erlaubt mehrere RootLevelElemente
    <React.Fragment>
    <IonAlert isOpen={!!error} message={error} header={'Eingabe Fehler'} buttons={[{text: 'OK', handler: clearError}]}/>
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI - Rechner</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Körpergröße in Meter</IonLabel>
                <IonInput type="number" ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Gewicht in Kg</IonLabel>
                <IonInput type="number" ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls calcBMI={calculateBMI} resetUserInput={resetInput} />
          {calculatedBmi && (
            <BmiResult color={color} calcResultUser={+calculatedBmi} />
          )}
        </IonGrid>
      </IonContent>
    </IonApp>
    </React.Fragment>
  );
};

export default App;
