/**
 * There is an ATM machine that stores banknotes of 5 denominations: 20, 50, 100, 200, and 500 dollars. Initially the ATM is empty. The user can use the machine to deposit or withdraw any amount of money.

When withdrawing, the machine prioritizes using banknotes of larger values.

For example, if you want to withdraw $300 and there are 2 $50 banknotes, 1 $100 banknote, and 1 $200 banknote, then the machine will use the $100 and $200 banknotes.
However, if you try to withdraw $600 and there are 3 $200 banknotes and 1 $500 banknote, then the withdraw request will be rejected because the machine will first try to use the $500 banknote and then be unable to use banknotes to complete the remaining $100. Note that the machine is not allowed to use the $200 banknotes instead of the $500 banknote.
Implement the ATM class:

ATM() Initializes the ATM object.
void deposit(int[] banknotesCount) Deposits new banknotes in the order $20, $50, $100, $200, and $500.
int[] withdraw(int amount) Returns an array of length 5 of the number of banknotes that will be handed to the user in the order $20, $50, $100, $200, and $500, and update the number of banknotes in the ATM after withdrawing. Returns [-1] if it is not possible (do not withdraw any banknotes in this case).
 */

class ATM {
    #denominations: number[] = [20, 50, 100, 200, 500];
    #deposits: number[] = [0, 0, 0, 0, 0]; // 20, 50, 100, 200, 500

    constructor() {}

    deposit(banknotesCount: number[]): void {
        this.#deposits = banknotesCount.map(
            (n, idx) => this.#deposits[idx] + n
        );
    }

    withdraw(amount: number): number[] {
        const depositsCopy = [...this.#deposits];
        const res = [0, 0, 0, 0, 0];
        for (let n = depositsCopy.length - 1; n >= 0 && amount > 0; n--) {
            const notes = depositsCopy[n];
            if (notes == 0) continue;

            const denomination = this.#denominations[n];

            if (amount < denomination) continue;

            let notesNeeded = Math.floor(amount / denomination);
            if (notesNeeded > notes) {
                notesNeeded = notes;
            }
            amount -= notesNeeded * denomination;
            depositsCopy[n] = notes - notesNeeded;
            res[n] = notesNeeded;
        }
        if (amount === 0) {
            this.#deposits = depositsCopy;
            return res;
        }
        return [-1];
    }
}

const atm = new ATM();
atm.deposit([0, 0, 1, 2, 1]);
console.log(atm.withdraw(600));
atm.deposit([0, 1, 0, 1, 1]);
console.log(atm.withdraw(600));
console.log(atm.withdraw(550));

/**
 * denomin  = [20, 50, 100, 200, 500]
 * deposits = [0,  0,   1,   2,  1]
 * withdraw: 600;
 *
 * n = 4
 *  deno = 500
 *  notes=   1
 *  amt  = 600
 *
 *  needed = 600/500 = 1
 *  amt = 600 - 500 = 100
 *
 * withdraw = [0,0,0,0,1]
 *
 * n = 3
 *  deno = 200
 *  notes=   2
 *  amt  = 100
 *
 * continue (100 < 200)
 * withdraw = [0,0,0,0,1]

 *
 * n = 2
 *  deno = 100
 *  notes=   1
 *  amt  = 100
 *
 *  needed = 100/100 = 1
 *  amt = 100 - 100 * 1 = 0
 * withdraw = [0,0,1,0,1]

 */
