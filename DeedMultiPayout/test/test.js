const  MultiPayout= artifacts.require("MultiPayout");

contract ('MultiPayout', (accounts) => {
    let deedMultiPayout = null;
    before(async () => {
        deedMultiPayout = await MultiPayout.deployed();
    });



it('should withdraw for all payouts (1)' , async () => {
    for(let i=0;i<4;i++) {
        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        await new Promise(resolve => setTimeout(resolve, 1000));
        await deedMultiPayout.withDraw({from : accounts[0]});
        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        assert(balanceAfter.sub(balanceBefore).toNumber() === 25);
    }
});

it('should withdraw for all payouts (2)' , async () => {
    const deedMultiPayout = MultiPayout.new(accounts[0], accounts[1], 1, {value:100});
    for(let i=0;i<4;i++) {
        const balanceBefore = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        await new Promise(resolve => setTimeout(resolve, 2000));
        await deedMultiPayout.withDraw({from : accounts[0]});
        const balanceAfter = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        assert(balanceAfter.sub(balanceBefore).toNumber() === 50);
    }
});

});