const fib = artifacts.require("fibonacci");

contract('fibonacci', (accounts) => {
    let fibonacci = null;
    before( async () => {
        fibonacci = await fib.deployed();
    });

    it('should calculate fibonaci sequence', async() => {
        const result = await fibonacci.fib(10);
        assert(result.toNumber() === 55);
    });
});