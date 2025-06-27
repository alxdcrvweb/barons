import { useInjection } from 'inversify-react'
import { observer } from 'mobx-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/mousewheel'
import Web3Store from '../../stores/WalletStore'
import { addressSlice } from '../../utils/utilities'
import { useEffect } from 'react'
import Router from 'next/router'
import { isMobile } from 'react-device-detect'
import { baseURL, CHAIN_ID } from '../../utils/config/variables'
import Image from 'next/image'
import { UserStore } from '../../stores/UserStore'
import Link from 'next/link'
const LoginPageLogic = observer(() => {
    const walletStore = useInjection(Web3Store)
    const userStore = useInjection(UserStore)
    const handleConnect = () => {
        const isExpired = localStorage.getItem('jwtTTL')
            ? Number(localStorage.getItem('jwtTTL')) - Date.now()
            : 0
        if (isExpired < 0) {
            localStorage.clear()
            Router.reload()
        }
        if (isExpired > 0) {
            walletStore.switchNetwork(CHAIN_ID).then(() => {
                console.log(
                    '%cindex.tsx line:30',
                    'color: #007acc;',
                    'not expired',
                )
                try {
                    walletStore.login('useeffect')
                } catch (e) {
                    console.log(e)
                }
            })
        }
    }
    useEffect(() => {
        // handleConnect();

        const script = document.createElement('script')
        script.src = 'assets/libs/jquery/jquery-3.6.0.min.js'
        script.async = true
        document.body.appendChild(script)
        const button = document.querySelector('walletconnect-connect__button')
        button?.removeAttribute('target')
        userStore.setLayout(false)
        console.log(walletStore.user.wallet)
        return () => {
            userStore.setLayout(true)
        }
    }, [])
    console.log(
        '%cindex.tsx line:37 userS',
        'color: #007acc;',
        userStore.layout,
    )
    useEffect(() => {
        if (
            walletStore.signed &&
            !localStorage.getItem('preventLogin') &&
            walletStore.user.wallet
        ) {
            Router.push('/mine')
        }
    }, [walletStore.signed])
    // useEffect(() => {
    //   if (localStorage.getItem("jwt")) {
    //     Router.push("/mine");
    //   }
    // }, []);
    const login = () => {
        localStorage.removeItem('preventLogin')
        walletStore.switchNetwork(CHAIN_ID).then(() => {
            if (walletStore.user.wallet && isMobile) {
                // console.log('%cindex.tsx line:80 wallet', 'color: #007acc;', walletStore.user.wallet, process.env.NEXT_PUBLIC_BACKEND);
                walletStore.sign('from button')
            } else {
                console.log(
                    '%cindex.tsx line:80 wallet',
                    'color: #007acc;',
                    'from btn',
                )
                walletStore.login('button')
            }
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
                <title>Mine Barons - P2E NFT Game</title>

                {/* wrapper */}
            </Head>
            <div
                style={{
                    position: 'absolute',
                    zIndex: 0,
                    width: '100vw',
                    height: '100vh',
                }}
            >
                <Image
                    src="/assets/images/bg/login_bg.jpg"
                    // loader={() => {
                    //   return "https://minebarons.io/src/bg/login_bg.jpg";
                    // }}
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                    placeholder="blur"
                    blurDataURL="/assets/images/bg/login_bg.jpg"
                />
            </div>
            <div
                className="wrapper wrapper--login flex-cc"
                style={{ maxHeight: '100vh', overflowY: 'hidden' }}
            >
                <div className="login-block">
                    <div className="login-block__logo" />
                    <div className="login-block__content">
                        {/* <a href="mine.html" >
              <span>Metamask Login</span>
            </a> */}
                        {!walletStore.signed ? (
                            <div className="wood-button flex-cc">
                                <Link
                                    
                                    style={{ cursor: 'pointer' }}
                                    
                                    
                                    href={'/mine'}
                                    // }}
                                >
                                    <span>DEMO VERSION</span>
                                </Link>
                            </div>
                        ) : (
                            <a
                                style={{ cursor: 'pointer' }}
                                className="wood-button flex-cc"
                                onClick={() => walletStore.resetWallet()}
                            >
                                <span>
                                    {addressSlice(walletStore.user.wallet)}
                                </span>
                            </a>
                        )}
                        {/* <div  className="login-block__join">we are currently updating, come back to us in an hour</div> */}
                        <div className="login-block__socials flex-sbc">
                            <a
                                href="https://minebarons.io/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="../../assets/images/socials/net.png"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://wiki.minebarons.io/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="../../assets/images/socials/w.png"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://minebarons.io/discord"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="../../assets/images/socials/discord.png"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://twitter.com/minebarons"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="../../assets/images/socials/twitter.png"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://t.me/minebarons"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src="../../assets/images/socials/telegram.png"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default LoginPageLogic
