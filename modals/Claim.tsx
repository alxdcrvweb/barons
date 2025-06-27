import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalsEnum } from ".";
import { getRightItemName } from "../components/Craft/handlers";
import { IData } from "../pages/market";
import { CardStore } from "../stores/CardStore";
import { LandsStore } from "../stores/LandsStore";
import { ModalStore } from "../stores/ModalStore";
import { UserStore } from "../stores/UserStore";
import { WarehouseStore } from "../stores/WarehouseStore";
import { capitalizeFirstLetter, playSound } from "../utils/utilities";
import ModalContainer from "./ModalContainer";

interface modalProps {
  data:IData,
  treasury:IData,
  setData?: (data:IData) => void,
  emptyData: IData,
}

export const ClaimModal = observer(({ data, idx }: {data:modalProps, idx:ModalsEnum}) => {
  const cardStore = useInjection(CardStore);
  const warehouseStore = useInjection(WarehouseStore);
  const landsStore = useInjection(LandsStore);
  const modalStore = useInjection(ModalStore);
  const claim = () =>{
    warehouseStore.claimFromTreasury(data.treasury).then(res => {
      if(res) {
        warehouseStore.getTreasuryData()
      }
    })
    warehouseStore.claimFromStorage(data.data).then(res => {
      if(res) {
        toast.success('Successfully claimed', { theme: "dark" })
        warehouseStore.getStorageData()
        cardStore.getResources()
      }
      modalStore.hideAllModals()
    })
  }
  // console.log(data.setData,data.data,data.emptyData);
  return (
    <ModalContainer heading="CLAIM RESOURCES TO ACCOUNT" idx={idx}>
        <div className="swiper popup-stroke v-scrollbar"style={{transform: "translateX(15px)"}}>
          <div className="swiper-wrapper">
          <div className="dialog-content">
                  <div className="dialog-content__text">
                    <p>
                      You will transfer all resources from the Warehouse to the account balance, where they will be safe from robbery.
                      This can be done no more than every 8 hours.
                      {console.log(landsStore.myLand)}
                      {landsStore?.myLand?.baron ? ` In this case, ${landsStore?.myLand?.baron?.commission ? landsStore?.myLand?.baron?.commission : 0}% of the resources will be transferred to your Baron automatically.` : " There is no tax on your Land now."}
                    </p>
                  </div>
                  <div className="dialog-content__buttons flex-cc">
                    <a style={{cursor:'pointer'}}
                       onClick={claim}
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
