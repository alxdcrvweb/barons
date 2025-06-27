import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ModalsEnum } from "../../modals";
// import { getRightImage } from "../../components/Craft/imageLinks";
import { CardStore, ITokenFromList } from "../../stores/CardStore";
import { CraftBuliding, CraftStore, CraftWar } from "../../stores/CraftStore";
import { LandsStore } from "../../stores/LandsStore";
import { ModalStore } from "../../stores/ModalStore";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/WalletStore";
import { playSound } from "../../utils/utilities";
import { getRightPlaceholder } from "../Craft/handlers";
import CardInfo from "../MainPage/cardInfo";
import { getRightImage, getRightName } from "../MainPage/handlers";
import LoadImage from "../MainPage/LoadImage";

interface ICardsArrayProps {
  card: ITokenFromList;
  isStaked: boolean;
  craftedLink?: string;
  index: number;
}

const LandCard = observer(
  ({ card, isStaked, craftedLink, index }: ICardsArrayProps) => {
    const [staked, setStaked] = useState<boolean>(false);
    const [noUpd, setNoUpd] = useState<boolean>(false);
    const [isAmulet, setIsAmulet] = useState<boolean>(false);
    const cardStore = useInjection(CardStore);
    const landStore = useInjection(LandsStore);
    const walletStore = useInjection(Web3Store);
    const modalStore = useInjection(ModalStore);

    useEffect(() => {

      if (isStaked) {
        setStaked(true);
        
      }
      console.log(craftedLink);
        if(card.level ===3) {
           console.log('Amulet');
          setNoUpd(true)
        }
        if(card?.name?.includes('Amulet')) {
          // console.log('Amulet');
          setIsAmulet(true)
        }
    }, []);


    
    const stake = () => {
      // console.log(card);

      modalStore.showModal(ModalsEnum.Stake, {
        stake: () => {
          cardStore.stakeCardToContract(
            staked,
            card,
            index,
            walletStore.user?.wallet,
            card.tokenId
          ).then(()=>{
            cardStore.getWearout()
          });
        },
        type: staked,
        name: getRightName(card.tokenId),
      });
    };
    const getLink = () => {
      console.log('%ccard.tsx line:76 craftedLink', 'color: #007acc;', craftedLink);
      return !craftedLink ? getRightImage(card.tokenId) : craftedLink;
    };
    const craftedStake = () => {

      modalStore.showModal(ModalsEnum.StakeCraft, {
        stake: () => {cardStore.stakeTroopCard(staked, card, card._id, landStore?.currentLand?._id ? landStore?.currentLand?._id : landStore?.myLand?._id).then((res)=>{
        if(res) {
            cardStore.getResources()
            cardStore.getWearout()
          }
        })
        },
        staked: staked,
        card: card,
      });
      // setStaked(staked==='add'?'remove':'add')
    };
    // const onHover = () => {
    //   playSound(
    //     "assets/sounds/card_hover_effect.wav",
    //     userStore.volume,
    //     userStore.isClicked
    //   );
    //   setEnter(true);
    // };
    console.log(card);
    return (
      <>
      <div
        className={`card ${card.txIncome ? "card-unabled" : ""}`}
        onClick={() => {
          console.log(getLink());
          modalStore.showModal(ModalsEnum.TroopsInfo, {
            link: getLink(),
            staked: staked,
            card: card,
            noUpd: noUpd
          })
        }}

      >
        {/* {console.log('%ccard.tsx line:41 card.image', 'color: #007acc;', card)} */}
        {card.txIncome && (
          <p className="card-tx-income">
            <span>Sign the transaction</span>
          </p>
        )}
        <LoadImage src={getLink()} placeholder={getRightPlaceholder(card.name)}/>     
      </div>
      {!card.txIncome && (
          <a
            className="white-button flex-cc"
            onClick={!craftedLink ? stake : craftedStake}
            // style={{ opacity: enterInfo ? 0 : 1 }}
          >
            <span>{!staked? "stake" : "unstake"}</span>
          </a>
        )}
        </>
    );
  }
);
export default LandCard;
