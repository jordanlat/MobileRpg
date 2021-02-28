import { IonButton } from '@ionic/react';
import './MonBoutton.css';



const MonBoutton: React.FC = (props) => {
  console.log("props Bt: ", props)
  return (

      <IonButton className="size">Test</IonButton>
  );
};

export default MonBoutton;
