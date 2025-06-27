import { BigNumber } from "ethers";
import BN from "bignumber.js";
import numeral from "numeral";
import axios from "axios";
import { baseURL } from "./config/variables";

export function toBNJS(val: BigNumber | number | string) {
  return new BN(val.toString());
}

export function fd(val: number | string | BN) {
  if (!val) return "";
  return numeral(val?.toString()).format("0,0[.][000000000000000000]");
}
export const generateKey = (ins: string | number) => {
  // min and max included
  let random = Math.floor(Math.random() * (100000000000 - 1 + 1) + 1);
  return random.toString() + ins;
};
export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
BN.config({ EXPONENTIAL_AT: 100 });

export const isServer = typeof window === "undefined";

export const addressSlice = (address: string | undefined) => {
  if (!address) return "not connected";
  return (
    address.slice(0, 5) +
    "..." +
    address.slice(address.length - 5, address.length)
  );
};

export const convertBNBtoUSD = async (value: any) => {
  if (!value || !Number(value)) return "";
  else {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
    );
    console.log(res.data, "res data");
    const price = res.data.binancecoin.usd;
    return value * price;
  }
};

export const USDBNBpair = async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd"
  );
  return Number(res.data.binancecoin.usd);
};

export const innerBackend = axios.create({
  baseURL: baseURL,
  headers: {
    accept: "application/json",
  },
});

export const setAuthToken = (token?: string | null) => {
  if (token) {
    innerBackend.defaults.headers.common["Authorization"] = "Bearer " + token;
  }
};
export const playSound = (
  soundLink: string,
  volume: number,
  isClicked?: boolean
) => {
  if (isClicked) {
    let nav_link_sound_effect = new Audio(soundLink);
    nav_link_sound_effect.volume = volume;
    nav_link_sound_effect.play();
  }
};
