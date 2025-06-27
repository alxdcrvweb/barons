import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import { getResourceTickers } from "../components/MainPage/handlers";
import { CardStore } from "../stores/CardStore";
import { LandsStore } from "../stores/LandsStore";
import { ModalStore } from "../stores/ModalStore";
import { UserStore } from "../stores/UserStore";
import { capitalizeFirstLetter, playSound } from "../utils/utilities";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const ResettleModal = observer(({ data, idx }: modalProps) => {
  const landsStore = useInjection(LandsStore)
  const cardStore = useInjection(CardStore)
  const userStore = useInjection(UserStore)
  const modalStore = useInjection(ModalStore);
  const [ResettleCost, setResettleCost] = useState()
  useEffect(()=>{
    console.log('%cResettle.tsx line:35 data._id', 'color: #007acc;', data);
    landsStore.getResettlePrice(data._id).then((res)=>{
      setResettleCost(res)
    })
  },[])

  console.log(ResettleCost);
  return (
    <ModalContainer heading={`Resettle to land ${data.landIndex}`} idx={idx}>
        <div className="swiper popup-stroke v-scrollbar"style={{transform: "translateX(15px)"}}>
          <div className="swiper-wrapper">
          <div className="dialog-content">
                  <div className="dialog-content__text">
                    <p>
                      Are you sure that you want to resettle to land{' '}<span>{data.landIndex}?</span><br/>
                      It will cost 
                      {ResettleCost && Object.entries(ResettleCost).filter(el => el[1] && el[1]!==0).map((el:any, i:number)=>{
                          return (
                            <Fragment key={i}>{i!==0 ? ", ": " "}{el[1]}{' '}{getResourceTickers(capitalizeFirstLetter(el[0])) }</Fragment>
                          )
                      })}.
                      <br/>
                      
                    </p>
                  </div>
                  <div className="dialog-content__buttons flex-cc">
                    <a style={{cursor:'pointer'}}
                       onClick={() => {
                        landsStore.resettle(data._id).then((res:any) => {
                          if(res) {
                            cardStore.getResources()
                            landsStore.getMyLand()
                            modalStore.hideAllModals()
                            if(res.message) {
                              toast.error(res.message, { theme: "dark" })
                            } else {
                              toast.success("Successfully Resettled", { theme: "dark" })
                            } 
                          }
                          
                        });
                      }}
                      className="texture-button texture-button--green flex-cc"
                    >
                      YES
                    </a>
                    <a style={{cursor:'pointer'}}
                       onClick={()=>modalStore.hideAllModals()}
                      className="texture-button texture-button--red flex-cc"
                    >
                      NO
                    </a>
                   
                  </div>
                </div>
        </div>
      </div>
    </ModalContainer>
  );
});
