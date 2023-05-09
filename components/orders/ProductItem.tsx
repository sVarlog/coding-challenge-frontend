import React from "react";
import { Product } from "utils/interfaces";
import styles from "./product.module.css";
import { getFormattedString } from "utils/formatting";

interface ProductProps {
    product: Product;
    totalSum: number;
}

const ProductItem: React.FC<ProductProps> = ({ product, totalSum }) => {
    const getTitle = () => {
        const maxLength = 18;

        return product.name.length > maxLength
            ? `${product.name.substring(0, maxLength)}...`
            : product.name;
    };

    const getVolumePercent = (vol: number) => {
        return (vol / totalSum) * 100;
    };

    return (
        <div className={styles.wrap}>
            <p className={styles.name}>{getTitle()}</p>

            <div className={styles.value}>
                <div
                    className={styles.percent}
                    style={{ width: `${getVolumePercent(product.volume)}%` }}
                >
                    <span>10%</span>
                </div>
            </div>

            <p className={styles.volume}>
                {getFormattedString(product.volume)}
            </p>
        </div>
    );
};

export default ProductItem;
