import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xc86A837A863454864AA79768CB60903BdD805A0E"
);

export default instance;
