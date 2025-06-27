import { bytesToHex } from "web3-utils";

const  isLocalhost = false
export const CHAIN_ID = isLocalhost ? 97 : 137
export const PROVIDER_ETH = 'https://rinkeby.infura.io/v3/42bfd4e68e454b2a8ef090507fbb9035';
// beta.minebarons.io
// mine-barons-mine-front.do.bykollab.com
export const baseURL = 
typeof window !== 'undefined'&&!window.location.href.includes('localhost') ? window.location.origin + '/' : 'https://mine-barons-mine-front.do.bykollab.com/'
export const PROVIDER_POLYGON = 'https://polygon-mainnet.g.alchemy.com/v2/BAQGU9qTWOZwWjUSd5Uef18kKdLL6B6s';
export const address = '0x2953399124F0cBB46d2CbACD8A89cF0599974963'
export const testnetAddress = "0x4A3e266B05A5330676BB16858eB8d0E01CB9caf8"
export const stakeAddress = "0x5156fD6a10Cf54C3238F993DE9B35c90d1B18bE9" 
export const polygonStakeContract = '0x79D4df95B10126ee1BCAAeC01f18180b22B7b853'
export const withdrawContract = '0xf96301ba18af1e016ec13C27686B9e158452D546'
export const packContract = '0xD735dd75DD3ec49E0d345764e6870cE158E75d31'
export const walletConnectOpts = {
    infuraId: 'f2a1029edc25430fa0aef509b40e099b', // required TODO add for Kovan/Bsscan // binance not
    network: 'Polygon',
    chainId: 137,
    rpc: {
        137: 'https://polygon-rpc.com/',
        80001: 'https://rpc-mumbai.matic.today'
    }
}
export const NETWORKS = {
    "4": PROVIDER_ETH,
    "56": "https://bsc-dataseed.binance.org/",
    "97": "https://bsc-dataseed.binance.org/",
    "137": PROVIDER_POLYGON,
    "80001": "https://rpc-mumbai.matic.today"
}

export const networksConfig = {
    137: {
        chainId: '0x89',
        code: 'mainnet',
        explorerURL: 'https://polygonscan.com/',
        metamaskSettings: {
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x89',
                chainName: 'Polygon',
                nativeCurrency: {
                    name: 'Matic',
                    symbol: 'MATIC',
                    decimals: 8
                },
                rpcUrls: ['https://polygon-rpc.com/'],
                blockExplorerUrls: ['https://polygonscan.com/']
            }]
        }
    },
    80001: {
        chainId: '0x13881',
        code: 'testnet',
        explorerURL: 'https://rpc-mumbai.matic.today',

        metamaskSettings: {
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: '0x13881',
                chainName: 'Mumbai Testnet',
                nativeCurrency: {
                    name: 'Matic',
                    symbol: 'MATIC',
                    decimals: 8
                },
                rpcUrls: ['	https://rpc-mumbai.matic.today'],
                blockExplorerUrls: ['https://mumbai.polygonscan.com/']
            }]
        }
    }
}