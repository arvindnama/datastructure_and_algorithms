/**
 * Given an integer columnNumber, return its corresponding column title as it appears in an Excel sheet.
 */

function convertToTitle(columnNumber: number): string {
    /**
     * 1 - A , 2 - B .. 26- Z ,,
     *  This represent a Base 26 system .
     * but the the number start with 1 , but in base system it starts with zero.
     * Hence we will need to subtract the columnNo by 1,
     * extract modulo 26 to get LSB ( 0 - A , 1 - B ... 25 - z )
     * device n by 26 and repeat till n is 0 or less.
     */

    const charCodeAtA = `A`.charCodeAt(0);
    let title = '';
    while (columnNumber) {
        columnNumber = columnNumber - 1; // to make it easy to represent as base 26
        const lsb = columnNumber % 26;
        const lsc = String.fromCharCode(charCodeAtA + lsb);
        title = `${lsc}${title}`;
        columnNumber = Math.floor(columnNumber / 26);
    }
    return title;
}

console.log(1, convertToTitle(1));
console.log(27, convertToTitle(27));
console.log(28, convertToTitle(28));
console.log(701, convertToTitle(701));
console.log(702, convertToTitle(702));
console.log(703, convertToTitle(703));
console.log(1021, convertToTitle(1021));
console.log(1024, convertToTitle(1024));
