class MyQueue {
    private stack: number[] = [];
    constructor() {}

    push(x: number): void {
        this.stack.push(x);
    }

    pop(): number {
        const stack: number[] = [];
        while (this.stack.length) {
            stack.push(this.stack.pop() as number);
        }
        const top = stack.pop() as number;
        while (stack.length) {
            this.stack.push(stack.pop() as number);
        }
        return top;
    }

    peek(): number {
        const stack: number[] = [];
        while (this.stack.length) {
            stack.push(this.stack.pop() as number);
        }
        const top = stack.pop() as number;
        this.stack.push(top);
        while (stack.length) {
            this.stack.push(stack.pop() as number);
        }
        return top;
    }

    empty(): boolean {
        return this.stack.length === 0;
    }
}

const q = new MyQueue();

console.log(
    q.push(1),
    q.push(2),
    q.peek(),
    q.pop(),
    q.empty(),
    q.pop(),
    q.empty()
);
