import { injectable } from "inversify";
import { action, configure, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import axios from "axios";
import { baseURL } from "../utils/config/variables";
import { innerBackend, setAuthToken } from "../utils/utilities";
import { getAuthToken } from "../service";
import { toast } from "react-toastify";

configure({
  enforceActions: "never",
});
export interface ILand {
  continent: string;
  baron: any;
  commission: number;
  castle: any;
  exhaustion: {
    food_exhaustion_percentage: number;
    gold_exhaustion_percentage: number;
    horse_exhaustion_percentage: number;
    iron_exhaustion_percentage: number;
    stone_exhaustion_percentage: number;
    wood_exhaustion_percentage: number;
  };
  food: number;
  gold: number;
  horse: number;
  number?: number;
  iron: number;
  people: string[];
  protection: number;
  stone: number;
  wood: number;
  weather: {
    earth: string;
    food: number;
    gold: number;
    horse: number;
    iron: number;
    stone: number;
    wood: number;
    _id: string;
  };

  _id: string;
}
@injectable()
export class LandsStore {
  @observable lands?: any[] = [];
  @observable myBaronLands?: any[] = [];
  @observable costs?: any;
  @observable isBaron: boolean = false;
  @observable baronId?: string;
  @observable myLand?: ILand;
  @observable resettleLand?: { num: number; id: string } = { num: -1, id: "" };
  @observable currentLand?: ILand;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  //get user data
  @action async setResettleLand(num: number, id: string) {
    try {
      this.resettleLand = { num: num, id: id };
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  }
  @action async resettle(id: string) {
    setAuthToken(getAuthToken());
    try {
      const res = await innerBackend.post(`${baseURL}api/earth/relocate/${id}`);
      console.log('%cLandsStore.ts line:75 res.data', 'color: #007acc;', res.data);
      return res?.data?.earth;
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  }
  @action async castleCosts() {
    setAuthToken(getAuthToken());
    try {
      const { data } = await innerBackend.get(`${baseURL}api/castle/cost`);
      this.costs = {
        castle: data.castle,
        citadel: data.citadel,
        fortress: data.fortress,
      };
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  }
  @action async castleBuild(earth_id?:string, name?:string) {
    setAuthToken(getAuthToken());
    try {
      const res = await innerBackend.post(`${baseURL}api/castle/build`, {
        earth_id: earth_id,
        name: name,
      });
      if(res.data?.castle?.message) {
        toast.error(res.data.castle.message, {theme:'dark'})
        return false
      } else {
        toast.success(res.data.castle.name+ " was built", {theme:'dark'})
        return true
      }

    } catch (e) { 
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      return false
     
    }
  }
  @action async setCurrentLand(land: ILand) {
    try {
      this.currentLand = land;
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  }
  @action async getAllLands() {
    try {
      const res = await axios.get(`${baseURL}api/earth/`);
      console.log(res.data);
      this.lands = res.data.earth.map((el: ILand, i: number) => {
        return { ...el, number: i + 1 };
      });
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  }
  @action getResettlePrice = async (id: string) => {
    //     api/earth/relocate/:earth POST
    //  GET
    try {
      const res = await innerBackend.get(
        `${baseURL}api/earth/relocate/cost/${id}`
      );
      console.log("%cLandsStore.ts line:90 res", "color: #007acc;", res);
      return res.data;
    } catch (e) {
      console.log("%cLandsStore.ts line:91 e", "color: #007acc;", e);
      return false;
    }
  };
  @action setComission = async (tax: number, earth_id?: string) => {
    console.log(tax, earth_id);
    setAuthToken(getAuthToken());
    const body = {
      commission: tax,
      earth_id: earth_id,
    };
    try {
      const res = await innerBackend.post(`${baseURL}api/baron/change`, body);
      console.log("%cLandsStore.ts line:109 res", "color: #007acc;", res);
      if(!res.data.message) {
        return true;
      } else {
        toast.error(res.data.message, {theme:'dark'})
      }
      
    } catch (e) {
      return false;
    }
  };
  @action getAllMyLands = async () => {
    setAuthToken(getAuthToken());
    try {
      const res = await innerBackend.get(`${baseURL}api/earth/all/me`);
      console.log(
        "%cLandsStore.ts line:61 res.data",
        "color: #007acc;",
        res.data.earth
      );

      this.myBaronLands = res.data.earth.map((land: any) => {
        let number = this.lands?.findIndex((el) => {
          return el._id == land._id;
        });
        console.log(
          "%cLandsStore.ts line:66 number",
          "color: #007acc;",
          number
        );
        return { ...land, number: number ? number + 1 : 1 };
      });
      if (res.data.earth?.length && res.data.earth?.length > 0) {
        this.isBaron = true;
      }
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  };
  @action async getMyLand() {
    setAuthToken(getAuthToken());
    try {
      const res = await innerBackend.get(`${baseURL}api/user/user/me`);
      console.log(
        "%cLandsStore.ts line:61 res.data",
        "color: #007acc;",
        res.data
      );
      this.baronId = res.data.user._id;
      let number = this.lands?.findIndex((el) => {
        return el._id == res.data.user.earth._id;
      });
      console.log("%cLandsStore.ts line:66 number", "color: #007acc;", number);
      let land = res.data.user.earth;
      this.myLand = { ...land, number: number ? number + 1 : 1 };
      return res.data.user._id;
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      return false;
    }
  }
}
