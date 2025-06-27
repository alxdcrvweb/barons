import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import Web3Store from "../stores/WalletStore";
import ModalContainer from "./ModalContainer";
import { useEffect, useState } from "react";
import { capitalizeFirstLetter } from "../utils/utilities";
import { getPackName } from "../components/Craft/handlers";
import { CardStore } from "../stores/CardStore";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const OpenPackModal = observer(({ data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  const cardStore = useInjection(CardStore);
  return (
    <ModalContainer heading={"OPEN PACK"} idx={idx}>
      <div className="dialog-content">
        <div className="dialog-content__text">
          <p>
            Are you sure that you want to open{" "}
            <span>
              {data.card.title}?
            </span>
            <br />
            {/* {stakeCost!==0 && `It will cost ${stakeCost} MBG.`} */}
          </p>
        </div>
        <div className="dialog-content__buttons flex-cc">
          {console.log('%cOpenPack.tsx line:35 data.card.name', 'color: #007acc;', data.card.name)}
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              cardStore.openPack(getPackName(data.card.name)).then((res)=>{
                
                modalStore.showModal(ModalsEnum.OpenResult, { card: data.card, data:res });
              })
              
              modalStore.hideModal(idx);
            }}
            className="texture-button texture-button--green flex-cc"
          >
            OPEN
          </a>
          <a
            style={{ cursor: "pointer" }}
            onClick={() => modalStore.hideModal(idx)}
            //    onClick={()=>set(false)}
            className="texture-button texture-button--red flex-cc"
          >
            CANCEL
          </a>
        </div>
      </div>
    </ModalContainer>
  );
});
