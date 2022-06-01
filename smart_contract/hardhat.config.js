//https://eth-ropsten.alchemyapi.io/v2/6LV8HAM4GitKaNB-V7iKKV8cMpx9fsF2
require('@nomiclabs/hardhat-waffle');

const PRIVATEKEY = import.meta.env.PRIVATE_RINKEBY_ACCOUNT_KEY;

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/6LV8HAM4GitKaNB-V7iKKV8cMpx9fsF2',
<<<<<<< HEAD
      accounts: [`${PRIVATEKEY}`]
=======
      accounts: ['PRIVATE_KEY']
>>>>>>> f877e5b15a5f34ed21b61697f29da513d70f0f47
    }
  }
}
