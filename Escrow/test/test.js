const Escrow = artifacts.require('Escrow');

const assertError = async (promise, error) => {
    try{
        await promise;
    }catch(e){
        assert(e.message.includes(error))
        return;
    }
    return(false);
}

contract('Escrow', accounts => {
    let escrow = null;
    const [lawyer, payer, recepient] = accounts;
    before(async () => {
        escrow = await Escrow.deployed();
    });

    it('Should deposit', async () => {
        await escrow.deposit({from: payer, value: 900});
        const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address));
        assert(escrowBalance === 900);
    });


    it('should not deposit if sender is not payer', async() => {
        assertError(
             escrow.deposit({from : accounts[5], value: 1000}), 'Sender must be Payer'
        );
    });

    it('should not deposit if transfer excedd amount', async() => {
        assertError(
             escrow.deposit({from : payer, value: 1000}), 'Cant send more than escrow amount'
        );
    });

    //release test

    it('Should not realease funds if full amount has not been received', async() => {
        assertError(
             escrow.release({from : lawyer}), 'Cannot release funds'
        );
    });

    it('should not release funds if senderis not lawyer', async() => {
        escrow.deposit({from: payer, value: 100});
        assertError(
            escrow.release({from : accounts[5]}), "Only lawyer can release funds"
        );
    });
    
    it('Should release funds', async() => {
        const balanceRecepientBefore = web3.utils.toBN(web3.eth.getBalance(recepient));
        await escrow.release({from : lawyer});
        const balanceRecepientAfter = web3.utils.toBN(web3.eth.getBalance(recepient));
        assert(balanceRecepientAfter.sub(balanceRecepientBefore).toNumber() === 1000);
    });

});