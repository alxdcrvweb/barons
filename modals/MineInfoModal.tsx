import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import {
  getRightCardTitle,
  getRightItemName,
} from "../components/Craft/handlers";
import { getResourceTickers } from "../components/MainPage/handlers";
import { CardStore } from "../stores/CardStore";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import { UserStore } from "../stores/UserStore";
import { capitalizeFirstLetter, playSound } from "../utils/utilities";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const MineInfoModal = observer(({ data, idx }: modalProps) => {
  const cardStore = useInjection(CardStore);
  const modalStore = useInjection(ModalStore);
  const [info, setInfo] = useState<any>(null);
  useEffect(() => {
    setInfo(cardStore.production.filter((el) => el.token == data.card._id)[0]);
  }, []);
  console.log(cardStore.production,info);
  const upgrade = () => {
    modalStore.showModal(ModalsEnum.Upgrade, {
      upgrade: () => {
        cardStore.upgradeCard(data.card._id);
      },
      card: data.card,
    });
  };

  return (
    <ModalContainer idx={idx}>
      <div
        className="swiper popup-stroke v-scrollbar"
        style={{ transform: "translateX(15px)" }}
      >
        <div className="swiper-wrapper" >
          <div className="dialog-content">
            <div className="dialog-card" style={{height:'350px'}}>
              <img src={data.link} className="dialog-card-img" />
              <div className="dialog-card-text">
                <h2 style={{ marginBottom: "20px" }}>
                  {getRightCardTitle(data.card.name)}
                </h2>
                <span>Level {data.card.level}</span><br/>
                <div className="grey">Quality {data.card.quality}</div>
                <div  className="ability grey">Production per hour</div>
                {info &&
                  Object.entries(info).map((el: any) => {
                    let diff = (el[1] / 100) * 7;
                    let min = el[1] - diff;
                    let max = el[1] + diff;
                    if (el[1] !== 0 && el[0] !== "token" && el[0] !== "wearOut")
                      return (
                        <div className="brown">
                          {getResourceTickers(capitalizeFirstLetter(el[0].toString()))}{" "}
                          {min.toFixed(1) +
                            "-" +
                            max.toFixed(1)}
                        </div>
                      );
                  })}
                
                <div className="ability grey">{(data.card.wearOut!==0 || info) && ('Wearout ' + (data.card.wearOut!==100 ? data.card.wearOut.toFixed(1) : 100))}
                  {info && " + " + info?.wearOut.toFixed(1) + "/h"}</div>
                {/* <div className="grey">
                  {data.card.wearOut}
                  {info && "+ " + info?.wearOut + "/h"}
                </div> */}
                <span style={{color:'#CC3300', display: data.card.wearOut!==100 ? 'none':'block'}}>Mining stopped, needs to repair!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
});
