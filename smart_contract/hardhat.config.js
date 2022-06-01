//https://eth-ropsten.alchemyapi.io/v2/6LV8HAM4GitKaNB-V7iKKV8cMpx9fsF2
require("@nomiclabs/hardhat-waffle");

const PRIVATEKEY = import.meta.env.PRIVATE_RINKEBY_ACCOUNT_KEY;

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: "https://eth-ropsten.alchemyapi.io/v2/6LV8HAM4GitKaNB-V7iKKV8cMpx9fsF2",
      accounts: [`${PRIVATEKEY}`],
    },
  },
};
