import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from "../../modals";
// import { getRightImage } from "../../components/Craft/imageLinks";
import {
  CardStore,
  ITokenFromList,
  IWithdrawData,
} from "../../stores/CardStore";
import { ModalStore } from "../../stores/ModalStore";
import { UserStore } from "../../stores/UserStore";
import Web3Store from "../../stores/WalletStore";
import { playSound } from "../../utils/utilities";
import { getRightPlaceholder } from "../Craft/handlers";
import CardInfo from "./cardInfo";
import { getRightImage, getRightName } from "./handlers";
import LoadImage from "./LoadImage";

interface ICardsArrayProps {
  card: ITokenFromList;
  isStaked: boolean;
  craftedLink?: string;
  index: number;
}

const Card = observer(
  ({ card, isStaked, craftedLink, index }: ICardsArrayProps) => {
    const [staked, setStaked] = useState<boolean>(false);
    const [enter, setEnter] = useState<boolean>(false);
    const [noUpd, setNoUpd] = useState<boolean>(false);
    const [isAmulet, setIsAmulet] = useState<boolean>(false);
    const [enterInfo, setEnterInfo] = useState<boolean>(false);
    const cardStore = useInjection(CardStore);
    const userStore = useInjection(UserStore);
    const walletStore = useInjection(Web3Store);
    const modalStore = useInjection(ModalStore);
    // console.log(index);
    // if(card.tokenId) console.log(card)
    useEffect(() => {
      if (isStaked) {
        setStaked(true);
      }

      if (!craftedLink || card.level === 3) {
        setNoUpd(true);
      }
      if (card?.name?.includes("Amulet")) {
        // console.log('Amulet');
        setIsAmulet(true);
      }
    }, []);
    const withdraw = (e: any) => {
      e.stopPropagation();
      card.wearOut == 0
        ? modalStore.showModal(ModalsEnum.Withdraw, {
            stake:
             !card.tokenIdContract
                ? () => {
                    cardStore.getFile(getLink(), index).then((res?: File) => {
                      cardStore
                        .downloadToIpfs(index, res, card)
                        .then((res: any) => {
                          console.log('%ccard.tsx line:67 res', 'color: #007acc;', res);
                          if(res) {
                            cardStore
                            .withdrawFromGame(res, index, card._id)
                            .then((res: IWithdrawData) => {
                              cardStore.withdrawToWallet(
                                res,
                                index,
                                walletStore.user?.wallet,
                                card,
                                staked,
                              );
                            })
                          }
                          
                            
                        });
                    });
                  }
                : () => {
                    cardStore
                      .getInputSign(index, card.tokenIdContract)
                      .then((res: IWithdrawData) => {
                        cardStore.inputToGame(
                          res,
                          index,
                          walletStore.user?.wallet,
                          card.tokenIdContract,
                          card,
                          staked,
                        );
                      })
                  },
            staked: staked,
            card: card,
            name: getRightName(card.tokenId),
          })
        : toast.error(`You need to repair item before ${!staked?'stake':'unstake'}`, {
            theme: "dark",
          });
    };
    const upgrade = (e: any) => {
      e.stopPropagation();
      modalStore.showModal(ModalsEnum.Upgrade, {
        upgrade: () => {
          cardStore.upgradeCard(card._id);
        },
        card: card,
      });
    };
    // if(isAmulet)console.log(card)

    const stake = (e: any) => {
      // console.log(card);
      e.stopPropagation();
      modalStore.showModal(ModalsEnum.Stake, {
        stake: () => {
          cardStore.stakeCardToContract(
            staked,
            card,
            index,
            walletStore.user?.wallet,
            card.tokenId
          ).then(()=>{
            const wait = new Promise((res) => 
                setTimeout(() => {
                  res("p1")
                },2000
              ));
              wait.then(()=>{
                cardStore.compareTokens(walletStore.user?.wallet)
                cardStore.getWearout()
              })
          })
        },
        staked: staked,
        name: getRightName(card.tokenId),
      });
    };
    if(card.txIncome) {
      console.log(card);
    }
    const getLink = () => {
      return !craftedLink ? getRightImage(card.tokenId) : craftedLink;
    };
    const craftedStake = (e: any) => {
      e.stopPropagation();
      modalStore.showModal(ModalsEnum.StakeCraft, {
        stake: () => {
          cardStore
            .stakeCraftCard(staked, card, card._id)
            .then((res) => {
              if (res) {
                cardStore.getResources();
                cardStore.getWearout()
              }
            });
        },
        staked: staked,
        card: card,
      });
      // setStaked(staked==='add'?'remove':'add')
    };
    const onHover = () => {
      playSound(
        "assets/sounds/card_hover_effect.wav",
        userStore.volume,
        userStore.isClicked
      );
      setEnter(true);
    };
    return (
      <div
        className={`card ${card.txIncome||card.freezing ? "card-unabled" : ""}`}
        onMouseEnter={onHover}
        
        onMouseLeave={() => {
          setEnter(false);
          setEnterInfo(false);
        }}
        onClick={() => {
          card.type_craft === "nft"
            ? modalStore.showModal(ModalsEnum.MineInfo, {
                link: getLink(),
                staked: staked,
                card: card,
                noUpd: noUpd,
              })
            : card.type_craft === "amulets" ? modalStore.showModal(ModalsEnum.AmuletInfo, {
                link: getLink(),
                staked: staked,
                card: card,
                noUpd: noUpd,
              }) : card.type_craft === "troops" ?
              modalStore.showModal(ModalsEnum.TroopsInfo, {
                link: getLink(),
                staked: staked,
                card: card,
                noUpd: noUpd
              }) : console.log('object');
        }}
      >
         {card.txIncome ? (
          <p className="card-tx-income">
            <span>Sign the transaction</span>
          </p>
        ) :
        card.freezing && (
          <p className="card-tx-income" style={{top: '15%'}}>
            <span>Frozen until confirmed transaction</span>
          </p>
        )}
        <LoadImage
          src={getLink()}
          placeholder={getRightPlaceholder(card.name)}
        />
        {/* <div className="card-info-container">
          <img
            className={classNames(
              enter ? "card-info-img-entering" : "card-info-img"
            )}
            style={{display: !craftedLink || !isAmulet ? "none" :"block"  , opacity: enterInfo ? 0 : 1 }}
            onMouseEnter={() => {
              setEnterInfo(true);
            }}
            
            src="../../assets/images/info.png"
          />
       
        </div> */}
        
          {!card.tokenId && !staked&&  
          <a
            className="white-button flex-cc card__button"
            onClick={(e)=>{
              if 
              (card.tokenIdContract || (card.staked && !card.tokenId)) {
                withdraw(e)
              } 
              else {
                !craftedLink ? stake(e) : craftedStake(e)
              }
              
            }}
            style={{ opacity: enterInfo ? 0 : 1 }}
          >
            <span>{!staked? "stake" : "unstake"}</span>
          </a>
          }
          {card.tokenId && !staked && <a
            className="white-button flex-cc card__button"
            onClick={(e)=>{
              if 
              (card.tokenIdContract || (card.staked && !card.tokenId)) {
                withdraw(e)
              } 
              else {
                !craftedLink ? stake(e) : craftedStake(e)
              }
              
            }}
            style={{ opacity: enterInfo ? 0 : 1 }}
          >
            <span>stake</span>
          </a>
          }
          <a
            className="white-button flex-cc card__button"
            onClick={(e)=>{ 
              modalStore.showModal(ModalsEnum.OpenPack, {
                card: card
              })}}
            style={{ opacity: enterInfo ? 0 : 1, display:card.type_craft==='pack'?'flex':'none' }}
          >
            <span>{"open"}</span>
          </a>
        <a
          style={{
            display: staked && !noUpd ? "flex" : "none",
            opacity: enterInfo ? 0 : 1,
          }}
          className="yellow-button flex-cc card__upgrade-button"
          onClick={upgrade}
        >
          <span>upgrade</span>
        </a>
        
        <CardInfo card={card} enterInfo={enterInfo} />
      </div>
    );
  }
);
export default Card;
