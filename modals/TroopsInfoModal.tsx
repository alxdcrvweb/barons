import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import {
  getRightCardTitle,
  getRightItemName,
} from "../components/Craft/handlers";
import { CardStore } from "../stores/CardStore";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const TroopsInfoModal = observer(({ data, idx }: modalProps) => {
  const cardStore = useInjection(CardStore);
  const craftStore = useInjection(CraftStore);
  const modalStore = useInjection(ModalStore);
  const [info, setInfo] = useState<any>(null);
  console.log(data);
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
                <h2 style={{ marginBottom: "20px" }}>
                  {getRightCardTitle(data.card.name)}
                </h2>
                <span>
                  Level {data.card.level}, Exp {0}, Battles {0}
                </span>
                <div className="ability brown">Attack {info?.atf}</div>
                <div className="brown">Defence {info?.def}</div>
                <div className="brown">Damage {info?.dmg}</div>
                <div className="brown">Health {info?.hp}</div>
                <div className="brown">Stamina {data.card?.stamina}</div>
                <div className="ability grey">
                  {info?.ability}{" "}
                  {!data.card?.name.includes("siege") && "attack bonus"}
                </div>
                <div className="grey">Supply -//-</div>
                <a
                  style={{
                    display: data.staked && !data.noUpd ? "flex" : "none",
                    cursor: "pointer",
                  }}
                  className="yellow-button flex-cc ability"
                  onClick={upgrade}
                >
                  <span>upgrade</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
});
