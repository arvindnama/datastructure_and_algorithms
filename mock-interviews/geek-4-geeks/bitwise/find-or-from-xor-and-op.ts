/**
 * Give Bitwise XoR & Bitwise And or 2 nos. X & Y
 * Find Bitwise OR of X & Y
 *
 *  formula::  (X ^ Y) = (X | Y) - (X & Y)
 *  Hence: (X | Y) = (X ^ Y) + (X & Y)
 */

const findOrFromXornAnd = (xor: number, and: number): number => xor + and;

console.log('findOrFromXornAnd', findOrFromXornAnd(5, 2));
