import { SwiperSlide } from "swiper/react";
import { ILand } from "../../stores/LandsStore";

const LandRow = ({ land , i }: { land: ILand , i:number }) => {
    console.log('%clandRow.tsx line:5 land', 'color: #007acc;', land);
  return (
    <SwiperSlide key={i}>
      <div className="war-content__kingdoms-table-line flex-sc">
        <div className="war-content__kingdoms-table-col flex-sc">
          <a data-show-image={1}>Kingdom {land?.number}</a>
        </div>
        <div
          className="war-content__kingdoms-table-col flex-cc"
          data-name="Continent:"
        >
          <span>{land?.continent}</span>
        </div>
        <div
          className="war-content__kingdoms-table-col flex-cc"
          data-name="Tax:"
        >
          <span>0%</span>
        </div>
        <div
          className="war-content__kingdoms-table-col flex-cc"
          data-name="Defense:"
        >
          <span>{land?.protection && land?.protection / 100}</span>
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
  );
};
export default LandRow;
