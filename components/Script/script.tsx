import { useInjection } from "inversify-react"
import { observer } from "mobx-react"
import { UserStore } from "../../stores/UserStore"
import { capitalizeFirstLetter } from "../../utils/utilities"


const ScriptPage = observer(({title, resource}:{title:string, resource?: string}) => {
  const userStore = useInjection(UserStore)
    return (
        <div className="popup flex-cc popup--settings show">
        <div className="popup__box align-center">
          <div className="popup__box-title">{title}</div>
          <div className="popup__box-content">
            <div className="swiper popup-stroke v-scrollbar" style={{color:'#604c43'}}>
              <div className="popup__box-content flex-sbs">
                <div>
                {userStore.total && <div>Total {resource}: {userStore.total} </div>}
                  {userStore.customUserResInfo && <h4 style={{marginBottom:'15px'}}>Resources</h4>}
                  {userStore.customUserResInfo && Object.entries(userStore.customUserResInfo).map((el,i)=> {
                    return (
                      <div key={i}>{el[0]}: {el[1]}</div>
                    )
                  })}
                </div>
                <div className="popup__box-content-scroll popup__box-content-align-right">
                {userStore.customUserPacksInfo && <h4 style={{marginBottom:'15px'}}>Packs</h4>}
                    {userStore.customUserPacksInfo && Object.entries(userStore.customUserPacksInfo).map((el,i)=> {
                    if(el[1]!==undefined) {
                      return (
                        <div key={i}>{el[0]}: {el[1]}</div>
                      )
                    }
                  })}
                </div>
              </div>
              <div className="popup__box-content flex-sbs">
                <div className="popup__box-content-scroll">
                  {userStore.customUserTokenInfo && userStore.customUserTokenInfo.length!==0 && <h4 style={{marginTop:'15px',marginBottom:'15px'}}>NFTs</h4>}
                  {userStore.customUserTokenInfo && userStore.customUserTokenInfo.length!==0 && userStore.customUserTokenInfo.map((el,i)=> {
                    
                      return (
                        <div key={i}>{capitalizeFirstLetter(el.name) }</div>
                      )
                    
                  })}
                </div>
                <div className="popup__box-content-align-right">
                  {userStore.customUserPassInfo && userStore.customUserPassInfo.length!==0 && <h4 style={{marginTop:'15px',marginBottom:'15px'}}>Mint passes</h4>}
                  {userStore.customUserPassInfo && userStore.customUserPassInfo.length!==0 && userStore.customUserPassInfo.map((el,i)=> {
                    
                      return (
                        <div key={i}>{capitalizeFirstLetter(el.type) }: {el.count}</div>
                      )
                    
                  })}
                </div>
                
              </div>
              
              <div className="swiper-scrollbar" />
            </div>
          </div>
        </div>
        <div className="popup__bg" data-popup-cancel="settings" />
      </div>
    )
})
export default ScriptPage 