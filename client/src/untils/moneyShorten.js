// utils.js
export function shortenMoneyAmount(amount) {
    if (amount >= 1e6) {
        return (amount / 1e6).toFixed(1) + ' triệu/tháng';
    } else if (amount >= 1e5) {
        return (amount / 1e5).toFixed(1) + ' trăm/tháng';
    } else {
        return amount.toString();
    }
}