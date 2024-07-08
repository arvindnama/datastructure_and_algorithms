/**
 * Create a count function  such that ::
 *
 * count() //1
 * count() //2
 * count() //3
 *
 * count.reset()
 *
 * count() //1
 * count() //2
 */

const count: () => void & { reset: () => void } = () => {
    const countAsAny = count as any;
    countAsAny.val = countAsAny.val || 0;
    if (!countAsAny.reset) countAsAny.reset = () => (countAsAny.val = 0);

    ++countAsAny.val;
    console.log(countAsAny.val);
    return countAsAny.val;
};

count(); //1
count(); //2
count(); //3
(count as any).reset();
count(); //1
count(); //2
