
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
  const [hideVilain, sethideVilain] = useState<boolean>(false);
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
    exp: random(10),
  });

  function updateHero(attrib: string, value: any){
    let h_stats = JSON.parse(JSON.stringify(hero));

    if (attrib === "life"){
      h_stats.life = value;
    } else if(attrib === "maxLife"){
      h_stats.maxLife = value;
    } else if(attrib === "atk"){
      h_stats.atk = value;
    } else if(attrib === "def"){
      h_stats.def = value;
    } else if(attrib === "coin"){
      h_stats.coin = value;
    } else if(attrib === "exp"){
      h_stats.exp = value;
    } else if(attrib === "name"){
      h_stats.name = value;
    }
    setHero(h_stats);
  }

  function updateVilain(attrib: string, value: any){
    let v_stats = JSON.parse(JSON.stringify(vilain));

    if (attrib === "life"){
      v_stats.life = value;
    } else if(attrib === "maxLife"){
      v_stats.maxLife = value;
    } else if(attrib === "atk"){
      v_stats.atk = value;
    } else if(attrib === "def"){
      v_stats.def = value;
    } else if(attrib === "coin"){
      v_stats.coin = value;
    } else if(attrib === "exp"){
      v_stats.exp = value;
    } else if(attrib === "name"){
      v_stats.name = value;
    }
    setVilain(v_stats);
  }

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

  function write(text: string) {
    if (textEvent.length > 3) {
      textEvent.splice(0, 1);
    }
    const newText = text;
    setTimeout(() => { //Start the timer
      setTextEvent([...textEvent, newText]); //After 0.450 second, set render to true
    }, 450);
  }

  function adventure (){
    const wichAdventure = random(10);

    if(wichAdventure<=4) {
      // Rien
      write("On a fait le tour, mais il ne s'est rien passer...");
    } else if (wichAdventure>4 && wichAdventure<8){
      // Ennemi apparait
      write("Oh non un bandit t'attaque !");
      sethideVilain(true);
    } else {
      // Gain exp
      winExp ();
    }
  }

  function winExp (){
    const gainExp = random(100);
    write("Hoho tu as aidée un passant, tu gagnes " + gainExp + "pts d'exp");

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
                  onIonChange={e => { updateHero('name', e.detail.value!) }}
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
            <IonCol className="border" hidden={!hideVilain}>
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
                <IonButton onClick={() => { updateHero('exp', 10) }}>Rest</IonButton>
              </IonRow>
            </IonCol>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Main;

