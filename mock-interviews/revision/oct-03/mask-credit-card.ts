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
    const type = typeof cardNumber;
    if(type !== 'number' && type !== 'string') return '';
    const noStr = `${cardNumber}`;
    if(noStr.length < 6) return noStr;

    /**
     * masking logic begins
     * we need to split our string into 3 parts, first , middle, last
     * first: 1 char
     * middle: remaining chars
     * last: 4 chars
     *
     * Regex :: allows groups (?<group_name>expression)
     * Regex: . matches 1 char
     * Regex: .+ matches 1 or more char
     * Regex: .{4} matches 4 char
     */

    const regex = /^(?<first>.)(?<middle>.+)(?<last>.{4})$/;
    const res = noStr.match(regex)!;
    const {first, middle , last} = res.groups || {};

    // regex \d represents digits g represents global match -> matches all occurance.
    return `${first}${middle.replace(/\d/g,"#")}${last}`
}

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
