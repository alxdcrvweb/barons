import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from "../../../modals";
import { CraftStore } from "../../../stores/CraftStore";
import { ModalStore } from "../../../stores/ModalStore";
import { UserStore } from "../../../stores/UserStore";
import { playSound } from "../../../utils/utilities";

const Footer = observer(() => {
  const userStore = useInjection(UserStore);
  const modalStore = useInjection(ModalStore);
  const craftStore = useInjection(CraftStore);
  const [active, setActive] = useState<string>("");
  const repair = () =>{

      modalStore.showModal(ModalsEnum.Repair)

  }
  const itemsArray = [
    {
      link: "/mine",
      title: "Mine",
      tooltip: "Stake, Mine & Upgrade",
      image: "assets/images/navigation/mine.png",
    },
    {
      link: "/craft",
      title: "Craft",
      tooltip: "Craft new NFT",
      image: "assets/images/navigation/craft.png",
    },
    {
      link: "/map",
      title: "Map",
      tooltip: "Land statistics",
      image: "assets/images/navigation/map.png",
    },
    {
      link: "/land",
      title: "Land",
      tooltip: "Land management",
      image: "assets/images/navigation/land.png",
    },
    {
      link: "/market",
      title: "Market",
      tooltip: "Claim, deposit & withdraw resources",
      image: "assets/images/navigation/market.png",
    },
    {
      link: "/chat",
      title: "Message",
      tooltip: "Chats & event logs",
      image: "assets/images/navigation/message.png",
    },
  ];
  const changeActive = (val: string) => {
    if (active === val) return setActive("");
    return setActive(val);
  };

  return (
    <section className="interface">
      <div
        className={`interface__group interface__group--left ${
          active === "left" ? "active" : ""
        }`}
      >
        <div className="interface__group-content">
          <div className="interface__group-content-buttons">
            <a
              href="https://opensea.io/collection/mine-barons-mint-pass"
              target="_blank"
              rel="noreferrer"
              className="wood-button flex-cc"
            >
              <span>Buy / sell nft</span>
            </a>
            <Link href="/market">
              <a className="wood-button flex-cc">
                <span>Buy / sell resourses</span>
              </a>
            </Link>
            <a
              style={{cursor:'pointer'}}
              className="wood-button flex-cc"
              onClick={repair}
            >
              <span>Repair all NFTs</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`interface__group interface__group--right ${
          active === "right" ? "active" : ""
        }`}
      >
        <div className="interface__group-content">
          <div className="interface__group-content-buttons">
            <a
              href="https://opensea.io/collection/mine-barons-mint-pass"
              target="_blank"
              rel="noreferrer"
              className="wood-button flex-cc"
            >
              <span>Buy / sell nft</span>
            </a>
            <Link href="/market">
              <a className="wood-button flex-cc">
                <span>Buy / sell resourses</span>
              </a>
            </Link>
            <a
              href="https://wiki.minebarons.io/"
              target="_blank"
              rel="noreferrer"
              className="wood-button flex-cc"
            >
              <span>Game wiki</span>
            </a>
          </div>
        </div>
      </div>
      <nav className="interface__nav">
        <div className="interface__nav-links flex-cc">
          <div
            className={`interface__nav-open-left-group ${
              active === "left" ? "active" : ""
            }`}
            onClick={() => changeActive("left")}
          />
          <div
            className={`interface__nav-open-right-group ${
              active === "right" ? "active" : ""
            }`}
            onClick={() => changeActive("right")}
          />
          {itemsArray.map((item, i) => {
            return (
              <Link href={item.link} key={item.title+i}>
                <a
                  className="interface__nav-link flex-cc"
                  onMouseEnter={() => playSound("assets/sounds/nav_link_hover_effect.wav", userStore.volume, userStore.isClicked)}
                >
                  <div className="interface__nav-link-content flex-cc">
                    <div className="interface__nav-link-icon">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="interface__nav-link-name">{item.title}</div>
                  </div>
                  <div className="tooltip">{item.tooltip}</div>
                </a>
              </Link>
            );
          })}
        </div>
      </nav>
    </section>
  );
});
export default Footer;
