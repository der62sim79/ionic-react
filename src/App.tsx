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
import InputControl from "./components/InputControl";

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number | string>();
  const [color ,setColor] = useState<string> ('');
  const [error, setError] = useState<string> ();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');
  const [userInfo, setUserInfo] = useState<string>('');

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

    const weightConversionFactor = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConverionFactor = calcUnits ===  'ftlbs' ? 3.28 : 1;

    const height = +enteredHeigt / heightConverionFactor;
    const weight = +enteredWeight / weightConversionFactor ;
    const bmi = weight / (height * height);

    setCalculatedBmi(bmi);

    //BMI Warnung an Benutzer
    if( calcUnits==='mkg' && bmi <=18.5 || calcUnits === 'ftlbs' && bmi <=21){
      setColor('danger');
      setUserInfo('Du bist untergewichtig!');
    }else if(calcUnits === 'mkg' && bmi >= 18.51 && bmi <=25 || calcUnits === 'ftlbs' && bmi >=21.01 && bmi <= 26){
      setColor('primary');
      setUserInfo('Du hast dein ideal Gewicht!');
    }else if( calcUnits === 'mkg' && bmi >=25.1 && bmi <= 30 || calcUnits === 'ftlbs' && bmi >=26.1 && bmi <= 31){
      setColor('warning');
      setUserInfo('Du hast leichten übergewicht!');
    }else if( calcUnits === 'mkg' && bmi >= 30.1 || calcUnits === 'ftlbs' && bmi >=30.1){
      setColor('danger');
      setUserInfo('Du bist übergewichtig!')
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

  const selectCalcUnitHandler = (selectedValueUser: 'mkg' | 'ftlbs') =>{
    setCalcUnits(selectedValueUser);
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
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
              <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">{calcUnits === 'mkg' ? 'Gib deine Körpergröße in Meter ein' : 'Gib deine Körpergröße in feet ein'}</IonLabel>
                <IonInput type="number" ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">{calcUnits === 'mkg' ? 'Gewicht in kg' : 'Gewicht in lbs'}</IonLabel>
                <IonInput type="number" ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls calcBMI={calculateBMI} resetUserInput={resetInput} />
          {calculatedBmi && (
            <BmiResult color={color} calcResultUser={+calculatedBmi} bmiResultUserInfo={userInfo} />
          )}
        </IonGrid>
      </IonContent>
    </IonApp>
    </React.Fragment>
  );
};

export default App;
