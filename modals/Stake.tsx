import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import { ModalStore } from "../stores/ModalStore";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const StakeModal = observer(({ data, idx }: modalProps) => {
  const modalStore = useInjection(ModalStore);
  return (
    <ModalContainer
      heading={!data.staked ? "STAKE NFT" : "UNSTAKE NFT"}
      idx={idx}
    >
      <div className="dialog-content">
        <div className="dialog-content__text">
          <p>
            You need to sign one or two transactions, giving permission to work
            with your NFT and confirm staking in your wallet.
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
