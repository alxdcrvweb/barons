import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import { CardStore } from "../stores/CardStore";
import Web3Store from "../stores/WalletStore";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const ReferralModal = observer(({ data, idx }: modalProps) => {
  const walletStore = useInjection(Web3Store);
  const cardStore = useInjection(CardStore);
  const [host, setHost] = useState("");
  useEffect(() => {
    if (walletStore.user.wallet) {
      // console.log("%cReferralPopup.tsx line:12 ho", "color: #007acc;", "ho");
      walletStore.getReferralLink();
    }
    // console.log('%cReferralPopup.tsx line:17 object', 'color: #007acc;', window.location);
    setHost(window.location.origin);
  }, []);
  useEffect(() => {
    cardStore.getCardsInfo();
    
  }, []);
  return (
    <ModalContainer heading="REFERRALS" idx={idx}>
      <div className="popup__box-content" style={{ marginLeft: "30px" }}>
        <div
          className="swiper popup-stroke v-scrollbar"
          style={{ transform: "translateX(30px)" }}
        >
          <div className="swiper-wrapper">
            <div className="dialog-content">
              <div
                className="dialog-content__text"
                style={{ marginLeft: "-45px" }}
              >
                <p>Referral Link: {host + "/invite/" + walletStore.code}</p>
                <div
                  className="dialog-invited"
                  style={{
                    overflowY:
                      walletStore?.invitedUsers?.length > 4
                        ? "scroll"
                        : "hidden",
                  }}
                >
                  Invited users:{" "}
                  {walletStore.invitedUsers &&
                  walletStore.invitedUsers.length !== 0
                    ? walletStore?.invitedUsers?.map((el, i) => {
                        return <p key={i}>{el.address}</p>;
                      })
                    : "0"}
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-scrollbar" />
        </div>

        <div className="popup__box-content">
          <div
            className="dialog-content__text"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a
              className="popup__box-reflink"
              target="_blank"
              href="https://wiki.minebarons.io/referral-program"
            >
              Referral program bonuses
            </a>
          </div>
        </div>
        <div className="popup__box-title" style={{ marginRight: "" }}>
          TOKENS
        </div>
        <div className="popup__box-content">
          <div className="dialog-content">
            <div
              className="dialog-content__text"
              style={{ marginLeft: "-30px" }}
            >
              {cardStore?.user?.mbmToken ? cardStore.user.mbmToken : 0} MBM
            </div>
            <div className="dialog-content__text dialog-button">
              <a
                className="texture-button texture-button--yellow flex-cc dialog-button-text"
                onClick={() => {
                  toast.info("Coming soon...", { theme: "dark" });
                }}
              >
                Claim
              </a>
            </div>
          </div>
        </div>
        <div className="popup__box-title" style={{ marginRight: "" }}>
          Prefarm Event
        </div>
        <div className="popup__box-content">
          <div className="dialog-content">
            {cardStore.stakedPointsList.map((el, i) => {
              // console.log(el);
              if (i < 5)
                return (
                  <div
                    className="dialog-content__text"
                    style={{ marginLeft: "-30px" }}
                    key={i}
                  >
                    {el.name} {el.count} /{" "}
                    {el.amountToken && el?.amountToken?.toFixed(0)}
                  </div>
                );
            })}
          </div>
        </div>
        <div className="popup__box-content">
          <div
            className="dialog-content__text"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <a
              className="popup__box-reflink"
              target="_blank"
              href="https://wiki.minebarons.io/prefarm-event"
            >
              Event conditions
            </a>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
});
