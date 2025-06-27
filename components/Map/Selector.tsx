import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { ModalsEnum } from "../../modals";
import { LandsStore } from "../../stores/LandsStore";
import { ModalStore } from "../../stores/ModalStore";

interface ISelector {
  active: boolean;
  setActive: (a: boolean) => void;
  currentName: any;
  func: (p: string, p2: string) => void;
  array: any[];
  isMap?: boolean;
}

const Selector = observer(({
  active,
  setActive,
  currentName,
  func,
  array,
  isMap,
}: ISelector) => {
  const modalStore = useInjection(ModalStore)
  const landsStore = useInjection(LandsStore)
  return (
    <div className="land-content__col flex-sc">
      <form className="flex-sbc">
        <div
          className={classNames(
            "nselect ns-sys myStyleSelect",
            active && "_active"
          )}
        >
          <h6
            className="nselect__head"
            title="Continent 1"
            onClick={() => {
              setActive(!active);
            }}
          >
            <span>{currentName}</span>
          </h6>
          <div className="nselect__inner" style={{ opacity: active ? 1 : 0 }}>
            <ul className="nselect__list mCustomScrollbar _mCS_1 mCS_no_scrollbar">
              <div
                id="mCSB_1"
                className="mCustomScrollBox mCS-dark mCSB_vertical mCSB_inside"
                tabIndex={0}
                style={{ maxHeight: "266px" }}
              >
                <div
                  id="mCSB_1_container"
                  className="mCSB_container mCS_y_hidden mCS_no_scrollbar_y"
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                  }}
                  dir="ltr"
                >
                  {array.map((el, i) => {
                    return (
                      <li
                        className=" "
                        key={el.title + i}
                        onClick={() => func(el.title, el.filter)}
                      >
                        <span>{el.title}</span>
                      </li>
                    );
                  })}
                </div>
                <div
                  id="mCSB_1_scrollbar_vertical"
                  className="mCSB_scrollTools mCSB_1_scrollbar mCS-dark mCSB_scrollTools_vertical"
                  style={{ display: "none" }}
                >
                  <div className="mCSB_draggerContainer">
                    <div
                      id="mCSB_1_dragger_vertical"
                      className="mCSB_dragger"
                      style={{
                        position: "absolute",
                        minHeight: "30px",
                        height: "0px",
                        top: "0px",
                      }}
                    >
                      <div
                        className="mCSB_dragger_bar"
                        style={{ lineHeight: "30px" }}
                      ></div>
                      <div className="mCSB_draggerRail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </div>
        </div>
        {isMap && (
          <button type="button" 
            style={{pointerEvents:landsStore.resettleLand?.num==-1 ? 'none' : 'auto', 
            cursor:landsStore.resettleLand?.num==-1 ? 'not-allowed' : 'pointer', 
            opacity:landsStore.resettleLand?.num==-1 ? 0.5 : 1
          }}
           onClick={()=>{modalStore.showModal(ModalsEnum.Resettle, {landIndex: landsStore.resettleLand?.num, _id: landsStore.resettleLand?.id})}}>
            Resettle
          </button>
        )}
      </form>
    </div>
  );
})
export default Selector;
