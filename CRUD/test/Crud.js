const Crud = artifacts.require("Crud");

contract ("Crud", () => {

    let crud = null;
    before(async () => {
        crud = await Crud.deployed();
    });

    it('Shoud create new User', async() => {
        await crud.create('Geetika');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Geetika');

    });

    it('Test should update user', async ()=> {
        await crud.update(1, 'Raagini');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Raagini');

    });


    it('should not update not exist user', async () => {
        try{
            await crud.update(2, 'Raagini');
        }catch(e){
            assert(e.message.includes('User does not exist'));
            return;
        }
        assert(false);
    });

    it('shpuld destroy a user', async () => {
        await crud.Destroy(1);
        try{
            await crud.read(1);
        }catch(e){
            assert(e.message.includes('User does not exist'));
            return;
        }
        assert(false);
    });

    it('should not destroy a not existing user', async() => {
        try{
            await crud.Destroy(10);    
        } catch(e){
            assert(e.message.includes('User does not exist'));
            return;
        }
        assert(false);
    });

});