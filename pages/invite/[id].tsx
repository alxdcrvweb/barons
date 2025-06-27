import classNames from "classnames";
import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Head from "next/head";
import { UserStore } from "../../stores/UserStore";
import s from "./home.module.sass";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import Web3Store from "../../stores/WalletStore";
import { addressSlice } from "../../utils/utilities";
import { useEffect } from "react";
import Router from "next/router";
import Home from "../index";
import LoginPageLogic from "../../components/LoginPage/loginPageLogic";

const PageWithCode: NextPage = observer((props) => {
  const walletStore = useInjection(Web3Store);
  useEffect(() => {
    walletStore.setCode(window.location.pathname.split("/")[2]);
  }, []);

  return (
    <LoginPageLogic/>
  );
});

export default PageWithCode;
