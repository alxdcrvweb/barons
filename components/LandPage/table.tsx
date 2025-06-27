import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import React from "react";
import { Controller, FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { CardStore } from "../../stores/CardStore";
import { ILand, LandsStore } from "../../stores/LandsStore";
import LandRow from "./landRow";

const Table = observer(() => {
  const landStore = useInjection(LandsStore);
  const cardStore = useInjection(CardStore)
  React.useEffect(()=>{
    if(landStore.myBaronLands && landStore.myBaronLands.length!==0){
      landStore.setCurrentLand(landStore.myBaronLands[0])
    }    
  },[landStore.myBaronLands])
  return (
    <div className="war-content__kingdoms">
      <div className="war-content__kingdoms-title flex-sc">
        <div className="war-content__kingdoms-title-col flex-sc">
          <span>My kingdoms</span>
        </div>
        <div className="war-content__kingdoms-title-col flex-cc">
          <span>Continent</span>
        </div>
        <div className="war-content__kingdoms-title-col flex-cc">
          <span>Tax</span>
        </div>
        <div className="war-content__kingdoms-title-col flex-cc">
          <span>Defense</span>
        </div>
        <div className="war-content__kingdoms-title-col flex-cc">
          <span>Status</span>
        </div>
        <div className="war-content__kingdoms-title-col flex-cc">
          <span>Random</span>
        </div>
        
      </div>
      <div className="war-content__kingdoms-table">
        <Swiper
          modules={[Navigation, Scrollbar, Mousewheel, Controller, FreeMode]}
          slidesPerView={4}
          slidesPerGroup={1}
          spaceBetween={0}
          mousewheel={{
            eventsTarget: ".war-kingdoms-swiper",
            sensitivity: 0.2,
          }}
          freeMode={{
            enabled: true,
            sticky: true,
            momentumBounce: true,
          }}
          onTouchEnd={()=>{console.log('touch end')}}
          className="swiper war-kingdoms-swiper v-scrollbar"
          direction="vertical"
          scrollbar={{
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            641: {
              slidesPerView: 4,
            },
          }}
        >
          
            {!landStore.isBaron ? (
            <div className="swiper-wrapper">
              
            </div>
            ) : 
            <div className="swiper-wrapper">
            {
              landStore.myBaronLands?.filter((el:any) => {
                // console.log(cardStore.user._id, el.baron.user._id);
                return el?.baron?.user?._id === cardStore.user._id
              })?.map((el:ILand, i)=>{
                
                return (
                  <SwiperSlide key={i} onClick={()=>{landStore.setCurrentLand(el)}}>
                  <div className="war-content__kingdoms-table-line flex-sc" style={el.number ==landStore.currentLand?.number ? {backgroundColor: 'rgba(0, 0, 0, 0.3)'}: {opacity:1}}>
                    <div className="war-content__kingdoms-table-col flex-sc">
                      <a data-show-image={1}>Kingdom {el?.number}</a>
                    </div>
                    <div
                      className="war-content__kingdoms-table-col flex-cc"
                      data-name="Continent:"
                    >
                      <span>{el?.continent}</span>
                    </div>
                    <div
                      className="war-content__kingdoms-table-col flex-cc"
                      data-name="Tax:"
                    >
                      <span>{el?.baron.commission? el?.baron.commission : 0 }%</span>
                    </div>
                    <div
                      className="war-content__kingdoms-table-col flex-cc"
                      data-name="Defense:"
                    >
                      <span>{el?.protection && el?.protection / 100}</span>
                    </div>
                    <div
                      className="war-content__kingdoms-table-col flex-cc"
                      data-name="Status:"
                    >
                      <span>Fence</span>
                    </div>
                    <div
                      className="war-content__kingdoms-table-col flex-cc"
                      data-name="Random:"
                    >
                      <span>-//-</span>
                    </div>
                  </div>
                </SwiperSlide>
                )
              })
            }
            </div>
          
          }

            {/* {landStore.isBaron &&
              Array.from({ length: 10 }).map((el, i) => {
                return (
                  <SwiperSlide key={i}>
                    <div className="war-content__kingdoms-table-line flex-sc">
                      <div className="war-content__kingdoms-table-col flex-sc">
                        <a data-show-image={1}>Kingdom 8</a>
                      </div>
                      <div
                        className="war-content__kingdoms-table-col flex-cc"
                        data-name="Land:"
                      >
                        <span>Aurin</span>
                      </div>
                      <div
                        className="war-content__kingdoms-table-col flex-cc"
                        data-name="Tax:"
                      >
                        <span>7%</span>
                      </div>
                      <div
                        className="war-content__kingdoms-table-col flex-cc"
                        data-name="Defense:"
                      >
                        <span>1.12</span>
                      </div>
                      <div
                        className="war-content__kingdoms-table-col flex-cc"
                        data-name="Status:"
                      >
                        <span>Fortress 72%</span>
                      </div>
                      <div
                        className="war-content__kingdoms-table-col flex-cc"
                        data-name="Random:"
                      >
                        <span>--</span>
                      </div>
                      <div
                        className="war-content__kingdoms-table-col flex-cc"
                        data-name="Actions:"
                      >
                        <span>
                          <a
                            style={{ cursor: "pointer" }}
                            className="white-button flex-cc"
                          >
                            <span>Unstake</span>
                          </a>
                        </span>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })} */}
          
          <div className="swiper-scrollbar" />
        </Swiper>
      </div>
    </div>
  );
});

export default Table;
