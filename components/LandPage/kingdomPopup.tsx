import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Controller, FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LandsStore } from "../../stores/LandsStore";
import { getResourceTickers } from "../MainPage/handlers";
import { ISetProps } from "./kingdom";
import { useEffect, useState } from "react";
import BuildType from "./buildType";
const KingdomPopup = observer(({ visible, set }: ISetProps) => {
  const landStore = useInjection(LandsStore)
  useEffect(()=>{
    landStore.castleCosts()
  },[])
  const handler =(event:any)=>{
    if(event.key==='Escape'){
      set(false)
      console.log(event.key);
    }
  } 
  useEffect(() => {
    if(visible){
      document.addEventListener('keydown', handler)
    }
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [visible]);
  return (
    <div
      className={`popup flex-cc popup--change-kingdom ${visible ? "show" : ""}`}
    >
      <div className="popup__box">
        <div
          className="popup__box-cancel"
          data-popup-cancel="kingdom"
          onClick={() => {
            set(false);
          }}
        />
        <div className="popup__box-title">Kingdom 8</div>
        <div className="popup__box-content">
          <Swiper
          modules={[Navigation, Scrollbar, Mousewheel, Controller, FreeMode]}
            direction="vertical"
            slidesPerView="auto"
            freeMode={{
              enabled: true,
              sticky: false,
              momentumBounce: true,
            }}
            scrollbar={{
              el: ".swiper-scrollbar",
              hide: false,
              draggable: true,
            }}
            mousewheel={true}
            className="swiper popup-stroke v-scrollbar"
          >
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <div className="popup-kingdoms">
                  <BuildType el={{title: 'castle',image: "assets/images/kingdoms/kingdom_boost_2.jpg",text: "The Fortification on the attacked Land increases the combat power of its defenders. The attackers Siege weapons reduce the strength of Fortification by destroying it with every round of the battle. Siege weapons cant stand in defense. Once they are in battle from the attacking side, they always die.", resources: landStore?.costs?.castle}}/>
                  <BuildType el={{title: 'fortress',image: "assets/images/kingdoms/kingdom_boost_3.jpg",text: "The Fortification on the attacked Land increases the combat power of its defenders. The attackers Siege weapons reduce the strength of Fortification by destroying it with every round of the battle. Siege weapons cant stand in defense. Once they are in battle from the attacking side, they always die.", resources: landStore?.costs?.fortress}}/>
                  <BuildType el={{title: 'citadel',image: "assets/images/kingdoms/kingdom_boost_4.jpg",text: "The Fortification on the attacked Land increases the combat power of its defenders. The attackers Siege weapons reduce the strength of Fortification by destroying it with every round of the battle. Siege weapons cant stand in defense. Once they are in battle from the attacking side, they always die.", resources: landStore?.costs?.citadel}}/>
                </div>
              </SwiperSlide>
            </div>
            <div className="swiper-scrollbar" />
          </Swiper>
        </div>
      </div>
      <div className="popup__bg" />
    </div>
  );
})
export default KingdomPopup;
