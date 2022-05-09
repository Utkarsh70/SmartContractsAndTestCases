const StringManipulation = artifacts.require('StringManipulation');

contract('StringManipulation', () => {
    let strings = null;
    before(async () => {
        strings = await StringManipulation.deployed();
    });


    it('Should return length of a string', async () => {
        const length = await strings.length("abc");
        assert(length.toNumber() === 3);
    });

    it('Should concat strings', async() => {
        const concatString = await strings.concat("abc", "cde");
        assert(concatString === "abccde");
    });
});