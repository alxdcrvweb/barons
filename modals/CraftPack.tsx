import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import { getPackName, getRightItemName } from "../components/Craft/handlers";
import { getResourceTickers } from "../components/MainPage/handlers";
import { CardStore } from "../stores/CardStore";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import { UserStore } from "../stores/UserStore";
import Web3Store from "../stores/WalletStore";
import { capitalizeFirstLetter, playSound } from "../utils/utilities";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const CraftPackModal = observer(({ data, idx }: modalProps) => {
  const walletStore = useInjection(Web3Store);
  const cardStore = useInjection(CardStore);
  const craftStore = useInjection(CraftStore);
  const modalStore = useInjection(ModalStore);
  console.log(data.isMp);
  const craftPackMp = () => {
    modalStore.hideAllModals();
    walletStore
      .getPrice(getPackName(data.currentCraft), true)
      .then((price) => {
        craftStore
          .craftPackMp(
            data.currentCraft,
            price
          )
          .then((res) => {
            if (price) {
              walletStore
                .craftPackMpContract(
                  res,
                  price,
                  getPackName(data.currentCraft)
                )
                .then((res) => {
                   cardStore.getResources();
                });
            }
          });
      });
  };
  const craftPackWl = () => {
    console.log("Craft wl");
    modalStore.hideAllModals();
    walletStore.getPrice(getPackName(data.currentCraft), false)
    .then((price) => {
      if(price) {
       walletStore
        .craftPackWl(
          price,
          getPackName(data.currentCraft)
        )
        .then((res) => {
          if(res) {
            cardStore.getResources();
             toast.success("Successfully minted", { theme: "dark" }); 
           } else {
             toast.error("Confirm transaction", { theme: "dark" }); 
           }
        }); 
      }
      
    });
  };
  const craftPackMpToWl = () => {
    modalStore.hideAllModals();
    
        craftStore
          .craftPackMp(
            data.currentCraft,
            data.cost
          )
          .then((res) => {
            if (data.cost) {
              walletStore
                .craftPackMpToWl(
                  res,
                  data.cost,
                  getPackName(data.currentCraft)
                )
                .then((res) => {
                   cardStore.getResources();
                });
            }
          });
      }
  
  return (
    <ModalContainer heading="MINT PACK" idx={idx}>
      <div
        className="swiper popup-stroke v-scrollbar"
        style={{ transform: "translateX(15px)" }}
      >
        <div className="swiper-wrapper">
          <div className="dialog-content">
            <div className="dialog-content__text">
              <p>
                Are you sure that you want to mint{" "}
                <span>
                  {capitalizeFirstLetter(getRightItemName(data.currentCraft))}?
                </span>{" "}
                <br />
                You need to sign transaction In your wallet.
                <br />
                It will cost{" "}
                {Number(walletStore.convertFromWei(
                  (data.cost / 100) * (100 - data.discount)
                )).toFixed(0)}{" "}
                MATIC.
              </p>
            </div>
            <div className="dialog-content__buttons flex-cc">
              <a
                style={{ cursor: "pointer" }}
                onClick={() => {
                  data.type == "Mint pass" ? craftPackMp() :data.firstMintWithMintpass ? craftPackMpToWl() : craftPackWl();
                }}
                className="texture-button texture-button--green flex-cc"
              >
                YES
              </a>
              <a
                style={{ cursor: "pointer" }}
                onClick={() => modalStore.hideAllModals()}
                className="texture-button texture-button--red flex-cc"
              >
                NO
              </a>
            </div>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
});
