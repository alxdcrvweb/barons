import { useInjection } from "inversify-react";
import {observer} from "mobx-react";
import { ModalsEnum } from ".";
import { CraftStore } from "../stores/CraftStore";
import { ModalStore } from "../stores/ModalStore";
import Web3Store from "../stores/WalletStore";
import ModalContainer from "./ModalContainer";
import { useEffect, useState } from "react";

interface modalProps {

    data?:any,
    idx:ModalsEnum
}

export const WithdrawModal = observer(({data,idx}:modalProps) => {
    const modalStore = useInjection(ModalStore);
    const web3Store = useInjection(Web3Store);
    const [stakeCost, setStakeCost] = useState(0)
    const craftStore = useInjection(CraftStore)
    useEffect(()=>{
      // console.log(craftStore.craftInfoAsObject[data.card.name+'LvL'+data.card.level]); 
      if(data.card.type_craft === "nft" && !data.staked) {
        setStakeCost(craftStore.craftInfoAsObject[data.card.name+'LvL'+data.card.level].stake_gold)
      } else if(data.card.type_craft === "nft" && !data.staked) {
        setStakeCost(craftStore.craftInfoAsObject[data.card.name+'LvL'+data.card.level].unstake_gold)
      }
      
    },[])
    return (
        <ModalContainer heading={!data.staked?'STAKE NFT':'UNSTAKE NFT'}  idx={idx}>
            <div className="dialog-content">
                  <div className="dialog-content__text">
                    <p>
                      {!data.staked?
                      'You need to sign one or two transactions, giving permission to work with your NFT and confirm staking in your wallet.':
                      'You need to sign one or two transactions, to unstake NFT in your wallet'}
                      <br/>
                      {stakeCost!==0 && `It will cost ${stakeCost} MBG.`}
                     
                    </p>
                  </div>
                  <div className="dialog-content__buttons flex-cc">
                    <a style={{cursor:'pointer'}}
                       onClick={() => {
                        data.stake()
                        modalStore.hideAllModals()
                      }}
                      className="texture-button texture-button--green flex-cc"
                    >
                     {!data.staked?"STAKE":"UNSTAKE"}
                    </a>
                    <a style={{cursor:'pointer'}}
                    onClick={()=>modalStore.hideModal(idx)}
                    //    onClick={()=>set(false)}
                      className="texture-button texture-button--red flex-cc"
                    >
                      CANCEL
                    </a>
                   
                  </div>
                </div>
        </ModalContainer>
    )
});

