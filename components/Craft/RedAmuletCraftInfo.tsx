import { Fragment } from "react";
import { craftInfo } from "./handlers";

const RedAmuletCraftInfo = ({name}:any) => {
  let lvl = name.slice(-1)
  return (
    <>
      <p className="small">
        By {lvl == '1' ? "35" : lvl == '2' ? '70': "100"}% increases the chance of successful crafting and the creation of higher quality NFT
      </p>
    </>
  );
};
export default RedAmuletCraftInfo;
