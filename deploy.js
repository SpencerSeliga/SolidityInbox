const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//Just made this metamask for the purposes of learning. Don't ever put your seed phrases in public code. 
const provider = new HDWalletProvider(
    'volume expect hour sun noodle curious zoo outside offer paper clever wrist',
    'https://rinkeby.infura.io/v3/dde2b18298984d84ac271571a1a3c60d');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Happy Dad'] })
    .send({ gas: '1000000', from: accounts[0] });

    console.log('Deployed to:', result.options.address);
};
deploy();
