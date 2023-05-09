import React from "react";
import styles from "./ordersList.module.css";
import { Order } from "utils/types";
import { Product } from "utils/interfaces";
import OrderItem from "./OrderItem";
import ProductItem from "./ProductItem";

interface OrdersListProps {
    type: "recent" | "top";
    ordersCount: number;
    totalSum: number;
    orders?: Order[];
    products?: Product[];
}

const OrdersListComponent: React.FC<OrdersListProps> = ({
    type,
    ordersCount,
    orders,
    products,
    totalSum,
}) => {
    const getColumnTitle = () => {
        if (type === "recent") {
            return `${ordersCount} recent orders`;
        } else if (type === "top") {
            return `Top ${ordersCount} products`;
        }

        return "";
    };

    const getEmptyDesc = () => {
        if (type === "recent") {
            return `No orders yet`;
        } else if (type === "top") {
            return `No products yet`;
        }

        return "";
    };

    const getLatestOrders = () => {
        console.log(orders, "order");
        if (!orders?.length) return [];

        return orders.splice(0, ordersCount);
    };

    const getLatestProducts = () => {
        console.log(products, "order");
        if (!products?.length) return [];

        return products.splice(0, ordersCount);
    };

    return (
        <div
            className={`${styles.column} ${
                type === "recent" ? styles.left : styles.right
            }`}
        >
            <h2 className={styles.title}>{getColumnTitle()}</h2>

            {orders?.length ? (
                getLatestOrders().map((el, index) => (
                    <OrderItem key={index} order={el} />
                ))
            ) : products?.length ? (
                getLatestProducts().map((el, index) => (
                    <ProductItem key={index} product={el} totalSum={totalSum} />
                ))
            ) : (
                <p className={styles.empty}>{getEmptyDesc()}</p>
            )}
        </div>
    );
};

export default OrdersListComponent;
