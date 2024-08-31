/**
 * Create a function that accepts multiple functions as an argument and a value and run this value through each function and return the final output.
 */

const pipe = (
    ...fns: Array<(input: unknown) => unknown>
): ((input: unknown) => unknown) => {
    return (input: unknown): unknown => {
        let res = input;
        for (const fn of fns) {
            try {
                res = fn(res);
            } catch {
                return res;
            }
        }
        return res;
    };
};

const val = { salary: 10000 };

const getSalary = (person: any) => person.salary;
const addBonus = (netSalary: any) => netSalary + 1000;
const deductTax = (grossSalary: any) => grossSalary - grossSalary * 0.3;

const result = pipe(getSalary, addBonus, deductTax)(val);
console.log(result);
