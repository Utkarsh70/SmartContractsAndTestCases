const AdvanceStorage = artifacts.require('AdvanceStorage');

contract ('AdvanceStorage', () => {

    it('Should Add an element to aray', async () => {
        const advanceStorage = await AdvanceStorage.deployed();
        await advanceStorage.add(10);
        
       const result = await advanceStorage.ids(0);
       assert(result.toNumber() === 10);
    });

    it('Should get an element to aray', async () => {
        const advanceStorage = await AdvanceStorage.deployed();
        await advanceStorage.add(20);
        
       const result = await advanceStorage.get(1);
       assert(result.toNumber() === 20);
    });

    it('Should get the id of aray', async () => {
        const advanceStorage = await AdvanceStorage.deployed();
       const rawId = await advanceStorage.getAll();
       const ids = rawId.map(id => id.toNumber());
       assert.deepEqual(ids, [10, 20]);
    });

    it('Should get length od array', async () => {
        const advanceStorage = await AdvanceStorage.deployed();
         
       const result = await advanceStorage.length();
       assert(result.toNumber() === 2);
    });
});