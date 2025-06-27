import {
  observable,
  action,
  makeObservable,
  reaction,
  IReactionDisposer,
  computed,
  configure,
} from "mobx";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import contractsData from "../utils/contracts.json";
import type { Contract } from "web3-eth-contract";
import type { AbiItem } from "web3-utils";
import { BaseProvider } from "@metamask/providers";
import type { AbstractProvider, WebsocketProvider } from "web3-core";
import { login } from "../api/auth";
import { getAuthToken, getAuthTokenTTL } from "../service";
import { injectable } from "inversify";
import "reflect-metadata";
import { baseURL, NETWORKS, packContract } from "../utils/config/variables";
import Web3Modal from "web3modal";
import { RootStore } from "./RootStore";
import { innerBackend, setAuthToken } from "../utils/utilities";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";
import { packContractAbi } from "../utils/config/abi/packContractAbi";
interface IPackInfo {
  supply:number
  maxSupply:number
  costMp:number
  costWl:number
  costPublic:number
}
configure({
  enforceActions: "never",
});
@injectable()
export class Web3Store {
  @observable user: { wallet: string | undefined } = {
    wallet: undefined,
  };
  @observable code: string | null = null;
  @observable invitedUsers: { address: string }[] = [];
  @observable refcode: string | null = null;
  @observable nft: Contract | null = null;
  @observable erc20: Contract | null = null;
  @observable packInfo: IPackInfo = {
    supply:0,
    maxSupply:0,
    costMp:0,
    costWl:0,
    costPublic:0
  }
  @observable web3: Web3 | null = null;
  @observable provider: BaseProvider | null = null;
  @observable loginFromButton: boolean = false;
  @observable walletConnectProvider: WalletConnectProvider | null = null;
  @observable web3infura: Web3;
  @observable web3Modal: Web3Modal | null = null;
  @observable signed: boolean = false;

  public constructor(private readonly rootStore: RootStore) {
    makeObservable(this);
    //TODO change this to dynamic value
    this.web3infura = new Web3(NETWORKS[137]);
  }
  @action async craftPackMpToWl(data:any, price:number, type?:string ) {
    setAuthToken(getAuthToken());
    console.log(type);
    const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );
      
      let contract = new web3.eth.Contract(
        packContractAbi as AbiItem[],
        packContract
      )
      const gasPrice = parseInt(await web3.eth.getGasPrice()) * 2;
    try {
      
      let buy = await contract.methods.wlRoundFirst(1, type ,data.signature, data.nonce, data.timestamp).send({ from: this.user.wallet, value: web3.utils.toHex(price),  gasPrice: gasPrice})
      .on('transactionHash',()=>{
        toast.info("Wait until the pack arrives on your account, it takes about a minute.", { theme: "dark" })
      })
      console.log(buy);
      return true
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      return false
    }
  }
  @action async craftPackWl(price:number, type?:string) {
    setAuthToken(getAuthToken());
    console.log(type);
    const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );
      
      let contract = new web3.eth.Contract(
        packContractAbi as AbiItem[],
        packContract
      )
      const gasPrice = parseInt(await web3.eth.getGasPrice()) * 2;
    try {
      
      let buy = await contract.methods.buyPack(1,type).send({ from: this.user.wallet, value: web3.utils.toHex(price),  gasPrice: gasPrice})
      .on('transactionHash',()=>{
        toast.info("Wait until the pack arrives on your account, it takes about a minute.", { theme: "dark" })
      })
      console.log(buy);
      return true
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      return false
    }
  }
  @action async getPrice (type:string, mp:boolean) {
    try {
      const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );
      let contract = new web3.eth.Contract(
        packContractAbi as AbiItem[],
        packContract
      );
      let buy = await contract.methods.costForUser(type,mp,this.user.wallet).call();
      console.log(buy);
      return buy
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      return false
    }
  }
  @action async craftPackMpContract(data: any, price:number, type?:string) {
    setAuthToken(getAuthToken());
    console.log(type);
    // if(data.message) {
    //   toast.error(data.message, {theme: 'dark'})
    // }
    const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );
      let contract = new web3.eth.Contract(
        packContractAbi as AbiItem[],
        packContract
      );
    const gasPrice = parseInt(await web3.eth.getGasPrice()) * 2;
    console.log(gasPrice);
    try {

      let buy = await contract.methods.mpRound(1, type ,data.signature, data.nonce, data.timestamp).send({ from: data.address, gasPrice: gasPrice, value: price})
      .on('transactionHash',()=>{
        toast.info("Wait until the pack arrives on your account, it takes about a minute.", { theme: "dark" })
      })
      console.log(buy.message);
       
       return toast.success("Successfully minted", { theme: "dark" }); 
      
     
    } catch (e) {
      console.log("%cCardStore.ts line:38 e", "color: #007acc;", e);
      if(data.message) {
        toast.error(data.message, { theme: "dark" }); 
        console.log('asdasd');
      } else {
        toast.error("Confirm transaction", { theme: "dark" }); 
      }
      
    }
  }
  @action
  async connectWallet(place?: string) {
    try {
      if (!this.web3Modal) {
        this.web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: isMobile
                ? {
                    infuraId: "f2a1029edc25430fa0aef509b40e099b",
                    chainId: 137,
                    rpc: {
                      137: "https://polygon-rpc.com/",
                      80001: "https://rpc-mumbai.matic.today",
                    },
                  }
                : {},
            },
          },
        });
      }
      this.provider = await this.web3Modal.connect();
      await this.web3Modal.toggleModal();
      const subscribeProvider = async (provider: BaseProvider | null) => {
        if (!provider?.on) {
          return;
        }
        // provider.on("close", () => this.resetApp());
        provider.on("accountsChanged", async () => {
          console.log("onAccountChanged");
          await this.sign("onAccountChanged");
        });
      };
      await subscribeProvider(this.provider);
      const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );

      this.web3 = web3;
      const accounts: string[] = await web3.eth.getAccounts();
      const [wallet] = accounts;
      //contract setup
      this.erc20 = new web3.eth.Contract(
        contractsData.erc20.abi as AbiItem[],
        contractsData.erc20.address
      );
      this.web3 = web3;
      if (!this.user.wallet) {
        console.log(wallet);
        this.user = {
          wallet,
        };
      }

      this.sign("from connectWallet");
    } catch (error) {
      console.error(error);
    }
  }
  onAccountChanged = async (newAccounts: unknown) => {
    console.log("onAccountChanged", { newAccounts });
    // this.signed = false;
    if (newAccounts instanceof Array) {
      this.setWallet(newAccounts[0]);
      await this.sign("onAccountChanged");
    }
  };
  getPackInfo = async (type?:string) =>{
    const web3 = new Web3(
      this.provider as BaseProvider & WebsocketProvider & WalletConnectProvider
    );
    const contract = new web3.eth.Contract(
      packContractAbi as any,
      packContract
    );
    this.packInfo = {
      supply:0,
      maxSupply:0,
      costMp:0,
      costWl:0,
      costPublic:0
    }
    try{
      let data = await contract.methods.namePackAndStruct(type).call()
      this.packInfo = data
    } catch (e) {
      console.log(e);
    }
  }
  isPublicSale = async () => {
    const web3 = new Web3(
      this.provider as BaseProvider & WebsocketProvider & WalletConnectProvider
    );
    const contract = new web3.eth.Contract(
      packContractAbi as any,
      packContract
    );
    let isPublicSale = await contract.methods.publicSale().call();
    console.log(isPublicSale);
    return isPublicSale;
  };
  isWhiteList = async () => {
    try {
      const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );
      const contract = new web3.eth.Contract(
        packContractAbi as any,
        packContract
      );
      console.log(this.user.wallet);
      let isWhiteList = await contract.methods
        .isWhitelisted(this.user.wallet)
        .call();
      console.log(isWhiteList);
      return isWhiteList;
    } catch (e) {
      console.log("%cWalletStore.ts line:199 e", "color: #007acc;", e);
    }
  };
  getDiscount = async () => {
    try {
      const web3 = new Web3(
        this.provider as BaseProvider &
          WebsocketProvider &
          WalletConnectProvider
      );
      const contract = new web3.eth.Contract(
        packContractAbi as any,
        packContract
      );
      let discount = await contract.methods
        .isWhitelistedDiscont(this.user.wallet)
        .call();
      console.log(discount);
      return discount;
    } catch (e) {}
  };
  @action async getReferralLink() {
    setAuthToken(getAuthToken());
    try {
      const res = await innerBackend.get(
        `${baseURL}api/refferal/${this.user?.wallet}`
      );
      console.log(res.data.invited);
      this.code = res?.data.code;
      this.invitedUsers = res?.data.invited;
    } catch (e) {
      console.log("%cCardStore.ts line:51 e", "color: #007acc;", e);
    }
  }
  async setCode(code: string) {
    localStorage.setItem("refcode", code);
  }
  switchNetwork = async (chainId: number) => {
    // console.log('%cWalletStore.ts line:83 chainId', 'color: #007acc;', chainId);
    const getNetworkId = async () => {
      if (!this.web3Modal && window?.ethereum) {
        this.web3Modal = new Web3Modal({
          cacheProvider: true,
          providerOptions: {
            walletconnect: {
              package: WalletConnectProvider, // required
              options: isMobile
                ? {
                    infuraId: "f2a1029edc25430fa0aef509b40e099b",
                    chainId: 137,
                    rpc: {
                      137: "https://polygon-rpc.com/",
                      80001: "https://rpc-mumbai.matic.today",
                    },
                  }
                : {},
            },
          },
        });
      }
      let provider = await this?.web3Modal?.connect();
      const web3 = new Web3(
        window?.ethereum ? window?.ethereum : NETWORKS[137]
      );

      const currentChainId = await web3?.eth?.net?.getId();
      console.log(
        "%cWalletStore.ts line:83 chainId",
        "color: #007acc;",
        currentChainId,
        chainId
      );
      return currentChainId;
    };
    try {
      const currentChainId = !isMobile ? await getNetworkId() : "";
      if (currentChainId !== chainId && !isMobile) {
        console.log(
          "%cWalletStore.ts line:83 chainId",
          "color: #007acc;",
          currentChainId
        );
        try {
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: Web3.utils.toHex(chainId) }],
          });
        } catch (switchError:any) {
          if (switchError?.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: Web3.utils.toHex(chainId),
                    chainName: "Polygon",
                    nativeCurrency: {
                      name: "Polygon",
                      symbol: "MATIC",
                      decimals: 18,
                    },
                    rpcUrls: ["https://polygon-rpc.com/"],
                  },
                ],
              });
            } catch (e) {
              console.log("%cWalletStore.ts line:212 e", "color: #007acc;", e);
            }
          }
          console.log(
            "%cWalletStore.ts line:163 switchError",
            "color: #007acc;",
            switchError
          );
          if (!window?.ethereum) {
            toast.error(
              `Please, switch your network to polygon ${switchError?.code}`,
              { theme: "dark" }
            );
          }
        }
      } else {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };
  async registerCode() {
    const body = {
      code: localStorage.getItem("refcode"),
    };
    try {
      setAuthToken(getAuthToken());
      try {
        const { data } = await innerBackend.post(
          `${baseURL}api/refferal/`,
          body
        );
        console.log(data);
        this.code = data.code;
        return localStorage.removeItem("refcode");
      } catch (e) {
        console.log("%cCardStore.ts line:51 e", "color: #007acc;", e);
      }
    } catch (e) {
      console.log(e);
    }
  }
  @action resetWallet = async () => {
    if (this.web3Modal) {
      this.web3Modal.clearCachedProvider();
      localStorage.clear();
    }
    this.walletConnectProvider && this?.walletConnectProvider?.stop(),
      (this.user.wallet = undefined);
    this.signed = false;
  };

  @action.bound
  async setWallet(w: string | undefined) {
    this.user.wallet = w;
  }

  async login(place?: string) {
    if (place === "button") this.loginFromButton = true;
    await this.connectWallet();
    const jwtTTL = getAuthTokenTTL();
    if (jwtTTL) {
      const isTokenExpired = parseInt(jwtTTL) < Date.now();
      if (!getAuthToken() || isTokenExpired) {
        console.log("expired");
        await this.sign("from login");
      } else {
        this.signed = true;
      }
    }
  }

  async tryReconnect() {
    const jwtTTL = getAuthTokenTTL();
    if (jwtTTL) {
      await this.login();
    }
  }

  convertFromWei(value: number | undefined | null) {
    if (!value) return 0;
    else {
      const price = this.web3infura?.utils.fromWei(value.toString(), "ether");
      return Number(price);
    }
  }

  sign = async (from?: string) => {
    console.log(from);

    if (this.user.wallet && this.web3 && !this.signed) {
      console.log("ss2a");
      const res = await login(this.user.wallet, this.web3);
      console.log(res);
      if (res) {
        localStorage.removeItem("preventLogin");
        this.signed = true;
        return res;
      }
    }
  };

  @computed
  get isLoggedIn() {
    const jwtTTL = getAuthTokenTTL();
    const isTokenExpired = jwtTTL && parseInt(jwtTTL) < Date.now();
    return (
      Boolean(this.user.wallet) && Boolean(getAuthToken()) && !isTokenExpired
    );
  }
}

export default Web3Store;
