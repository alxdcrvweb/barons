import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { toast } from "react-toastify";
import { ModalsEnum } from "../../modals";
import { ModalStore } from "../../stores/ModalStore";
import { UserStore } from "../../stores/UserStore";
import { playSound } from "../../utils/utilities";


const CraftButton = observer(
  ({
    currentCraft,
    isMp,
    craftText,
    price,
    disable,
    disableReason,
    type,
    discount,
    firstMintWithMintpass
  }: {
    discount: number
    currentCraft: string;
    craftText: string;
    type?: string;
    isMp?: boolean
    disableReason?: string,
    price?: number;
    disable?: boolean
    firstMintWithMintpass?: boolean
  }) => {
   
    const userStore = useInjection(UserStore);
    const modalStore = useInjection(ModalStore);
    const showModal = () =>{
      if(!currentCraft.includes("pack")) {
        modalStore.showModal(ModalsEnum.Craft, {
          currentCraft: currentCraft,
        })
      } else {
        disable ? toast.error(disableReason, {theme:'dark'}) : 
        modalStore.showModal(ModalsEnum.CraftPack, {
          currentCraft: currentCraft,
          cost: price,
          discount: discount,
          type: type,
          firstMintWithMintpass:firstMintWithMintpass,
          isMp: isMp
        });
      }
             
             
    }
    return (
      <a
        className={`texture-button texture-button--yellow flex-cc`}
        
        onMouseEnter={() =>
          playSound(
            "assets/sounds/nav_link_hover_effect.wav",
            userStore.volume,
            userStore.isClicked
          )
        }
        
        onClick={() => {
          showModal()
        }}
        style={{ cursor: "pointer", width: "90px", zIndex: 90 }}
      >
        
        <div
          style={{
            transition: "500ms ease all",
          }}
        ></div>
        {craftText}
      </a>
    );
  }
);
export default CraftButton;
