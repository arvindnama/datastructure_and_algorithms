/**
 * In this question the candidate needs to implement a function that takes a
 *  credit card number and returns the masked version.
 *
 * Requirements:
 *
 * - It should replace all but the 1st and last 4 digits in the provided sequence.
 * - Should not mask input shorter than 6 characters.
 * - Should not mask non-numeric characters.
 * - Should return empty string for all other input types apart from string and number.
 */

const maskify = (cardNumber: unknown): string => {
    const cardNoType = typeof cardNumber;

    if (cardNoType !== 'string' && cardNoType !== 'number') {
        return '';
    }

    const cardNoStr: string =
        cardNoType === 'string' ? (cardNumber as string) : `${cardNumber}`;

    if (cardNoStr.length < 6) {
        return cardNoStr;
    }

    const regex = /^(?<first>.)(?<body>.+)(?<last>.{4})$/;

    const res = regex.exec(cardNoStr);

    if (!res?.groups) {
        return '';
    }

    const [first, body, last] = [
        res.groups['first'],
        res.groups['body'],
        res.groups['last'],
    ];

    // regex to replace any digit with #
    const bodyMasked = body.replace(/\d/g, '#');

    return `${first}${bodyMasked}${last}`;
};

console.log('test card masking::');

console.assert(maskify('') === '', 'should translate ` ` === ` `');
console.assert(maskify({}) === '', 'should translate { } === ` `');
console.assert(
    maskify('12345') === '12345',
    'should translate `12345`  === `12345`'
);

console.assert(
    maskify(12345) === '12345',
    'should translate 12345  === `12345`'
);

console.assert(
    maskify('5512103073210694') === '5###########0694',
    'should translate `5512103073210694` ==> `5###########0694`'
);

console.assert(
    maskify(5512103073210694) === '5###########0694',
    'should translate `5512103073210694` ==> `5###########0694`'
);

console.assert(
    maskify('4556-3646-0793-5616') === '4###-####-####-5616',
    'should translate `4556-3646-0793-5616` === `4###-####-####-5616`'
);

console.assert(
    maskify('Devtools Tech') == 'Devtools Tech',
    'should translate `Devtools Tech` === `Devtools Tech`'
);

console.assert(
    maskify('S2k3i4p65p7y') == 'S#k#i#p#5p7y',
    'should translate `S2k3i4p65p7y` === `S#k#i#p#5p7y`'
);

console.log('All testes passing');
