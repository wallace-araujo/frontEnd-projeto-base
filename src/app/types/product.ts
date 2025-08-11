export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    promotional_price?: number;
    quantity: number;
    photo: string;
    category?: string;
    sku?: string;
};