import { injectable } from 'inversify'
import {
    action,
    computed,
    configure,
    makeObservable,
    observable,
    toJS,
} from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import Web3 from 'web3'
import { v1 as uuidv1 } from 'uuid'
import { abi } from '../utils/config/abi/abi'

import {
    address,
    NETWORKS,
    polygonStakeContract,
    withdrawContract,
} from '../utils/config/variables'
import {
    capitalizeFirstLetter,
    innerBackend,
    setAuthToken,
} from '../utils/utilities'
import { getAuthToken } from '../service'
import { baseURL } from '../utils/config/variables'
import {
    sortedTokens,
    getRightName,
    getRightImage,
} from '../components/MainPage/handlers'
import { toast } from 'react-toastify'
import { stakeContractAbi } from '../utils/config/abi/stakeContractAbi'
import Router from 'next/router'
import { BaseProvider } from '@metamask/providers'
import { WebsocketProvider } from 'web3-core'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3Modal from 'web3modal'
import { isMobile } from 'react-device-detect'
import {
    getRightCardTitle,
    getRightItemName,
    res,
} from '../components/Craft/handlers'
import { IData } from '../pages/market'
import axios from 'axios'
import * as fs from 'fs'
import FormData from 'form-data'
import { withdrawAbi } from '../utils/config/abi/withdrawContract'
import { AbiItem } from 'web3-utils'
const CID = require('cids')

export interface IToken {
    token: string
    unstakedCount?: number
    image?: string
    stakedCount?: number
    count: number
}

export interface ITokenFromList {
    address?: string
    amountToken?: number | any
    count?: number | any
    date?: number
    dateStart?: number
    name?: string
    quality?: number
    staked?: boolean
    tokenId?: string
    image?: string
    changeDate?: number
    __v?: number
    _id?: string
    earth?: string
    txIncome?: boolean
    wearOut?: number
    level?: number
    type_craft?: string
    type?: string
    stamina?: number
    nameId?: number
    tokenIdContract?: number
    freezing?: boolean
    title?: string
}
export interface IForceMajor {
    production_food: number
    production_wood: number
    production_stone: number
    production_iron: number
    production_horse: number
    production_gold: number
}
export interface IMintPasses {
    'KING PASS': number
    'QUEEN PASS': number
    'MINE PASS': number
    'FARM PASS': number
}
export interface IWithdrawData {
    address: string
    nonce: number
    signature: string
    timestamp: number
    ipfs?: string
}
export interface IPacks {
    minePackBuy: number
    queenPackBuy: number
    kingPackBuy: number
    farmPackBuy: number
    tokenPackBuy: number
    initial: boolean
}
export interface IProduction {
    food: number
    wood: number
    stone: number
    iron: number
    horse: number
    gold: number
    token: string
}
configure({
    enforceActions: 'never',
})
@injectable()
export class CardStore {
    @observable user?: any | null = {
        food: 999,
        wood: 999,
        stone: 999,
        iron: 999,
        horse: 999,
        gold: 999,
    }
    @observable tokens: IToken[] = []
    @observable newTokens: IToken[] = []
    @observable approved: string[] = []
    @observable stakedPointsList: ITokenFromList[] = []
    @observable stakedTokensList: ITokenFromList[] = []
    @observable unstakedTokensList: ITokenFromList[] = []
    @observable craftTokensCompare: ITokenFromList[] = []
    @observable allPasses: number = 0
    @observable mintpasses: IMintPasses = {
        'KING PASS': 0,
        'QUEEN PASS': 0,
        'MINE PASS': 0,
        'FARM PASS': 0,
    }
    @observable provider: BaseProvider | null = null
    @observable showCards: boolean = false
    @observable packs: IPacks = {
        minePackBuy: 0,
        queenPackBuy: 0,
        kingPackBuy: 0,
        farmPackBuy: 0,
        tokenPackBuy: 0,
        initial: false,
    }
    @observable isGlobalLoaderActivated: boolean = false
    @observable forceMajor: IForceMajor = {
        production_food: 0,
        production_wood: 0,
        production_stone: 0,
        production_iron: 0,
        production_horse: 0,
        production_gold: 0,
    }
    @observable production: IProduction[] = []
    @observable web3Modal: Web3Modal | null = null
    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
    }

    //get user data'

    @action async withdrawToWallet(
        res: IWithdrawData,
        index: number,
        address?: string,
        card?: ITokenFromList,
        staked?: boolean,
    ) {
        const web3 = new Web3(
            this.provider as BaseProvider &
                WebsocketProvider &
                WalletConnectProvider,
        )
        let contract = new web3.eth.Contract(
            withdrawAbi as AbiItem[],
            withdrawContract,
        )
        console.log('%cCardStore.ts line:158 res', 'color: #007acc;', res)

        const gasPrice = parseInt(await web3.eth.getGasPrice()) * 2
        try {
            let tx = async () => {
                await contract.methods
                    .mint(
                        res.ipfs,
                        card?._id,
                        res.signature,
                        res.nonce,
                        res.timestamp,
                    )
                    .send({ from: address, gasPrice: gasPrice })
            }
            await tx().then(() => {
                this.stakeCraftCard(staked, card, card?._id).then(() => {
                    this.getWearout()
                })
            })
        } catch (e) {
            console.log(e)
            this.getWearout()
            this.unstakeTx(false, index)
        }
    }
    @action async inputToGame(
        res: IWithdrawData,
        index: number,
        address?: string,
        tokenId?: number,
        card?: ITokenFromList,
        stake?: boolean,
    ) {
        const web3 = new Web3(
            this.provider as BaseProvider &
                WebsocketProvider &
                WalletConnectProvider,
        )
        let contract = new web3.eth.Contract(
            withdrawAbi as AbiItem[],
            withdrawContract,
        )
        const gasPrice = parseInt(await web3.eth.getGasPrice()) * 2
        console.log(
            '%cCardStore.ts line:176 tokenId',
            'color: #007acc;',
            tokenId,
        )
        try {
            let tx = async () => {
                await contract.methods
                    .inputGame(tokenId, res.signature, res.nonce, res.timestamp)
                    .send({ from: address, gasPrice: gasPrice })
            }
            await tx().then(() => {
                this.stakeTx(false, index)
                this.stakeCraftCard(stake, card, card?._id).then(() => {
                    this.getWearout()
                })
            })
        } catch (e) {
            console.log(e)
            this.getWearout()
            this.stakeTx(false, index)
        }
    }
    @action async upgradeCard(id?: string) {
        setAuthToken(getAuthToken())
        try {
            const { data } = await innerBackend.post(
                `${baseURL}api/token/upgrade`,
                {
                    id: id,
                },
            )
            console.log(data)
            if (data.message === 'Not found craft') {
                toast.error("Can't upgrade NFT", { theme: 'dark' })
            } else if (data.message === 'Not enough resources') {
                toast.error(data.message, { theme: 'dark' })
            } else if (data.message === 'Repair please') {
                toast.error('You need to repair item before upgrade', {
                    theme: 'dark',
                })
            } else if (!data.message) {
                let i = this.stakedTokensList.findIndex(
                    (el) => el._id === data._id,
                )
                this.stakedTokensList[i].name = data.name
                this.stakedTokensList[i].level = data.level
                toast.success('Successfully upgraded', { theme: 'dark' })
            } else toast.error(data.message, { theme: 'dark' })
            return data
        } catch (e) {
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
            return false
        } finally {
            this.getProduction()
        }
    }
    @action async getMintPasses() {
        setAuthToken(getAuthToken())
        try {
            const { data } = await innerBackend.get(
                `${baseURL}api/token/all/user`,
            )
            let passes = ['KING PASS', 'QUEEN PASS', 'MINE PASS', 'FARM PASS']

            passes.map((type: string) => {
                //@ts-ignore
                return (this.mintpasses![type] = data.filter((el) => el.type == type,)[0]?.count? data.filter((el) => el.type == type)[0]?.count: 0)
            })
            this.getAllPasses()
        } catch (e: any) {
            console.log('%cCardStore.ts line:276 e', 'color: #007acc;', e)
        }
    }
    @action getAllPasses() {
        this.allPasses = Object.entries(this.mintpasses).reduce(
            (partialSum, a) => partialSum + a[1],
            0,
        )
    }
    @action async getFile(link: string, index: number) {
        this.unstakeTx(true, index)
        try {
            return await fetch(link)
                .then((res) => res.blob())
                .then((res) => {
                    var file = new File([res], 'file')
                    return file
                })
        } catch (e) {
            console.log('%cCardStore.ts line:245 e', 'color: #007acc;', e)
        }
    }
    @action async getInputSign(index: number, tokenId?: number) {
        setAuthToken(getAuthToken())
        this.stakeTx(true, index)
        try {
            const { data } = await innerBackend.get(
                `api/transaction/input/${tokenId}?addressContract=${withdrawContract}`,
            )
            console.log(data)
            return data
        } catch (e) {
            this.stakeTx(false, index)
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
        }
    }
    @action async withdrawFromGame(ipfs: string, index: number, id?: string) {
        setAuthToken(getAuthToken())
        try {
            const { data } = await innerBackend.get(
                `api/transaction/output/${id}?ipfs=${ipfs}&addressContract=${withdrawContract}`,
            )
            console.log(data, id, ipfs)
            return { ...data, ipfs: ipfs }
        } catch (e) {
            this.unstakeTx(false, index)
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
        }
    }
    @action async downloadToIpfs(
        index: number,
        file?: File,
        card?: ITokenFromList,
    ) {
        let form = new FormData()
        // this.income(true, index)
        form.append('file', file)
        form.append('pinataOptions', '{"cidVersion": 1}')

        try {
            const { data } = await axios({
                url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
                method: 'post',
                headers: {
                    pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
                    pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY}`,
                    'Content-Type': 'multipart/form-data',
                },
                data: form,
            })
            console.log(data)
            return this.updateIpfs(data.IpfsHash, card)
        } catch (e) {
            this.unstakeTx(false, index)
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
            return false
        }
    }
    @action async updateIpfs(ipfsHash: string, card?: ITokenFromList) {
        try {
            let traits = [
                {
                    trait_type: 'level',
                    value: card?.level,
                },
                {
                    trait_type: 'quality',
                    value: card?.quality,
                },
            ]
            console.log(ipfsHash)
            var pin = JSON.stringify({
                pinataOptions: {
                    cidVersion: 1,
                },
                pinataMetadata: {
                    name: getRightCardTitle(card?.name as string),
                    keyvalues: {
                        name: getRightCardTitle(card?.name as string),
                        image: 'https://gateway.pinata.cloud/ipfs/' + ipfsHash,
                        description: 'minebarons.io',
                    },
                },
                pinataContent: {
                    name: getRightCardTitle(card?.name as string),
                    image: 'https://gateway.pinata.cloud/ipfs/' + ipfsHash,
                    description: 'minebarons.io',
                    attributes: traits,
                },
            })
            // ({
            //   name: card?.name,
            //   image: "ipfs://"+ipfsHash,
            //   attributes: [
            //     {
            //       trait_type: "level",
            //       trait_value: card?.level,
            //     },
            //     {
            //       trait_type: "quality",
            //       trait_value: card?.quality,
            //     },
            //   ],
            // });

            const { data } = await axios({
                url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
                method: 'post',
                headers: {
                    pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
                    pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                data: pin,
            })
            console.log(data)
            return data.IpfsHash
        } catch (e) {
            console.log('%cCardStore.ts line:346 1', 'color: #007acc;', e)
        }
    }

    @action async getForceMajor() {
        // https://mine-barons-mine-front.do.bykollab.com/api/utility/
        try {
            const { data } = await axios.get(`${baseURL}api/utility`)
            return data.force_majeure
        } catch (e) {
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
        }
    }
    @action async getWearout() {
        setAuthToken(getAuthToken())
        try {
            const idList = toJS(this.craftTokensCompare).map((el) => {
                return el._id
            })
            const { data } = await innerBackend.get(
                `${baseURL}api/token/all/user`,
            )
            if (idList.length !== data.length) {
                data.map((el: any) => {
                    if (!idList.includes(el._id) && !el.staked) {
                        this.unstakedTokensList.push({
                            ...el,
                            changeDate: Date.now(),
                        })
                        this.craftTokensCompare = data
                    }
                    if (!idList.includes(el._id) && el.staked) {
                        this.stakedTokensList.push({
                            ...el,
                            changeDate: Date.now(),
                        })
                        this.craftTokensCompare = data
                    }
                })
            }

            this.unstakedTokensList.map((token: ITokenFromList, i: number) => {
                data.filter((el: ITokenFromList) => token._id == el._id).map(
                    (newToken: ITokenFromList) => {
                        if (
                            this.unstakedTokensList[i].freezing !== undefined &&
                            this.unstakedTokensList[i].freezing !==
                                newToken.freezing
                        ) {
                            this.unstakedTokensList[i].freezing =
                                newToken.freezing
                        }
                        if (
                            this.unstakedTokensList[i].tokenIdContract !==
                            newToken.tokenIdContract
                        ) {
                            this.unstakedTokensList[i].tokenIdContract =
                                newToken.tokenIdContract
                        }
                        if (
                            this.unstakedTokensList[i].staked !==
                            newToken.staked
                        ) {
                            this.unstakedTokensList.splice(i, 1)
                            this.stakedTokensList.push({
                                ...newToken,
                                changeDate: Date.now(),
                            })
                        }
                    },
                )
            })
            // console.log('%cCardStore.ts line:160 object', 'color: #007acc;', this.stakedTokensList, this.unstakedTokensList);
            this.stakedTokensList.map((token: ITokenFromList, i: number) => {
                data.filter(
                    (el: ITokenFromList) => token._id == el._id,

                    //|| token.freezing !== el.freezing
                ).map((newToken: ITokenFromList) => {
                    this.stakedTokensList[i].wearOut = newToken.wearOut
                    this.stakedTokensList[i].level = newToken.level
                    this.stakedTokensList[i].freezing = newToken.freezing
                    if (
                        this.stakedTokensList[i].tokenIdContract !==
                        newToken.tokenIdContract
                    ) {
                        this.stakedTokensList[i].tokenIdContract =
                            newToken.tokenIdContract
                    }

                    if (this.stakedTokensList[i].staked !== newToken.staked) {
                        this.stakedTokensList.splice(i, 1)
                        this.unstakedTokensList.push({
                            ...newToken,
                            changeDate: Date.now(),
                        })
                    }
                })
            })
        } catch (e) {
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
        }
    }
    @action async repairAll() {
        setAuthToken(getAuthToken())
        try {
            const { data } = await innerBackend.post(
                `${baseURL}api/token/repair`,
            )
            console.log(data)
            return data
        } catch (e) {
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
        }
    }
    @action async openPack(packName?: string) {
        setAuthToken(getAuthToken())
        console.log(
            '%cCardStore.ts line:402 packName',
            'color: #007acc;',
            packName,
        )
        try {
            const { data } = await innerBackend.get(
                `${baseURL}api/pack/open?name=${packName}&amount=1`,
            )
            console.log(data)
            return data
        } catch (e) {
            console.log('%cCardStore.ts line:77 e', 'color: #007acc;', e)
        }
    }
    // @action resetGlobalWareout =()=>{
    //   this.grobalWareout = 0
    // }
    @action async updateUnstakedRow() {
        console.log('compare')
        this.tokens.map((el, i) => {
            if (this.newTokens[i]?.count - el.count > 0) {
                console.log(2 === this.newTokens[i]?.count - el.count)
                let c = 0
                while (c < this.newTokens[i]?.count - el.count) {
                    console.log(i)
                    this.unstakedTokensList.push({
                        tokenId: el.token,
                        changeDate: Date.now(),
                        count: 1,
                        image: getRightImage(el.token),
                    })
                    c++
                }
                // console.log(this.newTokens[i].count-el.count);
            } else if (this.newTokens[i]?.count - el.count < 0) {
                for (let i = 0; i < el.count - this.newTokens[i]?.count; i++) {
                    const indexOfObject = this.unstakedTokensList.findIndex(
                        (object) => {
                            return object.tokenId == el.token
                        },
                    )
                    this.unstakedTokensList.map((el) => {
                        if (el.tokenId) console.log(el.tokenId)
                    })
                    console.log(indexOfObject, el.token)
                    if (indexOfObject !== -1)
                        this.unstakedTokensList.splice(indexOfObject, 1)
                }
            } else {
                console.log(el.count, this.newTokens[i]?.count)
            }
            this.tokens = this.newTokens
        })
    }
    @action async getProduction() {
        setAuthToken(getAuthToken())
        try {
            const { data } = await innerBackend.get(`${baseURL}api/product`)
            console.log(data)
            this.production = data.map((el: any) => {
                let res = el.resource
                return { ...res, token: el.token }
            })
        } catch (e) {
            console.log('%cCardStore.ts line:261 e', 'color: #007acc;', e)
        }
    }
    @action async getTokensInfo(wallet?: string) {
        const mapTokens = sortedTokens.map(async (el) => {
            return this.getMintpassesInfo(wallet, el).then((res: any) => {
                this.newTokens.push({
                    token: el,
                    count: res?.count,
                    image: res?.image,
                })
            })
        })
        const sortTokens = this.newTokens.sort((a: IToken, b: IToken) => {
            const nameA = a?.image?.toUpperCase()
            const nameB = b?.image?.toUpperCase()
            if (nameA && nameB && nameA < nameB) {
                return -1
            }

            if (nameA && nameB && nameA > nameB) {
                return 1
            }
            return 0
        })
        await Promise.all([mapTokens, sortTokens])
    }

    @action async getTokenContractInfo(wallet: string) {
        this.isGlobalLoaderActivated = true
        sortedTokens.map(async (el) => {
            // console.log('%cmine.tsx line:41 el', 'color: #007acc;', el);
            return this.getMintpassesInfo(wallet, el)
                .then((res: any) => {
                    if (res) {
                        this.tokens.push({
                            token: el,
                            count: res?.count,
                            image: res?.image,
                        })
                        this.tokens.sort((a: IToken, b: IToken) => {
                            const nameA = a?.image?.toUpperCase()
                            const nameB = b?.image?.toUpperCase()
                            if (nameA && nameB && nameA < nameB) {
                                return -1
                            }
                            if (nameA && nameB && nameA > nameB) {
                                return 1
                            }
                            return 0
                        })
                        this.setUnstakedArray(el, res.count, Date.now())
                    }
                })
                .finally(() => {
                    if (this.tokens.length === sortedTokens.length) {
                        this.getStaked()
                    }
                })
        })
    }
    @action async compareTokens(wallet?: string) {
        this.getTokensInfo(wallet).then(() => {
            const compare =
                JSON.stringify(toJS(this.newTokens)) ==
                JSON.stringify(toJS(this.tokens))
            if (!compare && this.newTokens.length !== 0) {
                this.updateUnstakedRow()
            }
            this.newTokens = []
        })
    }
    @action async getCardsInfo() {
        setAuthToken(getAuthToken())
        this.stakedPointsList = []
        try {
            const { data } = await innerBackend.get(
                `${baseURL}api/token/all/user`,
            )
            console.log('%cCardStore.ts line:71 data', 'color: #007acc;', data)
            // this.pureStakedList = data
            sortedTokens.forEach((el) => {
                let staked = data.find((token: any) => {
                    // console.log(token);
                    return token.tokenId === el
                })
                // console.log(staked.reduce((p:any, c:any) => p + c.count, 0));
                this.stakedPointsList.push({
                    name: getRightName(el),
                    amountToken: staked?.amountToken ? staked?.amountToken : 0,
                    count: staked?.count ? staked?.count : 0,
                })
            })
        } catch (e) {
            console.log(e)
        }
    }
    @action async getMintpassesInfo(wallet: string | undefined, token: string) {
        try {
            const web3 = new Web3(NETWORKS[137])
            // const web3 = new Web3(window.ethereum);
            if (!this.web3Modal) {
                this.web3Modal = new Web3Modal({
                    cacheProvider: true,
                    providerOptions: {
                        walletconnect: {
                            package: WalletConnectProvider, // required
                            options: isMobile
                                ? {
                                      infuraId:
                                          'f2a1029edc25430fa0aef509b40e099b',
                                      chainId: 137,
                                      rpc: {
                                          137: 'https://polygon-rpc.com/',
                                          80001: 'https://rpc-mumbai.matic.today',
                                      },
                                  }
                                : {},
                        },
                    },
                })
            }
            this.provider = await this?.web3Modal?.connect()
            const contract = new web3.eth.Contract(abi as any, address)
            // const {data} =  await axios.get(`
            //     https://api.opensea.io/api/v2/metadata/matic/${address}/${token}
            // `)
            // test address 0x3F518f82A814e4D4bCeFF1Fa9E3D1a002E7D4AEE
            const res = await contract.methods.balanceOf(wallet, token).call()
            return {
                count: parseInt(res),
                image: getRightImage(token),
            }
        } catch (e) {
            console.log('%cCardStore.ts line:38 e', 'color: #007acc;', e)
        }
    }
    @action async stakeTroopCard(
        staked?: boolean,
        token?: ITokenFromList,
        id?: string,
        earth_id?: string,
    ) {
        console.log(earth_id)
        setAuthToken(getAuthToken())
        let body = {
            id: id,
            staked: !staked,
            earth_id: earth_id,
        }
        try {
            const res = await innerBackend.post(
                `${baseURL}api/token/stake/troop`,
                body,
            )
            // console.log(res);
            if (!staked) {
                const indexOfObject = this.unstakedTokensList.findIndex(
                    (object) => {
                        return object._id === id
                    },
                )
                console.log(indexOfObject, res)
                if (res.data.name === 'HttpException') {
                    toast.error('Not enough recources')
                } else {
                    toast.success(
                        `${!staked ? 'Staked' : 'Unstaked'} successfully`,
                        {
                            theme: 'dark',
                        },
                    )
                }
            } else {
                const indexOfObject = this.stakedTokensList.findIndex(
                    (object) => {
                        return object._id === id
                    },
                )
                console.log(indexOfObject, res)
                if (res.data.message == 'Repair please') {
                    toast.error('You need to repair item before unstake', {
                        theme: 'dark',
                    })
                } else if (res.data.message == 'Not enough recources') {
                    toast.error('Not enough recources', {
                        theme: 'dark',
                    })
                } else {
                    toast.success(
                        `${!staked ? 'Staked' : 'Unstaked'} successfully`,
                        {
                            theme: 'dark',
                        },
                    )
                }
            }

            return true
            // this.getCraftedNFTs()
        } catch (e) {
            console.log('%cCardStore.ts line:38 e', 'color: #007acc;', e)
            return false
        } finally {
            this.getProduction()
        }
    }
    @action async stakeCraftCard(
        staked?: boolean,
        token?: ITokenFromList,
        id?: string,
    ) {
        setAuthToken(getAuthToken())
        let body = {
            id: id,
            staked: !staked,
        }
        try {
            const res = await innerBackend.post(
                `${baseURL}api/token/stake`,
                body,
            )
            // console.log(res);
            if (!staked) {
                const indexOfObject = this.unstakedTokensList.findIndex(
                    (object) => {
                        return object._id === id
                    },
                )
                console.log(indexOfObject, res)
                if (res.data.name === 'HttpException') {
                    toast.error('Not enough recources')
                } else {
                    toast.success(
                        `${!staked ? 'Staked' : 'Unstaked'} successfully`,
                        {
                            theme: 'dark',
                        },
                    )
                }
            } else {
                const indexOfObject = this.stakedTokensList.findIndex(
                    (object) => {
                        return object._id === id
                    },
                )
                console.log(indexOfObject, res)
                if (res.data.message == 'Repair please') {
                    toast.error('You need to repair item before unstake', {
                        theme: 'dark',
                    })
                } else if (res.data.message == 'Not enough recources') {
                    toast.error('Not enough recources', {
                        theme: 'dark',
                    })
                } else {
                    toast.success(
                        `${!staked ? 'Staked' : 'Unstaked'} successfully`,
                        {
                            theme: 'dark',
                        },
                    )
                }
            }

            return true
            // this.getCraftedNFTs()
        } catch (e) {
            console.log('%cCardStore.ts line:38 e', 'color: #007acc;', e)
            return false
        } finally {
            this.getProduction()
        }
    }
    @action async stakeTx(arg: boolean, index: number) {
        console.log('hi unstaked card freeze' + index)
        let editToken = this.unstakedTokensList.sort(
            (a: ITokenFromList, b: ITokenFromList) => {
                return Number(b?.changeDate) - Number(a.changeDate)
            },
        )[index]
        console.log(
            '%cCardStore.ts line:659 editToken',
            'color: #007acc;',
            editToken,
        )
        this.unstakedTokensList.sort((a: ITokenFromList, b: ITokenFromList) => {
            return Number(b?.changeDate) - Number(a.changeDate)
        })[index] = { ...editToken, txIncome: arg }
        console.log(
            '%cCardStore.ts line:682  ...editToken, txIncome: arg }',
            'color: #007acc;',
            { ...editToken, txIncome: arg },
        )
    }
    @action async unstakeTx(arg: boolean, index: number) {
        let editToken = this.stakedTokensList.sort(
            (a: ITokenFromList, b: ITokenFromList) => {
                return Number(b?.changeDate) - Number(a.changeDate)
            },
        )[index]
        this.stakedTokensList.sort((a: ITokenFromList, b: ITokenFromList) => {
            return Number(b?.changeDate) - Number(a.changeDate)
        })[index] = { ...editToken, txIncome: arg }
    }
    @action async stakeCardToContract(
        staked: boolean,
        card: ITokenFromList,
        index: number,
        wallet?: string,
        token?: string,
    ) {
        console.log(index)
        try {
            const web3 = new Web3(
                this.provider as BaseProvider &
                    WebsocketProvider &
                    WalletConnectProvider,
            )
            const stakeContract = new web3.eth.Contract(
                stakeContractAbi as any,
                polygonStakeContract,
            )
            const mintContract = new web3.eth.Contract(abi as any, address)
            const gasPrice = parseInt(await web3.eth.getGasPrice()) * 2
            const gas = await mintContract?.methods
                .setApprovalForAll(polygonStakeContract, true)
                .estimateGas({})
            const isApproved = await mintContract?.methods
                .isApprovedForAll(wallet, polygonStakeContract)
                .call()
            try {
                if (!staked) {
                    this.stakeTx(true, index)
                    const approve = async () => {
                        try {
                            if (!isApproved) {
                                const res = await mintContract.methods
                                    .setApprovalForAll(
                                        polygonStakeContract,
                                        true,
                                    )
                                    .send({
                                        from: wallet,
                                        gas: gas,
                                        gasPrice: gasPrice,
                                    })
                                return res
                            } else return true
                        } catch (e: any) {
                            console.log(e)
                            if (e?.message?.includes('Cannot set properties')) {
                                toast.error('Please confirm transaction', {
                                    theme: 'dark',
                                })
                            } else {
                                toast.error(e?.message, { theme: 'dark' })
                            }
                            this.stakeTx(false, index)
                        }
                    }
                    approve().then((res: any) => {
                        if (res) {
                            console.log(res)
                            if (typeof token == 'string')
                                this.approved.push(token)
                            const stake = async () => {
                                try {
                                    await stakeContract?.methods
                                        .stake(token, 1)
                                        .send({
                                            from: wallet,
                                            gasPrice: gasPrice,
                                        })

                                    return true
                                } catch (e: any) {
                                    console.log(e)
                                    this.stakeTx(false, index)
                                    if (
                                        e?.message?.includes(
                                            'Cannot set properties',
                                        )
                                    ) {
                                        toast.error(
                                            'Please confirm transaction',
                                            {
                                                theme: 'dark',
                                            },
                                        )
                                    } else {
                                        toast.error(e.message, {
                                            theme: 'dark',
                                        })
                                    }
                                    return false
                                }
                            }
                            stake().then((res: boolean) => {
                                if (res) {
                                    this.unstakedTokensList
                                        .sort(
                                            (
                                                a: ITokenFromList,
                                                b: ITokenFromList,
                                            ) =>
                                                Number(b?.changeDate) -
                                                Number(a.changeDate),
                                        )
                                        .splice(index, 1)
                                    this.stakedTokensList.push({
                                        ...card,
                                        changeDate: Date.now(),
                                    })
                                    toast.success('Staked Successfully', {
                                        theme: 'dark',
                                    })
                                }
                            })
                        }
                    })
                } else {
                    this.unstakeTx(true, index)
                    const unstake = async () => {
                        try {
                            await stakeContract?.methods
                                .unstake(token, 1)
                                .send({ from: wallet, gasPrice: gasPrice })

                            return true
                        } catch (e: any) {
                            if (e?.message?.includes('Cannot set properties')) {
                                toast.error('Please confirm transaction', {
                                    theme: 'dark',
                                })
                            } else {
                                toast.error(e.message, { theme: 'dark' })
                            }
                            this.unstakeTx(false, index)
                            console.log(e)
                            return false
                        }
                    }
                    unstake().then((res: boolean) => {
                        if (res) {
                            this.stakedTokensList
                                .sort(
                                    (a: ITokenFromList, b: ITokenFromList) =>
                                        Number(b?.changeDate) -
                                        Number(a.changeDate),
                                )
                                .splice(index, 1)
                            this.getTokensInfo(wallet).then(() => {
                                const compare =
                                    JSON.stringify(toJS(this.newTokens)) ==
                                    JSON.stringify(toJS(this.tokens))
                                if (!compare && this.newTokens.length !== 0) {
                                    this.updateUnstakedRow()
                                }
                                this.newTokens = []
                            })
                            toast.success('Unstaked Succesfully', {
                                theme: 'dark',
                            })
                        }
                    })
                }
            } catch (e: any) {
                console.log('%cCardStore.ts line:51 e', 'color: #007acc;', e)
                toast.error(e.message, { theme: 'dark' })

                if (!staked) {
                    this.stakeTx(false, index)
                } else {
                    this.unstakeTx(false, index)
                }
            }
        } catch (e) {
            console.log(e)
        }
        // const web3 = new Web3(window.ethereum);
    }
    @action setUnstakedArray(el: string, count: number, date: number) {
        for (let i = 0; i < count; i++) {
            console.log(i, count)
            this.unstakedTokensList.push({
                tokenId: el,
                count: count,
                changeDate: date,
            })
        }
    }
    @action async getPacks(date: number, _id?: string) {
        console.log('object')
        let packs = ['queen', 'king', 'farm', 'mine', 'token']
        packs.map((el) => {
            let param = el + 'PackBuy'
            let name = 'pack_' + el
            let title = capitalizeFirstLetter(el) + ' pack'
            //@ts-ignore
            if (this?.user[param] && this.packs[param] < this?.user[param]) {
                //@ts-ignore
                for ( let i = 0; i < this?.user[param] - this.packs[param]; i++) {
                    this.unstakedTokensList.push({
                        type_craft: 'pack',
                        name: name,
                        title: title,
                        staked: false,
                        changeDate: date,
                        _id: uuidv1(),
                    })
                }
            }
            if (_id) {
                let i = this.unstakedTokensList.findIndex((el) => el._id == _id)
                console.log(i, _id)
                if (i >= 0) {
                    this.unstakedTokensList.splice(i, 1)
                }
            }
        })
        this.packs = {
            ...this.packs,
            initial: true,
        }
    }

    @action async getResources(_id?: string) {
        setAuthToken(getAuthToken())
        const getUser = async () => {
            try {
                const res = await innerBackend.get(`${baseURL}api/user/user/me`)
                let user = res.data.user
                // delete user.gold
                let newUser = Object.assign({ gold: res.data.user.gold }, user)
                this.user = newUser
                return { res: true, _id: _id }
            } catch (e) {
                console.log('%cCardStore.ts line:38 e', 'color: #007acc;', e)
                localStorage.clear()
                localStorage.setItem('preventLogin', 'true')
                return { res: false, _id: _id }
            }
        }
        getUser().then((res) => {
            if (res.res) {
                this.getPacks(Date.now(), res?._id).then(() => {
                    this.packs.farmPackBuy = this.user.farmPackBuy
                        ? this.user.farmPackBuy
                        : 0
                    this.packs.kingPackBuy = this.user.kingPackBuy
                        ? this.user.kingPackBuy
                        : 0
                    this.packs.minePackBuy = this.user.minePackBuy
                        ? this.user.minePackBuy
                        : 0
                    this.packs.queenPackBuy = this.user.queenPackBuy
                        ? this.user.queenPackBuy
                        : 0
                    this.packs.tokenPackBuy = this.user.tokenPackBuy
                        ? this.user.tokenPackBuy
                        : 0
                })
            }
        })
    }
    async craftSomeNFT(name?: string) {
        setAuthToken(getAuthToken())
        let body = {
            name: name,
        }
        try {
            const res = await innerBackend.post(`${baseURL}api/token`, body)
            if (res.data.count) {
                this.getWearout()
                return 'Succesfully Crafted'
            }
            if (res?.data?.message === 'Not enough resources')
                return res?.data?.message
        } catch (e) {
            console.log('%cCardStore.ts line:38 e', 'color: #007acc;', e)
        } finally {
            this.getProduction()
        }
    }
    @action async getStaked() {
        setAuthToken(getAuthToken())
        try {
            const { data } = await innerBackend.get(
                `${baseURL}api/token/all/user`,
            )
            this.craftTokensCompare = data
            //
            if (data.length !== 0) {
                data.forEach((obj: ITokenFromList) => {
                    for (let i = 0; i < obj.count; i++) {
                        if (!obj.tokenId && !obj.staked) {
                            let unstakedCard = {
                                ...obj,
                                changeDate: Date.now(),
                            }
                            this.unstakedTokensList.push(unstakedCard)
                        } else {
                            this.stakedTokensList.push({
                                ...obj,
                                changeDate: Date.now(),
                            })
                        }
                    }
                })
            } else {
                this.tokens.forEach((el: any, i: number) => {
                    this.tokens[i].unstakedCount = this.tokens[i].count
                })
            }
            // ;
        } catch (e) {
            console.log('%cCardStore.ts line:51 e', 'color: #007acc;', e)
        } finally {
            this.showCards = true
            this.getProduction()
        }
    }
}
