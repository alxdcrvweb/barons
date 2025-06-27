import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { UserStore } from '../stores/UserStore'
import { Fragment, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { CraftStore } from '../stores/CraftStore'
import {
    actualCraftNoLvls,
    getRightScheme,
    getUserField,
} from '../components/Craft/handlers'
import Image from 'next/image'
import { playSound } from '../utils/utilities'
import { handleConnect } from '../components/MainPage/handlers'
import NftCraftTable from '../components/Craft/nftCraftTable'
import PackCraftTable from '../components/Craft/packCraftTable'
import CraftButton from '../components/Craft/CraftButton'
import Web3Store from '../stores/WalletStore'
import { CardStore } from '../stores/CardStore'

const Craft: NextPage = observer(() => {
    const craftStore = useInjection(CraftStore)
    const userStore = useInjection(UserStore)
    const cardStore = useInjection(CardStore)
    const walletStore = useInjection(Web3Store)
    const [currentCraft, setCurrentCraft] = useState<string>('mine_pack')
    const [currentType, setCurrentType] = useState<string | undefined>(
        'mine_pack',
    )
    const [publicSale, setPublicSale] = useState<boolean>(false)
    const [whitelisted, setWhitelisted] = useState<boolean>(false)
    const [discount, setDiscount] = useState<number>(0)
    useEffect(() => {
        if (craftStore.craftInfo?.length !== 0) {
            craftStore.setCurrentCraftCost(
                craftStore.craftInfo?.filter((el) =>
                    el[0].includes(currentType),
                )[0],
            )
        }
    }, [craftStore.craftInfo])

    const isPublicSale = () => {
        walletStore.isPublicSale().then((res) => {
            setPublicSale(res)
        })
    }
    const isWhiteList = () => {
        walletStore.isWhiteList().then((res) => {
            setWhitelisted(res)
            if (res) {
                walletStore.getDiscount().then((res) => {
                    setDiscount(Number(res))
                })
            }
        })
    }
    useEffect(() => {
        if (walletStore.provider && walletStore.user.wallet) {
            isPublicSale()
            isWhiteList()
        }
    }, [walletStore.provider, walletStore.user.wallet])
    useEffect(() => {
        if (walletStore.provider && walletStore.user.wallet) {
            isPublicSale()
            isWhiteList()
        }
    }, [currentType])
    useEffect(() => {
        // handleConnect()
        userStore.setLayout(true)
        cardStore.getMintPasses()
    }, [])
    useEffect(() => {
        craftStore.getCraftMaterials()
    }, [currentType])

    console.log(cardStore.mintpasses, cardStore.allPasses)
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

                <title>Craft / Mine Barons</title>

                {/* wrapper */}
            </Head>
            <div className="wrapper wrapper--craft">
                {/* <Image
                    src="/assets/images/bg/craft_bg.jpg"
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                /> */}
                <Image
                    src="/assets/images/bg/craft_bg.jpg"
                    layout="fill"
                    unoptimized
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/assets/images/bg/craft_bg.jpg"
                />
                {/* <Header /> */}
                <main className="main flex-cc">
                    <div className="main__content flex-ss">
                        <div className="craft-content">
                            <div className="craft-content__cards">
                                <div className="swiper-layout">
                                    <div className="craft-cards-arrow slider-arrow_prev" />
                                    <div className="craft-cards-arrow slider-arrow_next" />
                                    <Swiper
                                        className="swiper main-cards-top"
                                        slidesPerView={5}
                                        spaceBetween={20}
                                        modules={[Navigation]}
                                        watchOverflow={true}
                                        navigation={{
                                            enabled: true,
                                            prevEl: '.craft-cards-arrow.slider-arrow_prev',
                                            nextEl: '.craft-cards-arrow.slider-arrow_next',
                                        }}
                                        breakpoints={{
                                            0: {
                                                slidesPerView: 2,
                                                spaceBetween: 10,
                                            },
                                            641: {
                                                slidesPerView: 3,
                                                spaceBetween: 10,
                                            },
                                            720: {
                                                slidesPerView: 4,
                                                spaceBetween: 10,
                                            },
                                            1024: {
                                                slidesPerView: 5,
                                                spaceBetween: 10,
                                            },
                                            1440: {
                                                slidesPerView: 5,
                                                spaceBetween: 20,
                                            },
                                            1680: {
                                                slidesPerView: 5,
                                            },
                                            2480: {
                                                slidesPerView: 5,
                                            },
                                        }}
                                    >
                                        <div className="swiper-wrapper">
                                            {actualCraftNoLvls.map((el, i) => {
                                                return (
                                                    <SwiperSlide
                                                        key={i}
                                                        className="swiper-slide flex-cc"
                                                    >
                                                        <div
                                                            className="card noselect"
                                                            onClick={() => {
                                                                setCurrentType(
                                                                    'fdfdsfsdf',
                                                                )
                                                                setTimeout(
                                                                    () => {
                                                                        setCurrentCraft(
                                                                            el?.item,
                                                                        )
                                                                        setCurrentType(
                                                                            el?.type,
                                                                        )
                                                                    },
                                                                    0,
                                                                )
                                                            }}
                                                            onMouseEnter={() =>
                                                                playSound(
                                                                    'assets/sounds/card_hover_effect.wav',
                                                                    userStore.volume,
                                                                    userStore.isClicked,
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={el.link}
                                                                loader={() => {
                                                                    return el.link
                                                                }}
                                                                layout="fill"
                                                                unoptimized
                                                                placeholder="empty"
                                                                blurDataURL={
                                                                    el.placeholder
                                                                }
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                )
                                            })}
                                        </div>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="craft-content__info flex-sbs">
                                {!currentType?.includes('pack') ? (
                                    <NftCraftTable currentType={currentType} />
                                ) : (
                                    <PackCraftTable
                                        allTokens={cardStore.allPasses}
                                        currentType={currentType}
                                        whitelisted={
                                            whitelisted ||
                                            (cardStore.allPasses !== 0 &&
                                                !whitelisted)
                                        }
                                        publicSale={publicSale}
                                        price={
                                            getUserField(
                                                currentType,
                                                cardStore.mintpasses,
                                                cardStore.allPasses,
                                            ) !== 0
                                                ? walletStore.packInfo.costMp
                                                : whitelisted ||
                                                  (cardStore.allPasses !== 0 &&
                                                      !whitelisted)
                                                ? walletStore.packInfo.costWl
                                                : publicSale
                                                ? walletStore.packInfo
                                                      .costPublic
                                                : walletStore.packInfo
                                                      .costPublic
                                        }
                                        discount={discount ? discount : 0}
                                    />
                                )}

                                <div className="craft-content__info-img">
                                    <img
                                        src={getRightScheme(currentCraft)}
                                        alt=""
                                    />
                                    <div className="craft-content-buttons">
                                        {!currentCraft.includes('pack') && (
                                            <CraftButton
                                                craftText={`CRAFT`}
                                                discount={discount}
                                                currentCraft={currentCraft}
                                            />
                                        )}
                                        {currentCraft.includes('pack') && (
                                            <CraftButton
                                                currentCraft={currentCraft}
                                                craftText={`MINT`}
                                                isMp={
                                                    getUserField(
                                                        currentType,
                                                        cardStore.mintpasses,
                                                        cardStore.allPasses,
                                                    ) !== 0
                                                }
                                                firstMintWithMintpass={
                                                    !whitelisted &&
                                                    cardStore.allPasses > 0
                                                        ? true
                                                        : false
                                                }
                                                discount={
                                                    discount ? discount : 0
                                                }
                                                type={
                                                    getUserField(
                                                        currentType,
                                                        cardStore.mintpasses,
                                                        cardStore.allPasses,
                                                    ) !== 0 ||
                                                    (currentType?.includes(
                                                        'token',
                                                    ) &&
                                                        cardStore.allPasses > 0)
                                                        ? 'Mint pass'
                                                        : whitelisted ||
                                                          (cardStore.allPasses !==
                                                              0 &&
                                                              !whitelisted)
                                                        ? 'Whitelist'
                                                        : publicSale
                                                        ? 'Public sale'
                                                        : ''
                                                }
                                                disable={
                                                    getUserField(
                                                        currentType,
                                                        cardStore.mintpasses,
                                                        cardStore.allPasses,
                                                    ) !== 0 &&
                                                    walletStore.packInfo
                                                        .costMp != 0
                                                        ? false
                                                        : (whitelisted ||
                                                              (cardStore.allPasses !==
                                                                  0 &&
                                                                  !whitelisted)) &&
                                                          walletStore.packInfo
                                                              .costMp != 0
                                                        ? false
                                                        : publicSale &&
                                                          walletStore.packInfo
                                                              .costMp != 0
                                                        ? false
                                                        : true
                                                }
                                                disableReason={
                                                    walletStore.packInfo
                                                        .costMp == 0
                                                        ? 'Change network to polygon'
                                                        : !publicSale
                                                        ? 'Public sale coming soon, stake Mint Pass to join WL round'
                                                        : 'Change network to polygon'
                                                }
                                                price={
                                                    getUserField(
                                                        currentType,
                                                        cardStore.mintpasses,
                                                        cardStore.allPasses,
                                                    ) !== 0 ||
                                                    (currentType?.includes(
                                                        'token',
                                                    ) &&
                                                        cardStore.allPasses > 0)
                                                        ? walletStore.packInfo
                                                              .costMp
                                                        : whitelisted ||
                                                          (cardStore.allPasses !==
                                                              0 &&
                                                              !whitelisted)
                                                        ? walletStore.packInfo
                                                              .costWl
                                                        : publicSale
                                                        ? walletStore.packInfo
                                                              .costPublic
                                                        : 0
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
                {/* <CraftPopup visible={craftPopup} set={setCraftPopup} currentCraft={currentCraft}/> */}
            </div>
        </div>
    )
})

export default Craft
