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
import { useEffect, useState } from "react";
import Router from "next/router";
import Home from "../index";
import LoginPageLogic from "../../components/LoginPage/loginPageLogic";
import ScriptPage from "../../components/Script/script";

const Script: NextPage = observer((props) => {
  const userStore = useInjection(UserStore)
  const [title, setTitle] = useState('Wrong request')
  const [resource, setResource] = useState('')
  useEffect(() => {
    
    let req = window.location.pathname + window.location.search
    if(req.includes('script') && req.includes('total') && !req.includes('count')) {
      userStore.getTotalInfo(req)
      setTitle('Total Amount')
      console.log('%c[...id].tsx line:31 req', 'color: #007acc;', req.split('=')[1]);
      setResource(req.split('=')[1])
    }
    if(req.includes('script') && req.includes('wallet') && !req.includes('count')) {
      userStore.getWalletInfo(req)
      setTitle('Wallet Info')
    }
  }, []);
  return (
    <ScriptPage title={title} resource={resource}/>
  );
});

export default Script;
