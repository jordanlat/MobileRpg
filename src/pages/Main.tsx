
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
  const [hideAtkMenu, sethideAtkMenu] = useState<boolean>(false);
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

  function updateHero(attrib: string, value: any) {
    let h_stats = JSON.parse(JSON.stringify(hero));

    if (attrib === "life") {
      h_stats.life = value;
    } else if (attrib === "maxLife") {
      h_stats.maxLife = value;
    } else if (attrib === "atk") {
      h_stats.atk = value;
    } else if (attrib === "def") {
      h_stats.def = value;
    } else if (attrib === "coin") {
      h_stats.coin = value;
    } else if (attrib === "exp") {
      h_stats.exp = value;
    } else if (attrib === "name") {
      h_stats.name = value;
    }
    setHero(h_stats);
  }

  function updateVilain(attrib: string, value: any) {
    let v_stats = JSON.parse(JSON.stringify(vilain));

    if (attrib === "life") {
      v_stats.life = value;
    } else if (attrib === "maxLife") {
      v_stats.maxLife = value;
    } else if (attrib === "atk") {
      v_stats.atk = value;
    } else if (attrib === "def") {
      v_stats.def = value;
    } else if (attrib === "coin") {
      v_stats.coin = value;
    } else if (attrib === "exp") {
      v_stats.exp = value;
    } else if (attrib === "name") {
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

  function adventure() {
    const wichAdventure = random(10);

    if (wichAdventure <= 4) {
      // Rien
      write("On a fait le tour, mais il ne s'est rien passer...");
    } else if (wichAdventure > 4 && wichAdventure < 8) {
      // Ennemi apparait
      vilainAttackYou();
    } else {
      // Gain exp
      winExp();
    }
  }

  function vilainAttackYou() {
    write("Oh non un bandit t'attaque !");
    sethideVilain(true);
    sethideAtkMenu(true);

  }

  function winExp() {
    const gainExp = random(100);
    write("Hoho tu as aidée un passant, tu gagnes " + gainExp + " pts d'exp");
    updateHero("exp", hero.exp + gainExp);
  }

function check_vil_life(life_lose: number){
  write(vilain.name + " a perdu " + life_lose + ' pts de vie.');
  if (life_lose > vilain.life) {
    // Si on bat le vilain
    updateVilain('life', 0);
    write("Tu a vaincu " + vilain.name + '.');
    write("Tu gagnes " + vilain.coin + " coins.");
    write("Et tu recupere " + vilain.exp + " exp");
    updateHero('coin', (hero.coin + vilain.coin));
    updateHero('coin', (hero.exp + vilain.exp));
  } else {
    updateVilain('life', life_lose);
  }
}

  function h_atk(type: string) {

    if (type === 'low') {
      const dice = random(5);
      if (dice < 4) {
        const atk_power = random(hero.atk);
        const lost_life = vilain.life - (atk_power - vilain.def);
        check_vil_life(lost_life);
      } else {
        check_vil_life(hero.atk);
      }

    } else if (type === 'high') {
      const dice = random(9);
      if (dice<7){
        write("Oh non tu as louper ton coup.");
      } else {
        const max_power = ((hero.atk+ (hero.atk/2)) * (random(5)));
        write("WOW quel coup !");
        check_vil_life(max_power);
      }
    }
  }

  function heal(perso: string) {
    if (perso === 'hero') {
      if (hero.life < hero.maxLife) {
        const heal_power = random(80);
        if ((hero.life + heal_power) >= hero.maxLife) {
          updateHero('life', hero.maxLife);
          write("Ouah tu as recuperer toute ta vie!");
        } else {
          updateHero('life', hero.maxLife);
          write("Tu recupere " + heal_power + " pts de vie.");
        }
      } else {
        write("Tu es deja max life hehe");
      }
    } else if (perso === 'vilain') {
      if (vilain.life < vilain.maxLife) {
        const heal_power = random(80);
        if ((vilain.life + heal_power) >= vilain.maxLife) {
          updateHero('life', vilain.maxLife);
          write("Oh non il a recuperer toute sa vie!");
        } else {
          updateHero('life', vilain.maxLife);
          write("Il a recupere " + heal_power + " pts de vie.");
        }
      } else {
        write("hehe il ce soigne pour rien....");
      }
    }
  }


  return (
    <IonPage className="margin">
      <IonHeader >
        <IonToolbar>
          <IonTitle>Jojo's Adventure 0.5</IonTitle>
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
              <IonRow className="border" hidden={hideAtkMenu}>
                <IonButton onClick={() => adventure()}>Adventure</IonButton>
                <IonButton onClick={() => { heal('hero') }}>Rest</IonButton>
              </IonRow>
              <div hidden={!hideAtkMenu} className="border">
                <IonRow>
                  <IonButton onClick={() => h_atk('low')}>Low attack</IonButton>
                  <IonButton onClick={() => h_atk('high')}>Super Attack</IonButton>
                </IonRow>
                <IonRow>
                  <IonButton onClick={() => heal('hero')}>Heal</IonButton>
                  <IonButton onClick={() => adventure()}>Escape</IonButton>
                </IonRow>
              </div>
            </IonCol>
          </IonGrid>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Main;

