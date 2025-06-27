import { injectable } from "inversify";
import { action, configure, makeObservable, observable } from "mobx";
import "reflect-metadata";
import { RootStore } from "./RootStore";
import axios from "axios";
import { baseURL, packContract } from "../utils/config/variables";
import { innerBackend, setAuthToken } from "../utils/utilities";
import { getAuthToken } from "../service";
import { toast } from "react-toastify";
import { getPackName } from "../components/Craft/handlers";


configure({
  enforceActions: "never",
});
export interface CraftBuliding{
  craft_food: number
  craft_gold: number
  craft_iron: number
  craft_stone: number
  craft_wood: number
  mine_hour: number
  move_gold: number
  produce_perDay: number
  production_food:number
  production_gold: number
  production_horse: number
  production_iron: number
  production_stone: number
  production_wood: number
  recover_food: number
  recover_gold: number
  recover_iron: number
  recover_stone: number
  recover_wood: number
  repair: number
  stake_gold: number
  unstake_gold: number
  wearOut: number
  wearout: number
}
export interface CraftWar{
  ability: string
  atf: number
  craft_food: number
  craft_gold:number
  craft_horse:number
  craft_iron:number
  craft_stone:number
  craft_wood: number
  def: number
  dmg: number
  hp:number
  stamina: string
  supply_food:number
  supply_gold:number
  supply_horse: number
  supply_iron: number
  supply_stone: number
  supply_wood: number
}
@injectable()
export class CraftStore {
  @observable craftCost?: any = {}
  @observable craftInfo?: any[] = [];
  @observable craftInfoAsObject?: any;
  @observable repairCost?: any;
  @observable repaired?: boolean = false;
  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
  }

  //get user data
  @action async getCraftMaterials() {
    try {
      const res = await axios.get(`${baseURL}api/token/all/craft`);
      console.log(res.data);
      this.craftInfo = Object.entries(res.data);
      this.craftInfoAsObject = res.data
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
    }
  }
  @action async setCurrentCraftCost(craftCost:any) {
      console.log(craftCost);
      this.craftCost = craftCost

  }

@action async craftPackMp(currentCraft:string, cost:number){
  setAuthToken(getAuthToken());
  console.log(cost);
  try {
    const {data} = await innerBackend.get(`${baseURL}api/transaction/buyPack?amount=1&name=${getPackName(currentCraft)}&addressContract=${packContract}`);
    console.log(data);
    if(data.message) {
      // toast.error(data.message, {theme:'dark'})
    }
    return data

  } catch (e) {
    console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
  }
  
}
@action async getRepairCost(){
  setAuthToken(getAuthToken());
  try {
    const res = await innerBackend.get(`${baseURL}api/token/craft/cost`);
    console.log(res);
    if(res.data?.name == "HttpException") {
      // close()
      this.repaired = true
      // toast.success("All NFTs already repaired",{theme:'dark'})
    } else {
      this.repairCost = res.data 
    }

  } catch (e) {
    console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
  }
  
}
}
