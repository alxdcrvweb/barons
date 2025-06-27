import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useInjection } from 'inversify-react'
import { CardStore } from '../stores/CardStore'
import { WarehouseStore } from '../stores/WarehouseStore'
import { toast } from 'react-toastify'
import { ModalStore } from '../stores/ModalStore'
import { ModalsEnum } from '../modals'
import { UserStore } from '../stores/UserStore'
import { handleConnect } from '../components/MainPage/handlers'
export interface IData {
    gold: number | string
    wood: number | string
    stone: number | string
    iron: number | string
    food: number | string
    horse: number | string
}
const Market: NextPage = observer((props) => {
    const warehouseStore = useInjection(WarehouseStore)
    const modalStore = useInjection(ModalStore)
    const emptyData = {
        gold: 0,
        wood: 0,
        stone: 0,
        iron: 0,
        food: 0,
        horse: 0,
    }
    const [treasuryData, setTreasuryData] = useState<IData>(emptyData)
    const [staticData, setStaticData] = useState<IData>(emptyData)
    const [data, setData] = useState<IData>(emptyData)
    const [allProduction, setAllProduction] = useState<number>(0)
    const userStore = useInjection(UserStore)
    useEffect(() => {
        // handleConnect()
        // warehouseStore.getStorageData()
        // warehouseStore.getTreasuryData()
        userStore.setLayout(true)
        // let int = setInterval(() => {
        //     warehouseStore.getTreasuryData()
        //     warehouseStore.getStorageData()
        // }, 60000)
        // return () => clearInterval(int)
    }, [])
    useEffect(() => {
        if (warehouseStore.storage) {
            console.log(warehouseStore.storage)
            setStaticData(warehouseStore.storage)
        }
    }, [warehouseStore.storage])
    useEffect(() => {
        if (warehouseStore.treasury) {
            console.log(warehouseStore.storage)
            setTreasuryData(warehouseStore.treasury)
        }
    }, [warehouseStore.treasury])
    useEffect(() => {
        setAllProduction(
            Object.entries(staticData)
                .filter(
                    (el) =>
                        el[0] !== '_id' &&
                        el[0] !== 'time_claim' &&
                        el[0] !== '__v' &&
                        el[0] !== 'user' &&
                        el[0] !== 'amountToken',
                )
                .reduce((partialSum, a) => partialSum + a[1], 0),
        )
    }, [staticData])

    const changeField = (value: string, field: string) => {
        if (value !== '') {
            setData({ ...data, [field]: parseFloat(value) })
        } else {
            setData({ ...data, [field]: 0 })
        }
    }
    const claim = () => {
        modalStore.showModal(ModalsEnum.Claim, {
            data: staticData,
            treasury: treasuryData,
        })
    }
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
                <title>Market / Mine Barons</title>
            </Head>
            <div className="wrapper wrapper--market">
                <Image
                    src="/assets/images/bg/market_bg.jpg"
                    layout="fill"
                    unoptimized
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/assets/images/bg/market_bg.jpg"
                />
                {/* <Header /> */}
                <main className="main flex-cc">
                    <div className="main__content flex-ss">
                        <div className="market-content">
                            <div className="market-content-title">Market</div>
                            <div className="market-content-table flex-ss">
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cc" />
                                        <div className="market-content-col-treasury flex-cc">
                                            <span>Baron's treasury</span>
                                        </div>
                                        <div className="market-content-col-warehous flex-cc">
                                            <span>warehouse</span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input" />
                                </div>
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cs">
                                            <img
                                                src="assets/images/resources/big/food.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="market-content-col-treasury flex-cc"
                                            data-title="Baron's treasury"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(treasuryData.food),
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className="market-content-col-warehous flex-cc"
                                            data-title="Warehouse"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(staticData.food),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input">
                                        <input
                                            type="number"
                                            value={data.food}
                                            onChange={(e) =>
                                                changeField(
                                                    e.target.value,
                                                    'food',
                                                )
                                            }
                                            placeholder="Sum"
                                        />
                                        {/* <div className="market-content-col-input-info">
                      0<span>to withdraw</span>
                    </div> */}
                                    </div>
                                </div>
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cs">
                                            <img
                                                src="assets/images/resources/big/wood.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="market-content-col-treasury flex-cc"
                                            data-title="Baron's treasury"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(treasuryData.wood),
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className="market-content-col-warehous flex-cc"
                                            data-title="Warehouse"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(staticData.wood),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input">
                                        <input
                                            type="number"
                                            placeholder="Sum"
                                            value={data.wood}
                                            onChange={(e) =>
                                                changeField(
                                                    e.target.value,
                                                    'wood',
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cs">
                                            <img
                                                src="assets/images/resources/big/stone.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="market-content-col-treasury flex-cc"
                                            data-title="Baron's treasury"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(treasuryData.stone),
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className="market-content-col-warehous flex-cc"
                                            data-title="Warehouse"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(staticData.stone),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input">
                                        <input
                                            type="number"
                                            placeholder="Sum"
                                            value={data.stone}
                                            onChange={(e) =>
                                                changeField(
                                                    e.target.value,
                                                    'stone',
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cs">
                                            <img
                                                src="assets/images/resources/big/coal.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="market-content-col-treasury flex-cc"
                                            data-title="Baron's treasury"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(treasuryData.iron),
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className="market-content-col-warehous flex-cc"
                                            data-title="Warehouse"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(staticData.iron),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input">
                                        <input
                                            type="number"
                                            value={data.iron}
                                            onChange={(e) =>
                                                changeField(
                                                    e.target.value,
                                                    'iron',
                                                )
                                            }
                                            placeholder="Sum"
                                        />
                                        {/* <div className="market-content-col-input-info">
                      0<span>to withdraw</span>
                    </div> */}
                                    </div>
                                </div>
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cs">
                                            <img
                                                src="assets/images/resources/big/farm.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="market-content-col-treasury flex-cc"
                                            data-title="Baron's treasury"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(treasuryData.horse),
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className="market-content-col-warehous flex-cc"
                                            data-title="Warehouse"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(staticData.horse),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input">
                                        <input
                                            type="number"
                                            placeholder="Sum"
                                            value={data.horse}
                                            onChange={(e) =>
                                                changeField(
                                                    e.target.value,
                                                    'horse',
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="market-content-col">
                                    <div className="market-content-col-info">
                                        <div className="market-content-col-icon flex-cs">
                                            <img
                                                src="assets/images/resources/big/gold.png"
                                                alt=""
                                            />
                                        </div>
                                        <div
                                            className="market-content-col-treasury flex-cc"
                                            data-title="Baron's treasury"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(treasuryData.gold),
                                                )}
                                            </span>
                                        </div>
                                        <div
                                            className="market-content-col-warehous flex-cc"
                                            data-title="Warehouse"
                                        >
                                            <span>
                                                {Math.floor(
                                                    Number(staticData.gold),
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="market-content-col-input">
                                        <input
                                            type="number"
                                            placeholder="Sum"
                                            value={data.gold}
                                            onChange={(e) =>
                                                changeField(
                                                    e.target.value,
                                                    'gold',
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="market-content-buttons flex-cc">
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className="color-button red flex-cc disable"
                                >
                                    <span>Deposit to game</span>
                                </a>
                                <a
                                    style={{ cursor: 'pointer' }}
                                    className="color-button green flex-cc disable"
                                >
                                    <span>Withdraw to wallet</span>
                                </a>
                                <a
                                    style={{ cursor: 'pointer' }}
                                    onClick={claim}
                                    className={`color-button yellow flex-cc ${
                                        allProduction !== 0 ? '' : 'disable'
                                    }`}
                                >
                                    <span>Claim</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    )
})

export default Market
