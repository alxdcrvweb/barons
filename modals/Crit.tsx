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

export const CritModal = observer(({ data, idx }: modalProps) => {
  const userStore = useInjection(UserStore)
  const cardStore = useInjection(CardStore);
  const craftStore = useInjection(CraftStore);
  const modalStore = useInjection(ModalStore);
  const [craftCost, setCraftCost] = useState({    
    Food: 0,
    Wood: 0,
    Stone: 0,
    Iron: 0,
    Horse: 0,
    Gold: 0
    
  })
  useEffect(()=>{
    setCraftCost({      
      Food: craftStore.craftCost[1].craft_food,
      Wood: craftStore.craftCost[1].craft_wood,
      Stone: craftStore.craftCost[1].craft_stone, 
      Iron: craftStore.craftCost[1].craft_iron,    
      Horse: craftStore.craftCost[1].craft_horse,
      Gold: craftStore.craftCost[1].craft_gold

    })
  },[])
  console.log('%cCraft.tsx line:42 craftCost', 'color: #007acc;', data);
  return (
    <ModalContainer heading="CRAFT NEW NFT" idx={idx}>
        <div className="swiper popup-stroke v-scrollbar"style={{transform: "translateX(15px)"}}>
          <div className="swiper-wrapper">
          <div className="dialog-content">
                  <div className="dialog-content__text">
                    <p>
                      Are you sure that you want to craft <span>{capitalizeFirstLetter(getRightItemName(data.currentCraft)).replace('LvL1', '').replace(' level 1', '')}?</span> <br/>
                      It will cost  
                      {Object.entries(craftCost).filter(el => el[1] && el[1]!==0).map((el:any, i:number)=>{
                          return (
                            <Fragment key={i}>{i!==0 ? ", ": " "}{el[1]}{' '}{getResourceTickers(capitalizeFirstLetter(el[0])) }</Fragment>
                          )
                      })}
                     
                     <br/> <br/>
                      You want to start creating NFT with a significantly higher chance of better quality. In this case, resources can be spent, but crafting has a chance to fail. Amulets and Power Orbs increase the chance of success.
                    </p>
                  </div>
                  <div className="dialog-content__buttons flex-cc">
                    <a style={{cursor:'pointer'}}
                       onClick={() => {
                        cardStore.craftSomeNFT(data.currentCraft).then((res:string) => {
                          cardStore.getResources()
                          modalStore.hideAllModals()
                          if(res==="Not enough resources") toast.error("Not enough resources", { theme: "dark" });
                          if(res==="Succesfully Crafted") {
                            toast.success(res, { theme: "dark" });
                            playSound("assets/sounds/craft.mp3", userStore.volume, userStore.isClicked)
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
