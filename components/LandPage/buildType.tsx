import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { CardStore } from "../../stores/CardStore";
import { LandsStore } from "../../stores/LandsStore";
import { UserStore } from "../../stores/UserStore";
import { capitalizeFirstLetter } from "../../utils/utilities";
import { getResourceTickers } from "../MainPage/handlers";

const BuildType = observer(({el}:any) => {
const landStore = useInjection(LandsStore)
const cardStore = useInjection(CardStore)
const build = () =>{
    landStore.castleBuild(landStore?.currentLand?._id, el.title).then((res)=>{
      if(res) {
       landStore.getMyLand()
       landStore.getAllMyLands()
       cardStore.getResources()
      }
    })
}
  return (
    <div className="popup-kingdoms__item flex-sbs">
      <div className="popup-kingdoms__item-info">
        <div className="popup-kingdoms__item-info-title">{el.title}</div>
        <div
          style={{
            cursor: "pointer",
            display: !landStore.isBaron || landStore?.currentLand?.castle?.name == el?.title ? "none" : "block" ,
          }}
          onClick={build}
          className="popup-kingdoms__item-info-change flex-ss"
        >
          <a>build</a>
        </div>

        <img
          src={el.image}
          alt=""
          className="popup-kingdoms__item-info-bg"
        />
      </div>
      <div className="popup-kingdoms__item-content">
        <div className="popup-kingdoms__item-content-title">{el.title}</div>
        <div className="popup-kingdoms__item-content-description">
          {el.text}
        </div>
        <div className="popup-kingdoms__item-content-params">
          <div className="popup-kingdoms__item-content-params-line">
            <span>hp:</span> {el?.resources?.health}
          </div>
          <div className="popup-kingdoms__item-content-params-line">
            <span>defense bonus:</span> {el?.resources?.defense}
          </div>
          <div className="popup-kingdoms__item-content-params-line">
            <span>destuction per hour:</span> -//-
          </div>
        </div>
        <div className="popup-kingdoms__item-content-params">
          <div className="popup-kingdoms__item-content-params-line">
            <span>Build:</span>{" "}
            {el.resources && Object.entries(el?.resources).filter(res => res[0].includes('craft_')).map((res, i) => {
              let resource = capitalizeFirstLetter(res[0].replace('craft_','')) 
              return (
                <>
                  {i !== 0 && ", "}
                  {res[1]} {getResourceTickers(resource)}
                </>
              );
            })}
          </div>
        </div>
        <div className="popup-kingdoms__item-content-params">
          <div className="popup-kingdoms__item-content-params-line">
            <span>Recover:</span> 
            {
                el.resources && Object.entries(el.resources).filter(res => res[0].includes('recover_')).map((res, i) => {
                    let resource = capitalizeFirstLetter(res[0].replace('recover_','')) 
                    return (
                      <>
                        {i !== 0 && ", "}
                        {res[1]} {getResourceTickers(resource)}
                      </>
                    );
                  })
            }
            
          </div>
        </div>
      </div>
    </div>
  );
})
export default BuildType