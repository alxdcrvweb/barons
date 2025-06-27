import { Fragment } from "react";
import { craftInfo } from "./handlers";

const TroopsCraftInfo = ({ values, name }: any) => {
  return (
    <>
      <p className="small">
        <span>Stats</span>{" "}
        <Fragment>
          Attack
          {"  "}
          {values.atf}
          {",  "}
        </Fragment>
        <Fragment>
          Defence
          {"  "}
          {values.def}
          {",  "}
        </Fragment>
        <Fragment>
          Health
          {"  "}
          {values.hp}
          {",  "}
        </Fragment>
        <Fragment>
          Damage
          {"  "}
          {values.hp}
          {",  "}
        </Fragment>
        <Fragment>
          Stamina
          {"  "}
          {values.stamina}
          {",  "}
        </Fragment>
        <Fragment>
          {values.ability}
          {"  "}
          {!name.includes("siege") && 'attack bonus'}
        </Fragment>
      </p>
      <p className="small">{craftInfo(name)}</p>
    </>
  );
};
export default TroopsCraftInfo;
