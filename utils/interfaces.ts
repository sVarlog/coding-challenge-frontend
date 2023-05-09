export interface Product {
    name: string;
    volume: number;
}

export interface Target {
    Month: string;
    Target: string;
}

export interface Order {
    "Order number": string;
    "Order date": string;
    Product: string;
    "Order volume": string;
}
