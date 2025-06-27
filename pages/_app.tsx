import '../styles/app.sass'
import type { AppProps } from 'next/app'
import { RootStore } from '../stores/RootStore'
import { Provider } from 'inversify-react'
import { ModalsContainer } from '../modals'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import Layout from '../components/Layout/layout'
const rootStore = new RootStore()
const container = rootStore.container

function MyApp({ Component, pageProps }: AppProps) {

    // try reconnect to web3
    const AnyComponent = Component as any;
    return (
        <Provider container={container}>
            <Layout>
                <AnyComponent {...pageProps}/>
            </Layout>            
            <ModalsContainer />
            <ToastContainer />
        </Provider>
    )
}

export default MyApp
