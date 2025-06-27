import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState, useRef } from "react";
import { CardStore } from "../../stores/CardStore";
import { CraftStore } from "../../stores/CraftStore";
import { LandsStore } from "../../stores/LandsStore";
import { capitalizeFirstLetter } from "../../utils/utilities";
import { getResourceTickers } from "./handlers";

const CardInfo = observer(({ card, enterInfo, small }: any) => {
  const [info, setInfo] = useState<any>(null);
  const [font, setFont] = useState<number>(15);
  const cardStore = useInjection(CardStore);
  const craftStore = useInjection(CraftStore);
  const infoRef = useRef() as React.MutableRefObject<HTMLImageElement>;
  useEffect(() => {
    // if (card.type_craft =="nft") {
    //   setInfo(cardStore.production.filter(el => el.token == card._id)[0])
    // } else {
    //   if(card && craftStore.craftInfoAsObject[card?.name?.replace(/LvL1|LvL2|LvL3/g, "") + "LvL" + card.level]) {
    //     setInfo(
    //     craftStore.craftInfoAsObject[
    //       card?.name?.replace(/LvL1|LvL2|LvL3/g, "") + "LvL" + card.level
    //     ]
    //   )
    //   }
    //   ;
    // }
  }, [cardStore.production]);
  useEffect(()=>{
    let font = infoRef?.current?.offsetWidth/10
    if(font>12.8) {
      setFont(font)
    }
    

  },[infoRef?.current?.offsetWidth])
  return (
    <div
      className={classNames(
        "card",
        enterInfo ? "card-info-popup" : "card-info-popup-hidden"
      )}
      ref={infoRef}
    >
      {card?.type_craft == "nft" ? (
        <div className="card-info-col">
          <h3 className="card-info-title"style={{fontSize: font}}>Production </h3>
          <div className="card-info-resources"> 
          {info && Object.entries(info).map((el:any) =>{
            let diff = (el[1]/100)*7
            let min = el[1] - diff
            let max = el[1] + diff
            if(el[1]!==0 && el[0]!=="token" && el[0]!=='wearOut')
            
            return (
              <div className="card-info-row brown">
                {getResourceTickers(capitalizeFirstLetter(el[0].toString()))}{" "}
                { Number(min.toFixed(1)) + '-' + Number(max.toFixed(1))}
              </div>
            )
          })}
          
            <div className="card-info-row ability grey">Level {card.level}</div>
            <div className="card-info-row grey">Quality {card.quality}</div>
            <div className="card-info-row ability grey">Wearout </div>
            <div className="card-info-row grey">{card.wearOut} + {info?.wearOut + '/h'}</div>
          </div>
        </div>
      ) : card?.type_craft == "troops" ? (
        <div className="card-info-col">
          <h3 className="card-info-title" style={{fontSize: font, display: small? 'none' : 'block'}}>Characteristics </h3>
          <div className="card-info-resources"> 
            <div className="card-info-row brown">Attack {info?.atf}</div>
            <div className="card-info-row brown">Defence {info?.def}</div>
            <div className="card-info-row brown">Damage {info?.dmg}</div>
            <div className="card-info-row brown">Health {info?.hp}</div>
            <div className="card-info-row brown">Stamina {card?.stamina}</div>
            <div className="card-info-row ability grey">Level {card.level}</div>
            <div className="card-info-row grey">Exp 0</div>
            <div className="card-info-row ability grey">{info?.ability} {!card?.name.includes("siege") && 'attack bonus'}</div>
            <div className="card-info-row grey">Supply -//-</div>
          </div>
        </div>
      ) : (
        <div className="card-info-col">
          <h4  className="card-info-subtitle">
            {card?.name?.includes("red")
              ? "Increase a chance to craft better NFT"
              : "Reducing weather and depletion influence"}
          </h4>
          <div className="card-info-resources"> 
          {card?.name?.includes("red") ? (
            <div>
              <div className="card-info-row">Quality {card.quality}</div>
              <div className="card-info-row">
                Chance{" "}
                {card?.level == 1 ? "35%" : card?.level == 2 ? "70%" : "100%"}
              </div>
            </div>
          ) : (
            <div>
              {info && Object.entries(info).map((el:any, i:number)=>{
                if(!el[0].includes("craft")&&el[1]!==0) {
                  return <div key={i} className="card-info-row brown">{getResourceTickers(capitalizeFirstLetter(el[0])) } {el[1]}%</div>
                }
                
              })}
              <div className="card-info-row ability grey">Level {card.level}</div>
              <div className="card-info-row grey">Quality {card.quality}</div>
            </div>
          )}
        </div>
        </div>
      )}
    </div>
  );
});
export default CardInfo;
