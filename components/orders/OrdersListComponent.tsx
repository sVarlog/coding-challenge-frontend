import styles from "./ordersList.module.css";

interface OrdersListProps {
    type: "recent" | "top";
    ordersCount: number;
}

const OrdersListComponent: React.FC<OrdersListProps> = ({
    type,
    ordersCount,
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
        </div>
    );
};

export default OrdersListComponent;
