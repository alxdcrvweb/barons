import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect } from "react";
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
import { getRightItemName } from "./handlers";
import ProducesCraftInfo from "./ProducesCraftInfo";
import RedAmuletCraftInfo from "./RedAmuletCraftInfo";
import TroopsCraftInfo from "./TroopsCraftInfo";

const NftCraftTable = observer(({ currentType }: { currentType?: string }) => {
  const craftStore = useInjection(CraftStore);
 
  return (
    <div className="craft-content__info-stroke">
      <div className="craft-content__info-stroke-title">Craft</div>
      <div className="craft-content__info-stroke-subtitle">
        Production per hour
      </div>
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
            {craftStore.craftInfo
              ?.filter((el) => el[0].includes(currentType))
              ?.map((el, i) => {
                return (
                  <SwiperSlide
                    key={i}
                    className={`swiper-slide swiper-craft`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div className="craft-content__info-stroke-content-item">
                      <p>
                        <span>
                          {getRightItemName(el[0].replace("LvL", ""))}
                        </span>
                        {/* food 4-8, horse 1,
                                  wearout 3 hp */}
                      </p>
                      <p className="small">
                        <span>Craft cost</span>{" "}
                        {Object.entries(el[1])
                          .filter(
                            (craft) =>
                              craft[0].toString().includes("craft_") &&
                              craft[1] !== 0
                          )
                          .map((craft, i) => {
                            return (
                              <Fragment key={i}>
                                {craft[1]}
                                {"  "}
                                {getResourceTickers(
                                  capitalizeFirstLetter(
                                    craft[0].replace("craft_", "")
                                  )
                                )}
                                {craft[0].replace("craft_", "") !== "gold" &&
                                  ",  "}
                              </Fragment>
                            );
                          })}
                      </p>
                      {el[1].repair && (
                        <ProducesCraftInfo name={el[0]} values={el[1]} />
                      )}
                      {el[1].stamina && (
                        <TroopsCraftInfo values={el[1]} name={el[0]} />
                      )}
                      {(el[0].includes("greenAmulet") ||
                        currentType?.includes("blueAmulet")) && (
                        <AmuletCraftInfo values={el[1]} name={el[0]} />
                      )}
                      {currentType?.includes("redAmulet") && (
                        <RedAmuletCraftInfo name={el[0]} />
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
          </div>
          <div className="swiper-scrollbar" />
        </Swiper>
      </div>
    </div>
  );
});
export default NftCraftTable;
