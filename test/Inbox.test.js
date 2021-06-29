const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require ('../compile');


let accounts;
let inbox;

beforeEach(async ()=> {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Hi there!'] })
        .send({ from: accounts[0], gas: '1000000' });

});

describe('Inbox', () => {

    it('deploys a contract', ()=> {
        console.log(inbox);
    });

    it('deploys a contract 2', () => {
        assert.ok(inbox.options.address);
    });



    it('contains an initial address', async () => {
        const message = await inbox.methods.message().call();
        assert.ok(message);
    });

    it('is changing a message', async () => {
        const testMessage = 'Happy Dad';
        await inbox.methods.setMessage(testMessage).send({ from: accounts[0], 
            gas:'1000000'});
        const message = await inbox.methods.message().call();
        assert.strictEqual(message, testMessage);
    });
});



 
