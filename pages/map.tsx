import { Controller, Mousewheel, Navigation, Scrollbar, FreeMode } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import { LandsStore } from '../stores/LandsStore'
import { UserStore } from '../stores/UserStore'
import { handleConnect } from '../components/MainPage/handlers'
import Selector from '../components/Map/Selector'
import Head from 'next/head'

const Map = observer(() => {
    const landsStore = useInjection(LandsStore)
    const [currentFilter, setCurrentFilter] = useState('first')
    const [currentContinent, setCurrentContinent] = useState('Continent 1')
    const [active, setActive] = useState<boolean>(false)
    const userStore = useInjection(UserStore)
    const changeContinent = (title: string, filter: string) => {
        setCurrentContinent(title)
        setCurrentFilter(filter)
        setActive(false)
        landsStore.setResettleLand(-1, '')
    }
    useEffect(() => {
        // handleConnect();
        userStore.setLayout(true)
    }, [])
    const continents = [
        { title: 'Continent 1', filter: 'first' },
        { title: 'Continent 2', filter: 'second' },
        { title: 'Continent 3', filter: 'third' },
        { title: 'Continent 4', filter: 'fourth' },
        { title: 'Continent 5', filter: 'fifth' },
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
                <title>Map / Mine Barons</title>
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="assets/fonts/fontawesome/css/font-awesome.css"
                />
                <link
                    rel="stylesheet"
                    href="assets/libs/select/jquery.nselect.css"
                />
            </Head>

            {/* wrapper */}
            <div className="wrapper wrapper--land">
                <Image
                    src="/assets/images/bg/map_bg.jpg"
                    layout="fill"
                    unoptimized
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/assets/images/bg/map_bg.jpg"
                />
                {/* <Header /> */}
                <main className="main flex-cc">
                    <div className="main__content flex-ss">
                        <div className="land-content">
                            <div className="land-content__title">
                                <div className=" flex-sc">
                                    <Selector
                                        active={active}
                                        setActive={setActive}
                                        isMap={true}
                                        func={changeContinent}
                                        currentName={currentContinent}
                                        array={continents}
                                    />
                                    <div className="land-content__col flex-cc res">
                                        <span>Tax</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>Defence</span>
                                    </div>
                                    <div className="land-content__col flex-cc">
                                        <span>Status</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>MBF</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>MBW</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>MBS</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>MBI</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>MBH</span>
                                    </div>
                                    <div className="land-content__col flex-cc res">
                                        <span>MBG</span>
                                    </div>
                                </div>
                            </div>
                            <div className="land-content__table">
                                <Swiper
                                    className="swiper land-stroke v-scrollbar"
                                    direction="vertical"
                                    slidesPerView="auto"
                                    modules={[
                                        Navigation,
                                        Scrollbar,
                                        Mousewheel,
                                        Controller,
                                        FreeMode,
                                    ]}
                                    freeMode={{
                                        enabled: true,
                                        sticky: false,
                                        momentumBounce: true,
                                    }}
                                    scrollbar={{
                                        el: '.swiper-scrollbar',
                                        hide: false,
                                        draggable: true,
                                        snapOnRelease: false,
                                    }}
                                    mousewheel={true}
                                >
                                    <div className="swiper-wrapper">
                                        <SwiperSlide className="swiper-slide">
                                            {landsStore.lands?.length !== 0
                                                ? landsStore.lands
                                                      ?.filter(
                                                          (el) =>
                                                              el.continent ===
                                                              currentFilter,
                                                      )
                                                      .map((el, i) => {
                                                          return (
                                                              <div
                                                                  className="land-content__line flex-sc "
                                                                  key={i}
                                                                  style={
                                                                      el.number ==
                                                                      landsStore
                                                                          .resettleLand
                                                                          ?.num
                                                                          ? {
                                                                                backgroundColor:
                                                                                    'rgba(0, 0, 0, 0.3)',
                                                                            }
                                                                          : {
                                                                                opacity: 1,
                                                                            }
                                                                  }
                                                                  onClick={() => {
                                                                      landsStore.setResettleLand(
                                                                          el.number,
                                                                          el._id,
                                                                      )
                                                                  }}
                                                              >
                                                                  <div
                                                                      className="land-content__col flex-sc"
                                                                      data-name="Continent"
                                                                  >
                                                                      <span>
                                                                          Kingdom{' '}
                                                                          {
                                                                              el.number
                                                                          }
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Tax"
                                                                  >
                                                                      <span>
                                                                          {el
                                                                              ?.baron
                                                                              ?.commission
                                                                              ? el
                                                                                    ?.baron
                                                                                    ?.commission
                                                                              : 0}
                                                                          %
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Defence"
                                                                  >
                                                                      <span>
                                                                          {el.protection /
                                                                              100}
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc"
                                                                      data-name="Status"
                                                                  >
                                                                      <span>
                                                                          Fence
                                                                      </span>
                                                                  </div>

                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Food"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              el.food
                                                                          }
                                                                          %
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Wood"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              el.wood
                                                                          }
                                                                          %
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Stone"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              el.stone
                                                                          }
                                                                          %
                                                                      </span>
                                                                  </div>

                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Iron"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              el.iron
                                                                          }
                                                                          %
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Horse"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              el.horse
                                                                          }
                                                                          %
                                                                      </span>
                                                                  </div>
                                                                  <div
                                                                      className="land-content__col flex-cc res"
                                                                      data-name="Gold"
                                                                  >
                                                                      <span>
                                                                          {
                                                                              el.gold
                                                                          }
                                                                          %
                                                                      </span>
                                                                  </div>
                                                              </div>
                                                          )
                                                      })
                                                : Array.from({
                                                      length: 10,
                                                  }).map((el, i) => {
                                                      return (
                                                          <div
                                                              className="land-content__line flex-sc"
                                                              key={i}
                                                          >
                                                              <div
                                                                  className="land-content__col flex-sc"
                                                                  data-name="Continent"
                                                              >
                                                                  <span>
                                                                      Kingdom{' '}
                                                                      {i + 1}
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Tax"
                                                              >
                                                                  <span>
                                                                      0%
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Defence"
                                                              >
                                                                  <span>1</span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc"
                                                                  data-name="Status"
                                                              >
                                                                  <span>
                                                                      Fence
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Gold"
                                                              >
                                                                  <span>
                                                                      100%
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Food"
                                                              >
                                                                  <span>
                                                                      100%
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Stone"
                                                              >
                                                                  <span>
                                                                      100%
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Wood"
                                                              >
                                                                  <span>
                                                                      100%
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Iron"
                                                              >
                                                                  <span>
                                                                      100%
                                                                  </span>
                                                              </div>
                                                              <div
                                                                  className="land-content__col flex-cc res"
                                                                  data-name="Horse"
                                                              >
                                                                  <span>
                                                                      100%
                                                                  </span>
                                                              </div>
                                                          </div>
                                                      )
                                                  })}
                                        </SwiperSlide>
                                    </div>
                                    <div className="swiper-scrollbar" />
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </main>
                {/* <Footer /> */}
            </div>
        </div>
    )
})
export default Map
