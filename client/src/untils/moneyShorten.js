// utils.js
export function shortenMoneyAmount(amount) {
    if (amount >= 1e6) {
        return (amount / 1e6).toFixed(1) + ' triệu';
    } else if (amount >= 1e5) {
        return (amount / 1e5).toFixed(1) + ' trăm';
    } else {
        return amount.toString();
    }
}