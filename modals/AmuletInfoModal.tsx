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

export const AmuletInfoModal = observer(({ data, idx }: modalProps) => {
  const cardStore = useInjection(CardStore);
  const craftStore = useInjection(CraftStore);
  const modalStore = useInjection(ModalStore);
  const [info, setInfo] = useState<any>(null);
  useEffect(() => {
    setInfo(
      craftStore.craftInfoAsObject[
        data.card?.name?.replace(/LvL1|LvL2|LvL3/g, "") +
          "LvL" +
          data.card.level
      ]
    );
  }, []);
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
        <div className="swiper-wrapper">
          <div className="dialog-content">
            <div className="dialog-card">
              <img src={data.link} className="dialog-card-img" />
              <div className="dialog-card-text">
                <h3 style={{maxWidth:'250px', marginBottom:'20px'}} >
                  {data.card?.name?.includes("red")
                    ? "Increase a chance to craft better NFT"
                    : "Reducing weather and depletion influence"}
                </h3>
                <div >
                  {data.card?.name?.includes("red") ? (
                    <div>
                      <div >
                        Quality {data.card.quality}
                      </div>
                      <div >
                        Chance{" "}
                        {data.card?.level == 1
                          ? "35%"
                          : data.card?.level == 2
                          ? "70%"
                          : "100%"}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {info &&
                        Object.entries(info).map((el: any, i: number) => {
                          if (!el[0].includes("craft") && el[1] !== 0) {
                            return (
                              <div key={i} className="brown">
                                {getResourceTickers(
                                  capitalizeFirstLetter(el[0])
                                )}{" "}
                                {el[1]}%
                              </div>
                            );
                          }
                        })}
                      <div className="ability grey">
                        Level {data.card.level}
                      </div>
                      <div className="grey">
                        Quality {data.card.quality}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
});
