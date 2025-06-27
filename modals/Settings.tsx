import { useInjection } from "inversify-react";
import {observer} from "mobx-react";
import { ModalsEnum } from ".";
import { ModalStore } from "../stores/ModalStore";
import ModalContainer from "./ModalContainer";
import Router from "next/router";
import { UserStore } from "../stores/UserStore";
import Web3Store from "../stores/WalletStore";
interface modalProps {

    data?:any,
    idx:ModalsEnum
}

export const SettingsModal = observer(({data,idx}:modalProps) => {
    const modalStore = useInjection(ModalStore);
    const userStore = useInjection(UserStore);
    const walletStore = useInjection(Web3Store)
    const setSound = (sound: boolean) => {
      userStore.changeSound(sound);
    };
    return (
        <ModalContainer heading="SEttings"  idx={idx}>
            <div className="dialog-content">
                <div className="dialog-content__text">
                  <p>
                    Sound{" "}
                    <span
                      style={{
                        textDecoration: userStore.sound ? "underline" : "none",
                      }}
                    >
                      ON
                    </span>
                    /
                    <span
                      style={{
                        textDecoration: !userStore.sound ? "underline" : "none",
                      }}
                    >
                      OFF
                    </span>
                  </p>
                </div>
                <div className="dialog-content__buttons flex-cc">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => setSound(true)}
                    className="texture-button texture-button--green flex-cc"
                  >
                    ON
                  </a>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => setSound(false)}
                    className="texture-button texture-button--red flex-cc"
                  >
                    OFF
                  </a>
                </div>
                <div className="dialog-content__buttons flex-cc">
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      walletStore.resetWallet().then(() => {
                        Router.push("../../../");
                        modalStore.hideAllModals()
                      });
                    }}
                    className="texture-button texture-button--white flex-cc"
                  >
                    LOGOUT
                  </a>
                </div>
              </div>
        </ModalContainer>
    )
});

