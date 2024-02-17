// const HDWalletProvider = require("@truffle/hdwallet-provider");
// const { Web3 } = require("web3");
// const compiledFactory = require("./build/CampaignFactory.json");

// const provider = new HDWalletProvider(
//   "sort domain coil drum often merry filter mercy gather idea laptop side",
//   // remember to change this to your own phrase!
//   "https://sepolia.infura.io/v3/7b0d9bdc29a24cc5b671ec7faeadd288"
//   // remember to change this to your own endpoint!
// );
// const web3 = new Web3(provider);

// const deploy = async () => {

//   try {

//     const accounts = await web3.eth.getAccounts();

//     console.log("Attempting to deploy from account", accounts[0]);

//     const result = await new web3.eth.Contract(compiledFactory.abi)
//       .deploy({ data: '0x0' + compiledFactory.evm.bytecode.object })
//       .send({ gas: "1800000", timeoutBlocks: 200, from: accounts[0] });

//     console.log("Contract deployed to", result.options.address);
//     provider.engine.stop();
//   } catch(error)  {
//     console.error("Error during deployment:", error);
//     provider.engine.stop();
//   }

// };
// deploy();



const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");

const mnemonic = "sort domain coil drum often merry filter mercy gather idea laptop side";
const infuraUrl = "https://sepolia.infura.io/v3/7b0d9bdc29a24cc5b671ec7faeadd288";

const deploy = async () => {
  let provider, web3;

  try {
    // Initialize HDWalletProvider and Web3
    provider = new HDWalletProvider({ mnemonic, providerOrUrl: infuraUrl });
    web3 = new Web3(provider);

    // Get accounts
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account:", accounts[0]);

    // Deploy the contract
    const result = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({ data: compiledFactory.evm.bytecode.object })
      .send({ gas: "6721975", from: accounts[0] });

    console.log("Contract deployed to:", result.options.address);
  } catch (error) {
    console.error("Error during deployment:", error.message || error);
  } finally {
    // Stop the provider regardless of success or failure
    if (provider) {
      provider.engine.stop();
    }
  }
};

deploy().catch((error) => {
  console.error("Unhandled promise rejection:", error.message || error);
  process.exit(1); // Exit the process with an error code
});

