
import React, { useState, useEffect } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonLifeCycleContext, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import nameList from '../components/listeNom';
import './Main.css';

let Vilain_name = nameList[random(498)];
let Hero_name = "toto";

function random(nbr: number) {
  return Math.floor(Math.random() * Math.floor(nbr));
}

const Main: React.FC = () => {
  const [hideInput, sethideInput] = useState<boolean>(false);
  const [textEvent, setTextEvent] = useState([
    "Bonjour ",
    "J'espere que vous allez bien!",
    "Moi je vais plutot bien :)",
    "Debutons cette nouvelle aventure !"
  ]);
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

  function valideName() {
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
    setTimeout(() => { //Start the timer
      setTextEvent([...textEvent, newText]); //After 1 second, set render to true
    }, 450);
  }

  function adventure (){
    const wichAdventure = random(10);

    if(wichAdventure<=4) {
      write("On a fait le tour, mais il ne s'est rien passer...");
    } else if (wichAdventure>4 && wichAdventure<8){
      write("Oh non un bandit t'attaque !");
    } else {
      write("Hoho tu as trouver des pieces d'or");
    }
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
              <IonLabel className="center">Hero</IonLabel>
              <p className="center">Name: {hero.name}</p>
              <p className="center">Life: {hero.life}/{hero.maxLife}</p>
              <p className="center">Attack: {hero.atk}</p>
              <p className="center">Defense: {hero.def}</p>
              <p className="center">Coin: {hero.coin}</p>
              <p className="center">Experience: {hero.exp}</p>

            </IonCol>
            <IonCol className="border">
              <IonLabel className="center">Vilain</IonLabel>
              <p className="center">Name: {vilain.name}</p>
              <p className="center">Life: {vilain.life}/{vilain.maxLife}</p>
              <p className="center">Attack: {vilain.atk}</p>
              <p className="center">Defense: {vilain.def}</p>
              <p className="center">Coin: {vilain.coin}</p>
              <p className="center">Experience: {vilain.exp}</p>
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
                <IonButton onClick={() => adventure()}>Adventure</IonButton>
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

