import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { ModalsEnum } from ".";
import ModalContainer from "./ModalContainer";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import CardsResult from "../components/LandPage/cardsResult";
import { CardStore } from "../stores/CardStore";
import { LandsStore } from "../stores/LandsStore";

interface modalProps {
  data?: any;
  idx: ModalsEnum;
}

export const OpenResultModal = observer(({ data, idx }: modalProps) => {
  const [loading, setLoading] = useState(true);
  const cardStore = useInjection(CardStore);
  const landsStore = useInjection(LandsStore);
  useEffect(() => {
    let tt = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(tt);
  }, []);
  useEffect(()=>{
    if(!loading) {

      cardStore.getForceMajor()
      cardStore.getWearout()
      cardStore.getProduction()
      landsStore.getAllMyLands()
      cardStore.getResources(data.card._id)
    }
  },[loading])
  return (
    <ModalContainer heading={"OPENING..."} idx={idx}>
      <div className="dialog-content">
        <div className="dialog-content__text">
          <p style={{ opacity: loading ? 0 : 1, transition: '500ms ease all' }}>
            <span>Congratulations!</span> You get:{data.card.name.includes('token') && " 5000 MBM"}
          </p>
          {/* {stakeCost!==0 && `It will cost ${stakeCost} MBG.`} */}
          {!data.card.name.includes('token') &&
          <>
          <div className="spinner" style={{marginLeft:'15px'}}>
            <ColorRing
              visible={loading}
              height="80"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#f47e60", "#e15b64"]}
            />
          </div>
          <div className="main__content flex-ss" style={{ opacity: loading ? 0.5 : 1, pointerEvents: 'none', transform: 'translateX(20px)', transition: '500ms ease all' }}>
            <div className="main-cards" style={{marginLeft:'-5px'}}>
              <CardsResult cardsArray={data.data} staked={true} loading={loading} type={data.card.name}></CardsResult>
            </div>
          </div>
          </>}
        </div>
      </div>
    </ModalContainer>
  );
});
