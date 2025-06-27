import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Link from "next/link";
import Router,{ useRouter } from "next/router";
import { _ } from "numeral";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from "../../../modals";
import { CardStore } from "../../../stores/CardStore";
import { CraftStore } from "../../../stores/CraftStore";
import { LandsStore } from "../../../stores/LandsStore";
import { ModalStore } from "../../../stores/ModalStore";
import { UserStore } from "../../../stores/UserStore";
import Web3Store from "../../../stores/WalletStore";
import { CHAIN_ID } from "../../../utils/config/variables";
import { addressSlice, capitalizeFirstLetter, playSound } from "../../../utils/utilities";
import { res } from "../../Craft/handlers";
import { getResourceTickers } from "../../MainPage/handlers";

const Header = observer(() => {
  const [loadedProbably, setLoadedProbaby] = useState(false);
  const [hover, setHover] = useState("");
  const router = useRouter();
  const walletStore = useInjection(Web3Store);
  const landsStore = useInjection(LandsStore);
  const craftStore = useInjection(CraftStore);
  const userStore = useInjection(UserStore);
  const cardStore = useInjection(CardStore);
  const modalStore = useInjection(ModalStore);
  useEffect(() => {
    // const isExpired = localStorage.getItem("jwtTTL")
    //   ? Number(localStorage.getItem("jwtTTL")) - Date.now()
    //   : 0;

    // if (
    //   localStorage.getItem("jwt") &&
    //   !walletStore.signed &&
    //   isExpired > 0 &&
    //   !walletStore.loginFromButton
    // ) {
    //   walletStore.switchNetwork(CHAIN_ID).then(() => {
    //     walletStore.login("from header");
    //   });
    // }

    // if (!localStorage.getItem("jwt")) {
      
    //   router.push("../../");
    // }
    //plug
    // router.push("../../");
    // walletStore.resetWallet()
    if (localStorage.getItem("sound") === "false") {
      userStore.changeSound(false);
    }
    if (localStorage.getItem("refcode")) {
      walletStore.registerCode();
    }
    const script = document.createElement("script");
    // craftStore.tests()
    if (localStorage.getItem("jwt")) {
      // const script3 = document.createElement("script");
      script.src = "assets/libs/jquery/jquery-3.6.0.min.js";
      script.async = true;
      setTimeout(() => {
        setLoadedProbaby(true);
      }, 3000);
      document.body.appendChild(script);
    }
    landsStore.getAllLands().then (()=>{
      landsStore.getMyLand().then ((res)=>{
        console.log('%cheader.tsx line:74 res', 'color: #007acc;', res);
        if(res) {
          landsStore.getAllMyLands();
        }
      })
    
    })
    craftStore.getRepairCost()
    return () => {
      userStore.setSparkles(false);
      // clearTimeout(tt);
    };
  }, []);
  useEffect(() => {
    if (userStore.sparkles) {
      spark();
      // console.log("object");
    }
  }, [userStore.sparkles]);
  useEffect(() => {
    if (
      !cardStore.isGlobalLoaderActivated &&
      walletStore.user.wallet &&
      cardStore.tokens.length < 5 &&
      userStore.layout
    ) {
      cardStore.getTokenContractInfo(walletStore.user.wallet);
      console.log(userStore.layout, walletStore.user.wallet);
      
    }
    
  }, [walletStore.user.wallet]);
  useEffect(() => {
    if (typeof jQuery !== "undefined") {
      // console.log("JQuery is installed correctly!" );
      const script2 = document.createElement("script");
      script2.src = "assets/libs/sparkles/jquery-canvas-sparkles.js";
      script2.async = true;
      document.body.appendChild(script2);
      setTimeout(() => {
        userStore.setSparkles(true);
      }, 3000);
    }
  }, [loadedProbably]);
  useEffect(() => {
    if (localStorage.getItem("address")) {
      cardStore.getResources();
      cardStore.getForceMajor()
      craftStore.getCraftMaterials();
      let int = setInterval(()=>{
        cardStore.getResources();
        cardStore.getForceMajor()
        cardStore.getWearout()
        landsStore.getMyLand();
        landsStore.getAllMyLands()
        cardStore.getProduction()
      },60000)
      return ()=> clearInterval(int)
    }
    
  }, []);
  const onHover = (type: string) => {
    setHover(type);
    playSound(
      type === "Claim"
        ? "assets/sounds/nav_link_hover_effect.wav"
        : "assets/sounds/resource_hover_effect.wav",
      userStore.volume,
      userStore.isClicked
    );
    setTimeout(() => {
      setHover("");
    }, 500);
  };
  useEffect(() => {
    if (window?.ethereum) {
      window?.ethereum?.on("accountsChanged", function () {
        walletStore.resetWallet();
        Router.reload()
      });
    }
  }, []);
  // console.log($(".header__resource")?.sparkle);
  const spark = () => {
    //@ts-ignore
    if ($(".header__resource")?.sparkle) {
      //@ts-ignore
      $(".header__resource")?.sparkle({
        count: 20,
        color: ["#ff910f", "#ff910f", "#ff3c00"],
        minSize: 3,
        maxSize: 5,
        overlap: 5,
        direction: "both",
        speed: 2,
        fadeSpeed: 300,
        event: "hover",
      });

      $(".header__resource")?.mouseenter(function () {
        $(this).find(".sparkle-canvas").css("opacity", "1");
        setTimeout(() => {
          $(this).find(".sparkle-canvas").css("opacity", "0");
        }, 500);
      });

      //@ts-ignore
      $(".header__claim")?.sparkle({
        count: 20,
        color: ["#ff910f", "#ff910f", "#ff3c00"],
        minSize: 3,
        maxSize: 5,
        overlap: 5,
        direction: "both",
        speed: 1,
        fadeSpeed: 300,
        event: "none",
      });
    }
  };

  return (
    <div>
      <header className="header">
        <div className="header__content flex-sc">
          <div className="header__resources flex-sc">
            {cardStore.user &&
              Object.entries(cardStore.user).map((el, i) => {
                // console.log("%cheader.tsx line:76 el", "color: #007acc;", el);
                if (res(el[0]) !== "")
                  return (
                  <div key={i} className={`header__resource flex-sc ${ i.toString() === hover ? "hover" : ""}`} onMouseEnter={() => { onHover(i.toString()) }}
                    > {/*@ts-ignore*/}
                      <div className={classNames("header__resource-icon flex-cc", cardStore.forceMajor[`production_${el[0]}`] !== 0 && "low")}>
                        <img src={res(el[0])} alt="" />
                      </div>
                      <div className="header__resource-info">
                        <div className="header__resource-count">{Number(el[1]).toFixed(0)}</div>
                        <div className="header__resource-progress">
                          <span>
                             {/*@ts-ignore*/}
                            {landsStore?.myLand && landsStore?.myLand?.exhaustion[el[0]+'_exhaustion_percentage']?.toString().slice(0,1)}%
                            <div className="tooltip">
                              Depletion reduction for {getResourceTickers(capitalizeFirstLetter(el[0]))}
                            </div>
                          </span>
                          <span>
                            {/*@ts-ignore*/}
                            {landsStore?.myLand && landsStore?.myLand?.weather[el[0]]}%
                            <div className="tooltip">
                              Weather reduction for {getResourceTickers(capitalizeFirstLetter(el[0]))}
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
              }).reverse()}
          </div>
          <Link href={"/market"}>
            <a
              className="texture-button texture-button--yellow flex-cc header__claim"
              onMouseEnter={() => {
                onHover("Claim");
              }}
            >
              Claim
            </a>
          </Link>
          <div className="header__user flex-sc">
            <div className="header__user-info">
              <div className="header__user-info-status flex-sbs">
                <div className="header__user-info-kingdom">Kingdom {landsStore?.myLand?.number}</div>
                <div className="header__user-info-tax">Tax {landsStore?.myLand?.baron?.commission ? landsStore?.myLand?.baron?.commission : 0}%</div>
              </div>
              <div className="header__user-info-name">
                {addressSlice(walletStore.user.wallet)}
              </div>
              {/* <button><span>Disconnect</span></button> */}
            </div>
            <div className="header__user-avatar flex-cc">
              <a className="header__user-avatar-img">
                <img
                  style={{ cursor: "pointer" }}
                  src="assets/images/avatar.jpg"
                  onClick={() => {
                    modalStore.showModal(ModalsEnum.Referral);
                  }}
                  alt=""
                />
              </a>
              <a
                className="header__user-avatar-notice"
                style={{ cursor: "pointer" }}
              />
              <a
                style={{ cursor: "pointer" }}
                className="header__user-avatar-settings"
                onClick={() => {
                  modalStore.showModal(ModalsEnum.Settings);
                }}
                data-popup-open="settings"
              />
              <a
                style={{ cursor: "pointer" }}
                className="header__user-avatar-repair"
                onClick={() =>  {
                 
                    modalStore.showModal(ModalsEnum.Repair)
                  
                }}
                data-popup-open="settings"
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
});
export default Header;
