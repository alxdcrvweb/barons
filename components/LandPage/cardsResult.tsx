import { Swiper, SwiperSlide } from "swiper/react";
import { Controller, FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { useInjection } from "inversify-react";
import { playSound } from "../../utils/utilities";
import { ITokenFromList } from "../../stores/CardStore";
import Card from "../MainPage/card";
import { cardsUrl, getRightImage } from "../Craft/handlers";

interface ICards {
  cardsArray: ITokenFromList[]
  staked: boolean
  loading: boolean
  type?: string  
}
const CardsResult = observer(
  ({ staked, cardsArray, loading, type }: ICards) => {
    return (
      <div >

          <div style={{display:'flex', justifyContent:'center'}}>
            {!loading && (type?.includes('king') || type?.includes('queen')) && <img className="show-image"  src={cardsUrl+'land.jpg'}/>}
            {!loading && cardsArray && cardsArray?.length && cardsArray.map((el, i) => {
              return (
                 <img key={i} className="show-image"  src={getRightImage(el.name ? el.name : '', Math.ceil(Number(el?.quality))?Math.ceil(Number(el?.quality)):el?.stamina, el.wearOut , el.level)}/>

              );
            })}
            {loading &&
            Array.from({ length: (cardsArray?.length ? cardsArray?.length : 0) + ((type?.includes('king') || type?.includes('queen')) ? 1 : 0 )}).map((el, i)=>{
              return <SwiperSlide className="show-image" key={i}></SwiperSlide>
            })}
            
          </div>
      </div>
    );
  }
);
export default CardsResult;
