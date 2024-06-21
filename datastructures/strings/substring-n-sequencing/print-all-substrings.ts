const printAllSubstring = (str: string): string[] => {
    const res: string[] = [];

    for (let i = 0; i < str.length; i++) {
        let s = str.charAt(i);
        res.push(s);
        for (let j = i + 1; j < str.length; j++) {
            s = s + str.charAt(j);
            res.push(s);
        }
    }
    return res;
};

console.log('All substring of abcd', printAllSubstring('abcd'));
