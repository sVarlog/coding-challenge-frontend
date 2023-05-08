import React from "react";
import { Order } from "utils/types";

interface OrderProps {
    order: Order;
}

const OrderItem: React.FC<OrderProps> = ({ order }) => {
    return <div>{order}</div>;
};

export default OrderItem;
