import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { observer } from "mobx-react";
import { ModalStore } from "../stores/ModalStore";
import { useInjection } from "inversify-react";
// import styles from './Modal.module.sass';
import { ModalsEnum } from ".";

interface IModalProps {
  modalKey?: ModalsEnum;
  onShow?: () => any;
  onHide?: () => any;
  closable?: boolean;
  idx: number;
}

interface P extends React.PropsWithChildren<IModalProps> {
  heading?: string;
}

const ModalContainer: React.FC<P> = observer(
  ({
    children,
    onShow,
    onHide,
    idx,
    closable = true,
    heading,
  }: P) => {
    const fade = useRef<HTMLDivElement>(null);
    const modalStore = useInjection(ModalStore);
    const [visible, setVisible] = useState(false);
    const handler =(event:any)=>{
      if(event.key==='Escape'){
        setVisible(false)
        // console.log(event.key);
      }
    } 
    useEffect(() => {
      setVisible(true);
      onShow?.();
      return () => {
        onHide?.();
      }
    }, []);
    useEffect(() => {
      if(visible){
        document.addEventListener('keydown', handler)
      }
      return () => {
        document.removeEventListener('keydown', handler)
      }
    }, [visible]);
    return (
      <div
        className={`popup flex-cc popup--settings ${visible ? "show" : ""}`}
        ref={fade}
        onClick={(e) =>
          e.target === fade.current && closable && modalStore.hideModal(idx)
        }
      >
        <div className="popup__box align-center">
          <div
            className="popup__box-cancel"
            //    onClick={()=>set(false)}
            onClick={() => modalStore.hideModal(idx)}
          />
          <div className="popup__box-title">{heading}</div>
          <div className="popup__box-content">
            <div className="swiper popup-stroke v-scrollbar">
              <div className="swiper-wrapper">{children}</div>
              <div className="swiper-scrollbar" />
            </div>
          </div>
        </div>
        <div className="popup__bg" data-popup-cancel="settings" />
      </div>
    );
  }
);

export default ModalContainer;
