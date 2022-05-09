const SimpleSmartContract = artifacts.require('SimpleSmartContract');

contract('SimpleSmartContract', () => {
    it('Should Deploy Smart Contract', async() => {
        const simpleSmartContract = await SimpleSmartContract.deployed();
        console.log(simpleSmartContract.address);
        assert(simpleSmartContract.address != '');
    });
})