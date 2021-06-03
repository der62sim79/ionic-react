import React from 'react'
import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react'


// Icons bei React einfügen
import { calculatorOutline, refresh } from "ionicons/icons";



export const BmiControls:React.FC <{calcBMI: () => void; resetUserInput: () => void}> = (props) => {
    return (
        <IonRow>
            <IonCol className="ion-text-center">
              <IonButton onClick={props.calcBMI}>
                <IonIcon slot="end" icon={calculatorOutline} />
                BMI Berechnen
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-center">
              <IonButton onClick={props.resetUserInput} color="danger" fill="outline">
                <IonIcon slot="end" icon={refresh} />
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
    )
}
