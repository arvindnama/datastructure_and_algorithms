/**
 * Define function computeAmount() such that:
 *
 * console.log(computeAmount().lakhs(15).crore(5).crore(5).thousand(45).crore(7).value())
 * --> prints 171545000
 */

interface Compute {
    lakhs(val: number): Compute;
    crore(val: number): Compute;
    thousand(val: number): Compute;
    value(): number;
}
const computeAmount = (): Compute => {
    const compute = {
        val: 0,
        addVal(val: number, factor: number) {
            this.val += val * Math.pow(10, factor);
        },
        thousand(val: number): Compute {
            this.addVal(val, 3);
            return compute;
        },
        lakhs(val: number): Compute {
            this.addVal(val, 5);
            return compute;
        },
        crore(val: number): Compute {
            this.addVal(val, 7);
            return compute;
        },
        value(): number {
            return this.val;
        },
    };

    return compute;
};

console.log(
    computeAmount().lakhs(15).crore(5).crore(5).thousand(45).crore(7).value()
);
