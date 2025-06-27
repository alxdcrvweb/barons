import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Controller,
  FreeMode,
  Mousewheel,
  Navigation,
  Scrollbar,
} from "swiper";
import { CraftStore } from "../../stores/CraftStore";
import { capitalizeFirstLetter } from "../../utils/utilities";
import { getResourceTickers } from "../MainPage/handlers";
import AmuletCraftInfo from "./AmuletCraftInfo";
import {
  getLoot,
  getPackName,
  getPacksValue,
  getRightItemName,
  packsForSale,
} from "./handlers";
import ProducesCraftInfo from "./ProducesCraftInfo";
import RedAmuletCraftInfo from "./RedAmuletCraftInfo";
import TroopsCraftInfo from "./TroopsCraftInfo";
import { CardStore } from "../../stores/CardStore";
import Web3Store from "../../stores/WalletStore";

const PackCraftTable = observer(
  ({ currentType,allTokens, discount, price, whitelisted, publicSale }: {allTokens:number, currentType: string; whitelisted: boolean; discount: number, price:number, publicSale:boolean }) => {
    const walletStore = useInjection(Web3Store);
    const cardStore = useInjection(CardStore)
    console.log('%cpackCraftTable.tsx line:33 whitelisted, allTokens', 'color: #007acc;', whitelisted, allTokens);
    useEffect(()=>{
      if(currentType) {
        walletStore.getPackInfo(getPackName(currentType))
          
      }
    },[])
    console.log(allTokens);
    return (
      <div className="craft-content__info-stroke">
        <div className="craft-content__info-stroke-title">Mint</div>
        <div className="craft-content__info-stroke-subtitle">
        {currentType.replace('_', ' ')}{' '}{(cardStore?.user && cardStore.user[getPackName(currentType) as string]) || (currentType.includes('token') && allTokens>0) ? '/ MP round' : whitelisted ? '/ WL round' : '/ Public round'}
        </div>
        {console.log('%cpackCraftTable.tsx line:44 discount', 'color: #007acc;', discount)}
        <div className="craft-content__info-stroke-content">
          <Swiper
            className="swiper craft-stroke v-scrollbar"
            direction="vertical"
            slidesPerView="auto"
            freeMode={true}
            spaceBetween={10}
            watchOverflow={true}
            modules={[Navigation, Scrollbar, Mousewheel, Controller, FreeMode]}
            scrollbar={{
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true,
            }}
            mousewheel={true}
          >
            <div className="swiper-wrapper">
              <SwiperSlide
                className={`swiper-slide swiper-craft`}
                style={{
                  display: "flex",
                  // alignItems: "center",
                  height:'100%',
                  overflowY:'scroll'
                }}
              >
                <div className="craft-content__info-stroke-content-item">
                  <p >
                    <span>{'Contains ' +getLoot(currentType)}</span>
                  </p>
                 
                  <p className="small content-item-margin">
                    Mint price {' '}
                    {Number(walletStore.convertFromWei(Number(price))).toFixed(0)}{" "}
                    MATIC
                  </p>
                  
                    <p className="small">
                      Your discount {discount ? discount : 0}%, total price {" "}
                      {Number(walletStore.convertFromWei( discount && discount !== 0 ? Math.ceil((Number(price) / 100) * (100 - discount)) : Number(price))).toFixed(0)}{" "}
                      MATIC
                    </p>
                 
                  {(cardStore?.user && cardStore.user[getPackName(currentType) as string]) || (currentType.includes('token') && allTokens>0)  ? 
                  <>
                    <p className="small content-item-margin">
                      {!currentType.includes('token') && 'Remains to mint for your account in the MP round:' + ' ' + getPacksValue(currentType, cardStore.user)}
                    </p>
                    {!currentType.includes('token') ? <p className="small">
                       Minted already: {cardStore?.user && cardStore.user[getPackName(currentType)+'Buy'] ? cardStore.user[getPackName(currentType)+'Buy'] : 0 }
                    </p> : <></>}
                  </> : <></>}
                </div>
              </SwiperSlide>
              
            </div>
            <div className="swiper-scrollbar" />
          </Swiper>
        </div>
      </div>
    );
  }
);
export default PackCraftTable;
