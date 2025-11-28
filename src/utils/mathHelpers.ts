export const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
};

export const simplifyFraction = (numerator: number, denominator: number): [number, number] => {
    const common = gcd(Math.abs(numerator), Math.abs(denominator));
    return [numerator / common, denominator / common];
};

export const getCollatzSequence = (start: number): number[] => {
    const sequence = [start];
    let current = start;
    while (current !== 1) {
        if (current % 2 === 0) {
            current = current / 2;
        } else {
            current = 3 * current + 1;
        }
        sequence.push(current);
    }
    return sequence;
};

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES' }).format(amount);
};
