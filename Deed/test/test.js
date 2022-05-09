const Deed = artifacts.require("deed");

contract ('deed', (accounts) => {
    let deed = null;
    before(async () => {
        deed = await Deed.deployed();
    });
 
    //happy path
    it("should withdraw ", async () => {
        const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        await new Promise(resolve => setTimeout(resolve, 5000));
        await deed.withDraw({ from : accounts[0] });

        const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
        assert(finalBalance.sub(initialBalance).toNumber() == 100);
    });

    it("Should not withdraw if too early", async () => {
        const deed = await Deed.new(
              accounts[0], 
              accounts[1], 
              5, 
              {value: 100}
            );

        try{
            await deed.withDraw({ from : accounts[0] });
        }catch(e) {
            assert(e.message.includes('Too Early'));
            return;

        }
        assert(false);
    });
    
    it("should not withdraw if caller not lawyer", async ()=> {
        const deed = await Deed.new(
            accounts[0], 
            accounts[1], 
            5, 
            {value: 100}
          );

        try{
            await new Promise(resolve => setTimeout(resolve, 5000));
            await deed.withDraw({ from : accounts[5] });
        }catch(e) {
            assert(e.message.includes('Lawyer Only'));
            return;
        }
        assert(false);
    });

}); 