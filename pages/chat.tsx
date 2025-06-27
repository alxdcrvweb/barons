import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller, FreeMode, Mousewheel, Navigation, Scrollbar } from 'swiper'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { UserStore } from '../stores/UserStore'
import { useInjection } from 'inversify-react'
import { checkMetamask, handleConnect } from '../components/MainPage/handlers'
import { CardStore } from '../stores/CardStore'
import { DateTime } from 'luxon'
import Selector from '../components/Map/Selector'

const Chat: NextPage = observer((props) => {
    const userStore = useInjection(UserStore)
    const cardStore = useInjection(CardStore)
    const [active, setActive] = useState(false)
    const [timeActive, setTimeActive] = useState(false)
    const [changed, setChanged] = useState(true)

    const [currentFilter, setCurrentFilter] = useState('all')
    const [currentTimeTitle, setCurrentTimeTitle] = useState('Last Day')
    const [currentTimeFilter, setCurrentTimeFilter] = useState(
        Date.now() - 86400000,
    )
    const changeType = (title: string, filter: string) => {
        setChanged(false)
        setCurrentFilter(filter)
        setActive(false)
        setTimeout(() => {
            setChanged(true)
        }, 500)
    }
    const changeTime = (title: string, filter: any) => {
        setChanged(false)
        setCurrentTimeTitle(title)
        setCurrentTimeFilter(filter)
        setTimeActive(false)
        setTimeout(() => {
            setChanged(true)
        }, 500)
    }
    console.log(
        '%cchat.tsx line:46 currentTimeFilter',
        'color: #007acc;',
        currentTimeFilter,
    )
    useEffect(() => {
        // handleConnect();
        userStore.setLayout(true)
    }, [])
    const continents = [
        { title: 'All', filter: 'all' },
        { title: 'Craft', filter: 'craft' },
        { title: 'Stake', filter: 'stake' },
        { title: 'Unstake', filter: 'unstake' },
        { title: 'Upgrade', filter: 'upgrade' },
        { title: 'Repair', filter: 'repair' },
        { title: 'Claim', filter: 'claim' },
    ]
    const time = [
        { title: 'All time', filter: false },
        { title: 'Last Day', filter: Date.now() - 86400000 },
        { title: 'Last Week', filter: Date.now() - 86400000 * 7 },
        { title: 'Last 2 Weeks', filter: Date.now() - 86400000 * 7 * 2 },
        { title: 'Last month', filter: Date.now() - 86400000 * 30 },
        { title: 'Last 3 Months', filter: Date.now() - 86400000 * 30 * 3 },
    ]
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
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="assets/fonts/fontawesome/css/font-awesome.css"
                />
                <link
                    rel="stylesheet"
                    href="assets/libs/select/jquery.nselect.css"
                />
                <title>Messages / Mine Barons</title>
            </Head>
            {/* wrapper */}
            <div className="wrapper wrapper--chat">
                <Image
                    src="/assets/images/bg/chat_bg.jpg"
                    layout="fill"
                    unoptimized
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/assets/images/bg/chat_bg.jpg"
                />
                {/* <Header /> */}
                <main className="main flex-cc">
                    <div className="main__content flex-ss">
                        <div className="chat-content">
                            <div className="chat-content__events flex-ss">
                                <div className="chat-content__events-title">
                                    Events
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: 444,
                                        marginTop: '12px',
                                        marginLeft: '130px',
                                        minWidth: '200px',
                                    }}
                                >
                                    <Selector
                                        active={active}
                                        setActive={setActive}
                                        func={changeType}
                                        currentName={currentFilter}
                                        array={continents}
                                        isMap={false}
                                    />
                                </div>
                                <div
                                    style={{
                                        position: 'absolute',
                                        zIndex: 444,
                                        marginTop: '12px',
                                        marginLeft: '280px',
                                        minWidth: '200px',
                                    }}
                                >
                                    <Selector
                                        active={timeActive}
                                        setActive={setTimeActive}
                                        func={changeTime}
                                        currentName={currentTimeTitle}
                                        array={time}
                                        isMap={false}
                                    />
                                </div>
                                <div className="chat-content__events-content">
                                    {cardStore?.user && changed && (
                                        <Swiper
                                            className="swiper events-stroke v-scrollbar"
                                            modules={[
                                                Navigation,
                                                Scrollbar,
                                                Mousewheel,
                                                Controller,
                                                FreeMode,
                                            ]}
                                            direction="vertical"
                                            slidesPerView="auto"
                                            followFinger={false}
                                            freeMode={{
                                                enabled: true,
                                                sticky: false,
                                                momentumBounce: false,
                                            }}
                                            initialSlide={2}
                                            scrollbar={{
                                                el: '.swiper-scrollbar',
                                                hide: false,
                                                draggable: true,
                                            }}
                                            mousewheel={{ sensitivity: 0.5 }}
                                        >
                                            <div className="swiper-wrapper">
                                                <SwiperSlide>
                                                    {cardStore?.user &&
                                                        cardStore?.user?.logs &&
                                                        cardStore?.user?.logs
                                                            .filter(
                                                                (el: any) => {
                                                                    if (
                                                                        currentTimeFilter
                                                                    ) {
                                                                        return (
                                                                            el.date >
                                                                            currentTimeFilter
                                                                        )
                                                                    } else {
                                                                        return true
                                                                    }
                                                                },
                                                            )
                                                            .filter(
                                                                (el: any) => {
                                                                    if (
                                                                        currentFilter !==
                                                                            'all' &&
                                                                        currentFilter !==
                                                                            'stake'
                                                                    ) {
                                                                        return el.title?.includes(
                                                                            currentFilter,
                                                                        )
                                                                    } else if (
                                                                        currentFilter ==
                                                                        'stake'
                                                                    ) {
                                                                        return (
                                                                            el.title?.slice(
                                                                                0,
                                                                                5,
                                                                            ) ==
                                                                            currentFilter
                                                                        )
                                                                    } else {
                                                                        return true
                                                                    }
                                                                },
                                                            )
                                                            .map(
                                                                (
                                                                    el: any,
                                                                    i: number,
                                                                ) => {
                                                                    // console.log('%cchat.tsx line:75 el', 'color: #007acc;', el);
                                                                    return (
                                                                        // ${i % 3 == 0 ? 'yellow': i % 3 == 1 ? 'red' : 'green'}`}
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                            className={`chat-content__events-message flex-ss ${
                                                                                el.title ==
                                                                                'claim'
                                                                                    ? 'green'
                                                                                    : 'yellow'
                                                                            }`}
                                                                        >
                                                                            <div className="chat-content__events-message-date">
                                                                                {DateTime.fromMillis(
                                                                                    el.date,
                                                                                ).toFormat(
                                                                                    'dd.LL.yyyy',
                                                                                )}
                                                                            </div>
                                                                            <div className="chat-content__events-message-time">
                                                                                {DateTime.fromMillis(
                                                                                    el.date,
                                                                                ).toFormat(
                                                                                    'hh:mm a',
                                                                                )}
                                                                            </div>
                                                                            <div className="chat-content__events-message-author">
                                                                                {
                                                                                    el.title
                                                                                }
                                                                            </div>
                                                                            <div className="chat-content__events-message-text">
                                                                                {el.text?.replace(
                                                                                    'undefined',
                                                                                    '0',
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                },
                                                            )}
                                                </SwiperSlide>

                                                <SwiperSlide />
                                            </div>
                                            <div className="swiper-scrollbar" />
                                        </Swiper>
                                    )}
                                </div>
                            </div>
                            <div className="chat-content__chat">
                                <div className="chat-content__chat-title">
                                    Barons chat
                                </div>
                                <div className="chat-content__chat-content">
                                    <Swiper
                                        className="swiper event-stroke v-scrollbar"
                                        modules={[
                                            Navigation,
                                            Scrollbar,
                                            Mousewheel,
                                            Controller,
                                            FreeMode,
                                        ]}
                                        direction="vertical"
                                        freeMode={{
                                            enabled: true,
                                            // sticky: false,
                                            momentumBounce: false,
                                        }}
                                        initialSlide={0}
                                        scrollbar={{
                                            el: '.swiper-scrollbar',
                                            hide: false,
                                            draggable: true,
                                        }}
                                        mousewheel={{ sensitivity: 1 }}
                                    >
                                        <div className="swiper-wrapper">
                                            <SwiperSlide className="swiper-slide">
                                                <div className="chat-content__chat-message flex-ss">
                                                    <div className="chat-content__chat-message-date">
                                                        14.01.2022{' '}
                                                        <span>12:01</span>
                                                    </div>
                                                    <div className="chat-content__chat-message-author red">
                                                        [aurin] Kingdom
                                                    </div>
                                                    <div className="chat-content__chat-message-text">
                                                        It is a long established
                                                        fact that a reader will
                                                        be distracted by the
                                                        readable content of a
                                                        page when looking at its
                                                        layout.
                                                    </div>
                                                </div>
                                                <div className="chat-content__chat-message flex-ss">
                                                    <div className="chat-content__chat-message-date">
                                                        14.01.2022{' '}
                                                        <span>12:01</span>
                                                    </div>
                                                    <div className="chat-content__chat-message-author red">
                                                        [aurin] Kingdom
                                                    </div>
                                                    <div className="chat-content__chat-message-text">
                                                        There are many
                                                        variations of passages
                                                        of Lorem Ipsum
                                                        available...
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                        <div className="swiper-scrollbar" />
                                    </Swiper>
                                    <div className="chat-content__chat-content-form">
                                        <form className="flex-sbc">
                                            <input type="text" />
                                            <button className="color-button green flex-cc">
                                                <span>Send</span>
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    )
})

export default Chat
