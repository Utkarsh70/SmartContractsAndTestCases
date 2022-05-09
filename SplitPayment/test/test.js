const SplitPayment = artifacts.require('SplitPayment');

contract('SplitPayment', (accounts) => {
    let splitPayment = null;
    before(async () => {
        splitPayment = await SplitPayment.deployed();
    });

    it('should split payments', async () => {
        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [10, 20 ,30];
        const initialBalances = await Promise.all(recipients.map(recipient =>{
            return web3.eth.getBalances(recipient);
        }));
        await splitPayment.send(recipients,
            amounts,
            {from: accounts[0], value:[60]} );
        const finalBalances = await Promise.all(recipients.map(recipient =>{
            return web3.eth.getBalances(recipient);
        }));

        recipients.forEach((_item, i) => {

            const finalBalance = web3.utils.toBN(finalBalances[i]);
            const initialBalance = web3.utils.toBN(initialBalances[i]);

            assert(finalBalance.sub(initialBalance).toNumber() === amounts[i]);
        });     
    });

    it('should not split payament if array length is not match', async () => {

        const recipients = [accounts[1], accounts[2], accounts[3]];
        const amounts = [10, 20];
        
        try{
         await splitPayment.send(recipients,
            amounts,
            {from: accounts[0], value:[60]} );
        }catch(e) {
        assert(e.message.includes('to and amount array must have same length'));
        return;
    }
    return false;
    });
});