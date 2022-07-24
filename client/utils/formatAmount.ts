export const formatAmount = (amount: number | string, decimals: number) => {
    if (typeof amount === 'string') 
        amount = parseFloat(amount);
    return amount.toFixed(decimals)
}