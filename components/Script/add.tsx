import { useInjection } from "inversify-react"
import { observer } from "mobx-react"
import { UserStore } from "../../stores/UserStore"
import { capitalizeFirstLetter } from "../../utils/utilities"
import { useEffect, useState } from "react";

const AddScriptPage = observer(({title}:{title:String}) => {
  const userStore = useInjection(UserStore)
  const [code, setCode] = useState('')
  const [item, setItem] = useState('gold')
  const [type, setType] = useState('res')
  const [count, setCount] = useState(0)
  const [address, setAddress] = useState('')
  useEffect(() => {
    let req = window.location.pathname.split('/')
    console.log(req[req.length-1])
    setCode(req[req.length-1])
  }, []);
  const submit = ()=>{
    userStore.sendItems(code, item, count, address, type)
  }

  const items = type=='res' ? ['gold', 'horse', 'stone', 'iron', 'wood', 'food'] : ['minePack', 'kingPack', 'queenPack', 'tokenPack', 'farmPack']
  const types =  ['res', 'pack']
  return (
      <div className="popup flex-cc popup--settings show">
      <div className="popup__box align-center">
        <div className="popup__box-title">{title}</div>
        <div className="popup__box-content">
          <div className="swiper popup-stroke v-scrollbar" style={{color:'#604c43'}}>
            Code:<input className="popup-box-input" value={code}/><br/>
            Type:<select className="popup-box-input" value={type} onChange={(e)=>{
              setType(e.target.value)
              setItem(e.target.value == 'res' ? "gold" : 'mine')
            }}>
              {types.map((el)=>{
                return (
                  <option key={el}>{el}</option>
                )
              })}
              </select><br/>
            Item:<select className="popup-box-input" value={item} onChange={(e)=>{
              setItem(e.target.value)
              
            }}>
              {items.map((el)=>{
                return (
                  <option key={el}>{el}</option>
                )
              })}
             
              </select><br/>
            Count:<input className="popup-box-input" value={count} type='number' onChange={(e:any)=>{
              setCount(e.target.value)
            }}/><br/>
            Address:<input className="popup-box-input" value={address}onChange={(e)=>{
              setAddress(e.target.value)
            }}/><br/>
            <button className="popup-box-input" onClick={submit}>Send</button>
            <div className="swiper-scrollbar" />
          </div>
        </div>
      </div>
      <div className="popup__bg" data-popup-cancel="settings" />
    </div>
  )
})
export default AddScriptPage