
import Router from 'next/router'
import Web3 from 'web3';


export const handleConnect = () => {
  checkMetamask()
  const isExpired = localStorage.getItem("jwtTTL")
    ? Number(localStorage.getItem("jwtTTL")) - Date.now()
    : 0;
  if (isExpired < 0) {
    localStorage.clear()
    setTimeout(()=>{
      Router.reload()
    },1000)
    
  }
};
export const checkMetamask = () => {
  if(window?.ethereum) {
    const web3 = new Web3(window.ethereum)
    return web3.eth.getAccounts(function(err, accounts){
      if (err != null) Router.push('../../')
      else if (accounts.length == 0) Router.push('../../')
      else console.log("User is logged in to MetaMask");
    });
  }
 
}
export const sortedTokens = [
  "74154440135043986234062497758924074297824935453762552567855998985499687518408",
  "74154440135043986234062497758924074297824935453762552567855998984400175890732",
  "74154440135043986234062497758924074297824935453762552567855998983300664263656",
  "74154440135043986234062497758924074297824935453762552567855998982201152635880",
  "74154440135043986234062497758924074297824935453762552567855998986599199155984",
];


export const getRightName =(token?: string) => {
  switch (token) {
    case sortedTokens[0]:
      return "King Pass";
    case sortedTokens[1]:
      return "Queen Pass";
    case sortedTokens[2]:
      return "Mine Pass";
    case sortedTokens[3]:
      return "Farm Pass";
    case sortedTokens[4]:
      return "Power Orb";
    default:
      return ""
  }
}
export const getRightImage =(token?: string) => {
  switch (token) {
    case sortedTokens[0]:
      return "/assets/images/king_pass.jpg";
    case sortedTokens[1]:
      return "/assets/images/queen_pass.jpg";
    case sortedTokens[2]:
      return "/assets/images/mine_pass.jpg";
    case sortedTokens[3]:
      return "/assets/images/farm_pass.jpg";
    case sortedTokens[4]:
      return "/assets/images/power_orb.jpg";
    default:
      return ""
  }
}
export const getResourceTickers =(res?: string) => {
  switch (res) {
    case 'Food':
      return "MBF";
    case 'Wood':
      return "MBW";
    case 'Stone':
      return "MBS";
    case 'Iron':
      return "MBI";
    case 'Horse':
      return "MBH";
    case 'Gold':
      return "MBG";
    default:
      return ""
  }
}
