import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";
import { playSound } from "../../utils/utilities";
import { ITokenFromList } from "../../stores/CardStore";
import Card from "../MainPage/card";
import { getRightImage } from "../Craft/handlers";
import LandCard from "./card";
import { useEffect, useState } from "react";
import { LandsStore } from "../../stores/LandsStore";
interface ICards {
  cardsArray: ITokenFromList[]
  staked: boolean
}
const CardsLine = observer(
  ({ staked, cardsArray }: ICards) => {
    const landStore = useInjection(LandsStore)
    const [mainLand,setMainLand] = useState<string|undefined>("")
    useEffect(() => {
      if(landStore.isBaron) {
        setMainLand(landStore.currentLand?._id)
      } else {
        setMainLand(landStore.myLand?._id)
      }
    }, [landStore.isBaron, landStore.currentLand,landStore.myLand])
    return (

      <div className="war-content__kingdom-cards-line">
        <Swiper
          modules={[Navigation, Scrollbar, Mousewheel, Controller, FreeMode]}
          slidesPerView={6}
          spaceBetween={10}
          watchOverflow={true}
          mousewheel={{
            eventsTarget: staked ? ".war-cards-top-stake": ".war-cards-top-unstake",
          }}
          scrollbar={{
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            381: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            641: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            721: {
              slidesPerView: 6,
            },
          }}
          className={`swiper ${staked ? "war-cards-top-stake": "war-cards-top-unstake"} h-scrollbar`}
        >
          <div className="swiper-wrapper">
            {cardsArray && cardsArray.filter(el => (mainLand==el.earth && el.staked) || !el.staked || !el.earth).map((el, i) => {
              
              return (
                <SwiperSlide key={i} className="flex-cc">
                
                 <LandCard
                        card={el}
                        isStaked={staked}
                        craftedLink={
                          !el.tokenId && el.name && (el.quality || el.stamina)
                          //@ts-ignore
                            ? getRightImage(el.name, Math.ceil(el?.quality)?Math.ceil(el?.quality):el?.stamina, el.wearOut , el.level)
                            : undefined
                        }
                        index = {i}
                      />
                      
                </SwiperSlide>
              );
            })}
            {cardsArray.length < 6 &&
            Array.from({ length: 6 - cardsArray.filter(el => (mainLand==el.earth && el.staked) || !el.staked || !el.earth).length }).map((el, i)=>{
              return <SwiperSlide className="swiper-slide flex-cc" key={i}></SwiperSlide>
            })}
           
          </div>
          <div className="swiper-scrollbar" />
        </Swiper>
      </div>
    );
  }
);
export default CardsLine;
