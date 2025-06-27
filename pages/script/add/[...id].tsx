import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import type { NextPage } from "next";
import { UserStore } from "../../../stores/UserStore";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";

import { useEffect, useState } from "react";
import AddScriptPage from "../../../components/Script/add";

const Script: NextPage = observer((props) => {
  const title = 'Admin menu'
  return (
    <AddScriptPage title={title}/>
  );
});

export default Script;
