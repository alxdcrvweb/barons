import { injectable } from 'inversify'
import {  configure, makeObservable, observable } from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import {fetchProfile, IFetchProfileResponseData} from "../api/profile";
import { getAuthToken } from '../service';
import { innerBackend, setAuthToken } from '../utils/utilities';
import { baseURL } from '../utils/config/variables';
import { toast } from 'react-toastify';

configure({
    enforceActions: "never",
  })
interface ICustomUserResInfo {
    Food: number
    Wood: number
    Stone: number
    Iron: number
    Horse: number
    Gold: number
}
interface ICustomUserPacksInfo {
    "Farm packs open"?: number
    "Farm packs left"?: number
    "Token packs open"?: number
    "Token packs left"?: number
    "Queen packs open"?: number
    "Queen packs left"?: number
    "King packs open"?: number
    "King packs left"?: number
    "Mine packs open"?: number
    "Mine packs left"?: number
}
@injectable()
export class UserStore {
    @observable customUserResInfo?: ICustomUserResInfo | null = null
    @observable customUserPassInfo?:any[] = []
    @observable customUserTokenInfo?:any[] = []
    @observable customUserPacksInfo?: ICustomUserPacksInfo | null = null
    @observable total?: number
    @observable user?: IFetchProfileResponseData | null = null
    @observable sound?: boolean = true
    @observable sparkles?: boolean = false
    @observable layout?: boolean = false
    @observable isClicked?: boolean = false
    @observable volume: number = 0.3
    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
    }
    setLayout(val:boolean) {
        this.layout = val
    }
    handleClick() {
        this.isClicked = true
    }
    //get user data
    async getUser() {
        const { data } = await fetchProfile()
        this.user = data.user
    }
    async sendItems(code:string, item:string, count:number, address:string, type: string) {
        setAuthToken(getAuthToken());
        try {
            console.log(baseURL + 'api/script/' + code +'/?' + type +"=" + item + '&count='+ count + '&wallet='+address);
            const res = await innerBackend.get(`${baseURL + 'api/script/' + code +'/?' + type +"=" + item + '&count='+ count + '&wallet='+address}`);
            if(res.data.message) {
                toast.error(res.data.message) 
            }
            else if(res.data=='') {
                toast.error('Wrong address')
            } else {
                toast.success('Success')
            }
            console.log('%cUserStore.ts line:66 object', 'color: #007acc;', res) 
        } catch (e) {
            console.log(e);
            toast.error("Server error")
        }
    }
    async getTotalInfo(req:string) {
        setAuthToken(getAuthToken());
        try {
            const res = await innerBackend.get(`${baseURL + 'api' + req}`);
            console.log('%cUserStore.ts line:66 object', 'color: #007acc;', res)
            this.total = res.data.total
        } catch (e) {
            console.log(e);
        }
    }
    async getWalletInfo(req:string) {
        setAuthToken(getAuthToken());
        try {
            const { data } = await innerBackend.get(`${baseURL + 'api' + req}`);
            console.log('%cUserStore.ts line:40 data', 'color: #007acc;', data);
            this.customUserResInfo = {
                Food: data.user.food,
                Wood: data.user.wood,
                Stone: data.user.stone,
                Iron: data.user.iron,
                Horse: data.user.horse,
                Gold: data.user.gold,
            }
            this.customUserPacksInfo = {
                "Farm packs open": data.user.farmPackOpen,
                "Farm packs left": data.user.farmPackBuy,
                "Token packs open": data.user.tokenPackOpen,
                "Token packs left": data.user.tokenPackBuy,
                "Queen packs open": data.user.queenPackOpen,
                "Queen packs left": data.user.queenPackBuy,
                "King packs open": data.user.kingPackOpen,
                "King packs left": data.user.kingPackBuy,
                "Mine packs open": data.user.kingPackOpen,
                "Mine packs left":data.user.kingPackBuy
            }
            this.customUserPassInfo = data.mintPass
            this.customUserTokenInfo = data.tokens
        } catch (e) {
            console.log(e);
        }
    }
    async changeSound(sound:boolean) {
        localStorage.setItem("sound", sound?'true':'false')
        this.sound = sound
        this.volume = sound ? 0.3 : 0
    }
    async setSparkles(sound:boolean) {
        this.sparkles = sound
    }
}
