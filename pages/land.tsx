import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'

import Table from '../components/LandPage/table'
import Kingdom from '../components/LandPage/kingdom'
import CardsLine from '../components/LandPage/cards'

import KingdomPopup from '../components/LandPage/kingdomPopup'

import { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import Image from 'next/image'
import { UserStore } from '../stores/UserStore'
import { useInjection } from 'inversify-react'
import { handleConnect } from '../components/MainPage/handlers'
import { CardStore } from '../stores/CardStore'

const Land: NextPage = observer((props) => {
    const [kingdomPopupOnen, setKingdomPopupOnen] = useState(false)
    const userStore = useInjection(UserStore)
    const cardStore = useInjection(CardStore)
    useEffect(() => {
        // handleConnect()
        userStore.setLayout(true)
    }, [])
    return (
        <div>
            <Head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    httpEquiv="Content-Type"
                    content="text/html; charset=utf-8"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="format-detection" content="telephone=no" />
                <link
                    href="assets/images/favicon/favicon.png"
                    rel="shortcut icon"
                    type="image/png"
                />
                <title>Land / Mine Barons</title>
            </Head>
            {/* wrapper */}
            <div className="wrapper wrapper--war">
                <Image
                    src="/assets/images/bg/war_bg.jpg"

                    layout="fill"
                    unoptimized
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/assets/images/bg/war_bg.jpg"
                />

                {/* <Header/> */}
                <main className="main flex-cc">
                    <div className="main__content flex-ss">
                        <div className="war-content">
                            <Table />
                            <div className="war-content__kingdom flex-sbs">
                                <Kingdom
                                    set={setKingdomPopupOnen}
                                    visible={kingdomPopupOnen}
                                />
                                <div className="war-content__kingdom-cards">
                                    <CardsLine
                                        cardsArray={cardStore.stakedTokensList.filter(
                                            (el) => el.type_craft === 'troops',
                                        )}
                                        staked={true}
                                    ></CardsLine>
                                    <CardsLine
                                        cardsArray={cardStore.unstakedTokensList.filter(
                                            (el) => el.type_craft === 'troops',
                                        )}
                                        staked={false}
                                    ></CardsLine>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer/> */}
            </div>
            {/* end wrapper */}
            {/* popup */}
            {kingdomPopupOnen && (
                <KingdomPopup
                    set={setKingdomPopupOnen}
                    visible={kingdomPopupOnen}
                />
            )}
        </div>
    )
})

export default Land
