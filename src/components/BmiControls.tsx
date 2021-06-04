import React from 'react'
import { IonButton, IonCol, IonIcon, IonRow } from '@ionic/react'


// Icons bei React einfügen
import { calculatorOutline, refresh } from "ionicons/icons";



export const BmiControls:React.FC <{calcBMI: () => void; resetUserInput: () => void}> = (props) => {
    return (
        <IonRow className="ion-margin-top">
            <IonCol size="12" sizeMd="6" className="ion-text-center">
              <IonButton size="large" expand="block" onClick={props.calcBMI}>
                <IonIcon slot="end" icon={calculatorOutline} />
                BMI Berechnen
              </IonButton>
            </IonCol>
            <IonCol size="12" sizeMd="6"  className="ion-text-center">
              <IonButton size="large" expand="block" onClick={props.resetUserInput} color="danger" fill="outline">
                <IonIcon slot="end" icon={refresh} />
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
    )
}
