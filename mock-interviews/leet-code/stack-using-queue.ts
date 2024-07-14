/**
 * implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).
 */

class MyStack {
    private queue: number[] = [];

    constructor() {}

    public push(x: number): void {
        this.queue.push(x);
    }

    private duplicateQueue(): [number[], number] {
        let top: number = -1;
        const newQueue: number[] = [];
        while (this.queue.length) {
            top = this.queue.shift() as number;
            newQueue.push(top);
        }
        return [newQueue, top];
    }

    public pop(): number {
        const [newQueue, top] = this.duplicateQueue();
        newQueue.length = newQueue.length - 1;
        this.queue = newQueue;
        return top;
    }

    public top(): number {
        const [newQueue, top] = this.duplicateQueue();
        this.queue = newQueue;
        return top;
    }

    public empty(): boolean {
        return !this.queue.length;
    }
}

const obj = new MyStack();
obj.push(1);

console.log(obj.top(), obj.pop(), obj.empty());
