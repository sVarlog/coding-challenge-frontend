import React from "react";
import { Product } from "utils/interfaces";
import styles from "./product.module.css";
import { getFormattedString } from "utils/formatting";

interface ProductProps {
    product: Product;
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
    const getTitle = () => {
        const maxLength = 18;

        return product.name.length > maxLength
            ? `${product.name.substring(0, maxLength)}...`
            : product.name;
    };

    return (
        <div className={styles.wrap}>
            <p className={styles.name}>{getTitle()}</p>
            <div className={styles.value}>value</div>
            <p className={styles.volume}>
                {getFormattedString(product.volume)}
            </p>
        </div>
    );
};

export default ProductItem;
