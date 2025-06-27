import { Fragment } from "react";
import { capitalizeFirstLetter } from "../../utils/utilities";
import { getResourceTickers } from "../MainPage/handlers";
import { craftInfo } from "./handlers";

const AmuletCraftInfo = ({values, name}:any) => {
  let lvl = name.slice(-1)
  return (
    <>
      <p className="small">
        By {lvl == '1' ? "35" : lvl == '2' ? '70': "100"}% reduces the negative effect of exhaustion and weather on
      
       {Object.entries(values).map((el, i)=>{
        if(!el[0].includes("craft") && el[1]!==0) {
          return (
            <Fragment key={i}>
              {' '}{getResourceTickers(capitalizeFirstLetter(el[0]))} 
            </Fragment>
          )
        }
       })}
      </p>
    </>
  );
};
export default AmuletCraftInfo;
