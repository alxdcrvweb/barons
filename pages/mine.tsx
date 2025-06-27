import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { CardStore } from "../stores/CardStore";
import Web3Store from "../stores/WalletStore";
import { handleConnect, sortedTokens } from "../components/MainPage/handlers";
import CardsRow from "../components/MainPage/cardsRow";
import { UserStore } from "../stores/UserStore";

const Mine: NextPage = observer((props) => {
  const cardStore = useInjection(CardStore);
  const walletStore = useInjection(Web3Store);
  const userStore = useInjection(UserStore);
  useEffect(()=>{
    // handleConnect()
    userStore.setLayout(true)
  },[])
 
  useEffect(() => {
    const intetval = setInterval(() => {
      if (walletStore.user.wallet) {
        cardStore.compareTokens(walletStore.user.wallet)
        
      }
    }, 30000);
    return () => {
      clearInterval(intetval);
    };
  }, []);
  // console.log('%cCraft.tsx line:42 craftCost', 'color: #007acc;', window.location);
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <link
          href="assets/images/favicon/favicon.png"
          rel="shortcut icon"
          type="image/png"
        />
        <title>Mine / Mine Barons</title>
      </Head>
      <div className="wrapper wrapper--main">
        <div className="wrapper__video flex-cc">
          <video autoPlay loop muted className="wrapper__video-player">
            <source src="assets/video/bg.mp4" type="video/mp4" />
            <source src="assets/video/bg.webm" type="video/webm" />
          </video>
        </div>
        {/* <Header /> */}
        <main className="main flex-cc">
          <div className="main__content flex-ss">
            <div className="main-cards">
              <CardsRow
                cardsArray={cardStore.stakedTokensList}
                position="top"
                staked={true}
              />
              <CardsRow
                cardsArray={cardStore.unstakedTokensList}
                position="bottom"
                staked={false}
              />
            </div>
          </div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
});

export default Mine;
