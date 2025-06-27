import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import { getRightItemName } from "../components/Craft/handlers";
import { getResourceTickers } from "../components/MainPage/handlers";
import { CardStore } from "../stores/CardStore";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import { UserStore } from "../stores/UserStore";
import { capitalizeFirstLetter, playSound } from "../utils/utilities";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const RepairModal = observer(({ data, idx }: modalProps) => {
  const cardStore = useInjection(CardStore);
  const craftStore = useInjection(CraftStore);
  const modalStore = useInjection(ModalStore);
  const [prevState, setPrevState] = useState<any>()
  useEffect(()=>{
   setPrevState(cardStore.user)
   craftStore.getRepairCost()
  },[])
  return (
    <ModalContainer heading="REPAIR ALL NFTs" idx={idx}>
        <div className="swiper popup-stroke v-scrollbar"style={{transform: "translateX(15px)"}}>
          <div className="swiper-wrapper">
          <div className="dialog-content">
                  <div className="dialog-content__text">
                    <p>
                      Are you sure that you want to repair all NFTs?<br/>
                      {craftStore.repairCost && "I't will cost"}
                      {/* {console.log(craftStore.repairCost)} */}
                      {craftStore.repairCost && Object.entries(craftStore.repairCost).map((el:any, i:number)=>{
                        if(el[1]&&el[1]!==0 )
                          return (
                            <Fragment key={i}>{i!==0 ? ", ": " "}{el[1]}{' '}{getResourceTickers(capitalizeFirstLetter(el[0])) }</Fragment>
                          )
                      })}.
                      
                    </p>
                  </div>
                  <div className="dialog-content__buttons flex-cc">
                    <a style={{cursor:'pointer'}}
                       onClick={() => {
                        if(!craftStore.repaired) {
                          cardStore.repairAll().then((res:any) => {
                            console.log(res);
                          modalStore.hideAllModals()
                          if(!res)  {
                            toast.error("Not enough resources", { theme: "dark" })
                          }
                          else if(res.message == "All cards are already fixed")  {
                            toast.success("All NFTs already repaired", { theme: "dark" })
                          }
                          else if(res.message == "Not enough resources")  {
                            toast.error("Not enough resources", { theme: "dark" })
                          }
                          else {
                            cardStore.getResources().then(()=>{
                              cardStore.getWearout()
                              
                              toast.success("Successfully repaired", { theme: "dark" })
                            })
                            
                          }
                        });
                        } else {
                          // cardStore.resetGlobalWareout()
                          toast.success("All NFTs already repaired",{theme:'dark'})
                        }
                        
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
