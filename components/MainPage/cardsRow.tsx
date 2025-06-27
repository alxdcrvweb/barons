import { useInjection } from "inversify-react";
import { observer } from "mobx-react";

import { CardStore, ITokenFromList } from "../../stores/CardStore";
import Card from "./card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { getRightImage } from "../Craft/handlers";
import { generateKey } from "../../utils/utilities";

interface ICards {
  cardsArray: ITokenFromList[];
  position: string;
  staked: boolean;
}
const CardsRow = observer((props: ICards) => {
  const { position, cardsArray, staked } = props;
  const prevEl: string = `.main-cards-${position}-arrow.slider-arrow_prev`;
  const nextEl: string = `.main-cards-${position}-arrow.slider-arrow_next`;
  // const cardStore = useInjection(CardStore)
  // const getWareout = (wareout?:number, staked?:boolean) =>{
  //   if(!staked) {
  //     return wareout
  //   } else if(staked && cardStore.grobalWareout == 0) {
  //     // console.log('0');
  //     return 0
  //   }
  //   return wareout
  // }
  return (
    <div className="swiper-layout">
      <div className={`main-cards-${position}-arrow slider-arrow_prev`} />
      <div className={`main-cards-${position}-arrow slider-arrow_next`} />
      <Swiper
        className="swiper main-cards-top"
        slidesPerView={5}
        spaceBetween={20}
        modules={[Navigation]}
        watchOverflow={true}
        navigation={{
          enabled: true,
          prevEl: prevEl,
          nextEl: nextEl,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          641: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          720: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
          1680: {
            slidesPerView: 5,
          },
          2480: {
            slidesPerView: 5,
          },
        }}
      >
        <div className="swiper-wrapper">
          {/* <SwiperSlide
            style={{ display: !staked ? "block" : "none" }}
            className={`swiper-slide flex-cc`}
          >
            <Card
              card={{ type_craft: "pack", name: "pack" }}
              isStaked={staked}
              index={999}
              craftedLink={"https://minebarons.io/cards/pack_mine.jpg"}
            />
          </SwiperSlide> */}
          {cardsArray.length !== 0
            ? cardsArray
                .slice()
                .sort(
                  (a: ITokenFromList, b: ITokenFromList) =>
                    Number(b?.changeDate) -  Number(a.changeDate)
                )
                .map((el: ITokenFromList, i: number) => {
                  return (
                    <SwiperSlide
                      key={generateKey(i)}
                      style={{
                        display: el.type_craft == "troops" ? "none" : "block",
                      }}
                      className={`swiper-slide flex-cc ${
                        el.txIncome ? "card-unabled" : ""
                      }`}
                    >
                      <Card
                        card={el}
                        isStaked={staked}
                        craftedLink={
                          !el.tokenId && el.name
                            ? getRightImage(
                                el.name,
                                Math.ceil(Number(el?.quality)) ? Math.ceil(Number(el?.quality)) : el?.stamina,
                                el.wearOut,
                                el.level
                              )
                            : undefined
                        }
                        index={i}
                      />
                    </SwiperSlide>
                  );
                })
            : Array.from({ length: 5 }).map((el, i) => {
                return (
                  <SwiperSlide
                    key={generateKey(i)}
                    className="swiper-slide flex-cc"
                  />
                );
              })}
          {cardsArray.filter((el) => el.type_craft !== "troops").length < 5 &&
            Array.from({
              length:
                5 -
                cardsArray.filter((el) => el.type_craft !== "troops").length,
            }).map((el, i) => {
              return (
                <SwiperSlide
                  key={generateKey(i)}
                  className="swiper-slide flex-cc"
                />
              );
            })}
        </div>
      </Swiper>
    </div>
  );
});
export default CardsRow;
