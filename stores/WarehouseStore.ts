
  import { injectable } from 'inversify'
import {  action, configure, makeObservable, observable } from 'mobx'
import 'reflect-metadata'
import { RootStore } from './RootStore'
import {fetchProfile, IFetchProfileResponseData} from "../api/profile";
import { getAuthToken } from '../service';
import { innerBackend, setAuthToken } from '../utils/utilities';
import { baseURL } from '../utils/config/variables';
import { IData } from '../pages/market';
import { toast } from 'react-toastify';

configure({
    enforceActions: "never",
  })
@injectable()
export class WarehouseStore {
    @observable storage?: any | null = null
    @observable treasury?: any | null = null
    public constructor(private readonly rootStore: RootStore) {
        makeObservable(this)
    }
    
    @action async getTreasuryData() {
      setAuthToken(getAuthToken());
      try {
        const res = await innerBackend.get(`${baseURL}api/treasury/claim/summ`);
        console.log(res);
        if(!res.data.message) {
          this.treasury = res.data
        } else {
          this.treasury = {
            food: 0,
            gold: 0,
            horse: 0,
            iron: 0,
            stone: 0,
            wood: 0
          }
        }
        
      } catch (e) {
        console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      }
    }
    @action async getStorageData() {
        setAuthToken(getAuthToken());
        try {
          const res = await innerBackend.get(`${baseURL}api/storage`);
          console.log(res);
          this.storage = res.data
        } catch (e) {
          console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
        }
      }
      @action async claimFromTreasury(body:IData) {
        setAuthToken(getAuthToken());
        try {
          const res = await innerBackend.post(`${baseURL}api/treasury/claim`, body);
          console.log(res);
          if(res?.data?.name === "HttpException" ) {
            // toast.error(res?.data.message, {theme:'dark'})
            return false

          } else {
            return true
          }
         
        } catch (e) {
          console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
          // toast.error("Server error", {theme:'dark'})
          return false
        }
      }
    @action async claimFromStorage(body:IData) {
        setAuthToken(getAuthToken());
        try {
          const res = await innerBackend.post(`${baseURL}api/storage/claim `, body);
          console.log(res);
          if(res?.data?.name === "HttpException" ) {
            toast.error(res?.data.message, {theme:'dark'})
            return false

          } else {
            return true
          }
         
        } catch (e) {
          console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
          // toast.error("Server error", {theme:'dark'})
          return false
        }
      }
}
