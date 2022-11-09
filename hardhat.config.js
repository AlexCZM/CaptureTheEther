require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
    solidity: { compilers: [{ version: "0.8.17" }, { version: "0.4.22" }, { version: "0.4.21" }] },

    namedAccounts: {
        deployer: 0, // 1st account from  (goerli) accounts list - eg. PRIVATE_KEY
        player: 1,
        player2: 2,
    },

    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmation: 1,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
    },

    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },

    gasReporter: {
        enabled: false,
    },
};
