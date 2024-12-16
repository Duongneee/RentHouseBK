// utils.js
export function shortenMoneyAmount(amount = 0) {
    if (typeof amount !== 'number') {
        throw new Error('Invalid amount: must be a number');
    }
    if (amount >= 1e6) {
        return (amount / 1e6).toFixed(1) + ' triệu';
    } else if (amount >= 1e5) {
        return (amount / 1e3).toFixed(0) + 'k';
    } else {
        return amount.toString();
    }
}