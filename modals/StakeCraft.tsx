import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { ModalsEnum } from ".";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import { capitalizeFirstLetter } from "../utils/utilities";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const StakeCraftModal = observer(({ data, idx }: modalProps) => {
  const [stakeCost, setStakeCost] = useState(0);
  const craftStore = useInjection(CraftStore);
  useEffect(() => {
    // console.log(craftStore.craftInfoAsObject[data.card.name+'LvL'+data.card.level]);
    if (data.card.type_craft === "nft" && !data.staked) {
      setStakeCost(
        craftStore.craftInfoAsObject[data.card.name + "LvL" + data.card.level]
          .stake_gold
      );
    } else if (data.card.type_craft === "nft" && !data.staked) {
      setStakeCost(
        craftStore.craftInfoAsObject[data.card.name + "LvL" + data.card.level]
          .unstake_gold
      );
    }
  }, []);
  const modalStore = useInjection(ModalStore);
  return (
    <ModalContainer
      heading={!data.staked ? "STAKE NFT" : "UNSTAKE NFT"}
      idx={idx}
    >
      <div className="dialog-content">
        <div className="dialog-content__text">
          <p>
            Are you sure that you want to {!data.staked ? "stake" : "unstake"}{" "}
            <span>
              {capitalizeFirstLetter(data.card.name)
                .replace("LvL1", "")
                .replace(" level 1", "")}
              ?
            </span>
            <br />
            {stakeCost !== 0 && `It will cost ${stakeCost} MBG.`}
          </p>
        </div>
        <div className="dialog-content__buttons flex-cc">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => {
              data.stake();
              modalStore.hideAllModals();
            }}
            className="texture-button texture-button--green flex-cc"
          >
            {!data.staked ? "STAKE" : "UNSTAKE"}
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
