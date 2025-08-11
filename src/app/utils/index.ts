export function calculateItemTotal(price: number, quantity: number): string {
    const total = (price * quantity) / 100;
    return `R$ ${total.toFixed(2).replace('.', ',')}`;
}