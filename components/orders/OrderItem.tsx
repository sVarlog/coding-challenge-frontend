import React from "react";
import { Order } from "utils/types";
import styles from "./order.module.css";

interface OrderProps {
    order: Order;
}

const OrderItem: React.FC<OrderProps> = ({ order }) => {
    return (
        <div className={styles.wrap}>
            <div className={styles.orderNumber}>{order[0]}</div>
            <div className={styles.orderDate}>{order[1]}</div>
            <div className={styles.orderName}>{order[2]}</div>
            <div className={styles.orderPrice}>{order[3]}</div>
        </div>
    );
};

export default OrderItem;
