
import React, { useState } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLifeCycleContext, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import nameList from '../components/listeMon';
import './Main.css';

let Vilain_name = nameList[random(498)];
let Hero_name = "toto";

function random(nbr: number) {
  return Math.floor(Math.random() * Math.floor(nbr));
}

const Main: React.FC = () => {
  // const [name, setName] = useState<string>();
  const [rdmName, setRdmName] = useState<string>();
  const [hideInput, sethideInput] = useState<boolean>(false);
  const [textEvent, setTextEvent] = useState(["Bonjour", "Commet allez vous ?"]);
  let hero_max_life = random(100);
  let vilain_max_life = random(100);
  const [hero, setHero] = useState({
    name: Hero_name,
    life: hero_max_life,
    maxLife: hero_max_life,
    atk: random(10),
    def: random(10),
    coin: random(10),
    exp: 0,
  });

  const [vilain, setVilain] = useState({
    name: Vilain_name,
    life: vilain_max_life,
    maxLife: vilain_max_life,
    atk: random(10),
    def: random(10),
    coin: random(10),
    exp: 0,
  });


  function test() {
    Vilain_name = nameList[random(498)];
    setVilain({
      name: Vilain_name,
      life: vilain.life,
      maxLife: vilain.maxLife,
      atk: vilain.atk,
      def: vilain.def,
      coin: vilain.coin,
      exp: vilain.exp
    });
    // console.log(nameList[random(498)]);
    console.log(hero);
  }



  function getName() {
    return hero.name;
  }

  function valideName() {
    //console.log(getName());
    sethideInput(true);
  }

  function setHeroName(inName: string) {
    Hero_name = inName;
    setHero({
      name: Hero_name,
      life: hero.life,
      maxLife: hero.maxLife,
      atk: hero.atk,
      def: hero.def,
      coin: hero.coin,
      exp: hero.exp
    });
    console.log("setHeroName: ", hero);
  }

  function write(text: string) {

    if (textEvent.length > 3) {
      textEvent.splice(0, 1);
    }
    const newText = text;
    setTextEvent([...textEvent, newText]);
  }

  return (
    <IonPage className="margin">
      <IonHeader >
        <IonToolbar>
          <IonTitle>Jojo's Adventure</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid hidden={hideInput}>
          <IonRow>
            <IonCol size="6" className="center-input">
              <IonItem className="border">
                <IonLabel position="floating">Enter nickname</IonLabel>
                <IonInput
                  onKeyPress={e => { if (e.key === 'Enter') { valideName() } }}
                  onIonChange={e => { setHeroName(e.detail.value!) }}
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonContent hidden={!hideInput}>
          <IonRow>
            <IonCol className="border">
              <IonLabel>Hero</IonLabel>
              <p>Name: {hero.name}</p>
              <p>Attack: {hero.atk}</p>
              <p>Defense: {hero.def}</p>
              <p>Coin: {hero.coin}</p>
              <p>Experience: {hero.exp}</p>

            </IonCol>
            <IonCol className="border">
              <IonLabel>Vilain</IonLabel>
              <p>Name: {vilain.name}</p>
              <p>Attack: {vilain.atk}</p>
              <p>Defense: {vilain.def}</p>
              <p>Coin: {vilain.coin}</p>
              <p>Experience: {vilain.exp}</p>
            </IonCol>
          </IonRow>
          <IonGrid>
            <IonList className="border">
              {textEvent.map((e, index) => {
                return (
                  <IonItem key={index}>{e}</IonItem>
                )
              })}
            </IonList>
          </IonGrid>
          <IonGrid hidden={!hideInput}>
            <IonCol>
              <IonRow className="border">
                <IonButton onClick={() => test()}>Adventure</IonButton>
                <IonButton onClick={() => { write("Coucou" + 5) }}>Rest</IonButton>
              </IonRow>
            </IonCol>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Main;

