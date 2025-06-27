import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { ILand, LandsStore } from "../../stores/LandsStore";
import { getCastleImage } from "./handlers";

export interface ISetProps {
    visible: boolean
    set: (value: boolean) => void;
    currentCraft?: string
}
const Kingdom = observer(({set, visible}: ISetProps ) => {
  const landStore = useInjection(LandsStore)
  const [tax, setTax] = useState(0)
  const [visibleLand, setVisibleLand] = useState<ILand>()
  useEffect(()=>{
    if(landStore.currentLand?.baron.commission) {
      setTax(landStore.currentLand.baron.commission)
    } else {
      setTax(0)
    }
    if(landStore.currentLand) {
      setVisibleLand(landStore.currentLand)
    } else {
      setVisibleLand(landStore.myLand)
    }

  },[landStore.currentLand, landStore.myLand])

  const save = () =>{
    landStore.setComission(tax, landStore.currentLand?._id).then((res?:boolean) => {
      if(res) {
        landStore.getMyLand()
        landStore.getAllMyLands()
        toast.success("Tax changed", {theme:"dark"})
      }
      
    })
  }
  console.log(landStore.currentLand);
  return (
    <div className="war-content__kingdom-info">
      <div className="war-content__kingdom-info-title flex-sbc">
        <div className="war-content__kingdom-info-title-text">Kingdom {visibleLand?.number}</div>
        <a  style={{cursor:"pointer"}} className="war-content__kingdom-info-title-status flex-cc">
          <span>War</span>
        </a>
      </div>
      <div className="war-content__kingdom-info-fortress" style={{background: `url(${getCastleImage(visibleLand?.castle?.name ? visibleLand?.castle?.name: "fence")}) center center no-repeat`}}>
        <div className="war-content__kingdom-info-fortress-title">{visibleLand?.castle?.name ? visibleLand?.castle?.name : "Fence"}</div>
        <div className="war-content__kingdom-info-fortress-change flex-ss">
          <a onClick={()=>{set(true)}} style={{cursor: "pointer",pointerEvents: landStore.isBaron ? 'auto' : 'none'}} >
            change
          </a>
          <a  style={{cursor: "pointer", display: landStore.isBaron ? 'block' : 'none'}} >repair</a>
        </div>
        <div className="war-content__kingdom-info-fortress-progress">
          {visibleLand?.castle?.health ? visibleLand?.castle?.health : "1000"} / {visibleLand?.castle?.health ? visibleLand?.castle?.health : "1000"}
        </div>
        <div className="war-content__kingdom-info-fortress-action flex-ss">
          <div className="war-content__kingdom-info-fortress-action-input flex-cc">
            <span>Tax</span>
            <input type="number" onChange={
              (e)=>{
                setTax(Number(e.target.value))}
              } 
              value={tax}
              style={{pointerEvents: landStore.isBaron ? 'auto' : 'none'}}/>
            <span>%</span>
          </div>
          <a
            style={{pointerEvents: landStore.isBaron ? 'auto' : 'none',cursor: "pointer", display: landStore.isBaron ? 'flex' : 'none'}} 
            className="war-content__kingdom-info-fortress-action-btn green flex-cc"
            onClick={save}
          >
            Save
          </a>
        </div>
        <img
          src={getCastleImage(visibleLand?.castle?.name ? visibleLand?.castle?.name : "fence")}
          alt=""
          
        />
      
      </div>
      
    </div>
  );
})

export default Kingdom;
