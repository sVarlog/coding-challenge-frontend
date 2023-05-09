import React from "react";
import styles from "./order.module.css";
import { Order } from "utils/interfaces";

interface OrderProps {
    order: Order;
}

const OrderItem: React.FC<OrderProps> = ({ order }) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.orderNumber}>{order["Order number"]}</div>
            <div className={styles.orderDate}>{order["Order date"]}</div>
            <div className={styles.orderName}>{order["Product"]}</div>
            <div className={styles.orderPrice}>{order["Order volume"]}</div>
        </div>
    );
};

export default OrderItem;
