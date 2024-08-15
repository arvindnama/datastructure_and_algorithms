# Bitwise operations cheat sheet

      &  |   ^
--------------
0 0 | 0  0   0
1 0 | 0  1   1
0 1 | 0  1   1
1 1 | 1  1   0

**All bits are set**

n & (n + 1) === 0

n       = 0b0111
n+1     = 0b1000
n & n+1 = 0b0000

**If power of 2**

n = 0b100 (4)
n = 0b1000 (8)

n & n - 1 === 0; [0b100 & 0b011 == 0]

**Set A Bit**

pos = 1
n   = 0b101
set = n | (1 << pos) [0b101 | 0b010 = 0b110]

**Unset A Bit**

pos     = 1
n       = 0b111
Unset   = n & ~(1<<pos) [0b111 & 0b011 ]

**Interesting formulas**

x ^ y = (x | y) - (x & y)