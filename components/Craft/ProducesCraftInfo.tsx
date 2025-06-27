import { Fragment } from "react";
import { capitalizeFirstLetter } from "../../utils/utilities";
import { getResourceTickers } from "../MainPage/handlers";

const ProducesCraftInfo = ({values, name}:any) => {
  // console.log(values);
  return (
    <>
      <p className="small">
        <span>Produces</span>{" "}
        {Object.entries(values).filter(craft=>craft[0].toString().includes("production") && craft[1]!==0).map((craft, i, arr) => {
            return (
              <Fragment key={i}>
                {craft[1]}
                {"  "}
                {getResourceTickers(capitalizeFirstLetter(craft[0].replace("production_", "")))}
                {arr.length-1 !== i && ",  "}
              </Fragment>
            );
        })}
      </p>
      <p className="small">
        <span>Repair cost</span>{" "}
        {Object.entries(values).map((craft, i) => {
          if (craft[0].toString().includes("recover") && craft[1]!==0) {
            return (
              <Fragment key={i}>
                
                {craft[1]}
                {"  "}
                {getResourceTickers(capitalizeFirstLetter(craft[0].replace("recover_", "")))}
                {/* {",  "} */}
                {craft[0].replace("recover_","")!=="gold"  && ",  "}
              </Fragment>
            );
          }
        })}
      </p>
    </>
  );
};
export default ProducesCraftInfo;
