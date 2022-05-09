const SimpleStorage = artifacts.require('SimpleStorage');

contract('SimpleStorage', () => {
    it('should set value of data storage', async () => {
        const simpleStorage = await SimpleStorage.deployed();
        await simpleStorage.set('this');
        const result = await simpleStorage.get();
        assert(result === 'this');
    });
});
