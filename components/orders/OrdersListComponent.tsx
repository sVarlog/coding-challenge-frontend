import React from "react";
import styles from "./ordersList.module.css";
import { Order } from "utils/types";
import { Product } from "utils/interfaces";
import OrderItem from "./OrderItem";
import ProductItem from "./ProductItem";

interface OrdersListProps {
    type: "recent" | "top";
    ordersCount: number;
    orders?: Order[];
    products?: Product[];
}

const OrdersListComponent: React.FC<OrdersListProps> = ({
    type,
    ordersCount,
    orders,
    products,
}) => {
    const getColumnTitle = () => {
        if (type === "recent") {
            return `${ordersCount} recent orders`;
        } else if (type === "top") {
            return `Top ${ordersCount} products`;
        }

        return "";
    };

    return (
        <div
            className={`${styles.column} ${
                type === "recent" ? styles.left : styles.right
            }`}
        >
            <h2 className={styles.title}>{getColumnTitle()}</h2>

            {orders?.length ? (
                orders.map((el, index) => <OrderItem key={index} order={el} />)
            ) : products?.length ? (
                products.map((el, index) => (
                    <ProductItem key={index} product={el} />
                ))
            ) : (
                <>No products</>
            )}
        </div>
    );
};

export default OrdersListComponent;
