import React from "react";
import TargetComponent from "@/components/target/TargetComponent";
import styles from "./index.module.css";
import { useEffect, useState } from "react";
import {
    getFormattedString,
    getMonthName,
    getNumberFromString,
} from "utils/formatting";
import OrdersListComponent from "@/components/orders/OrdersListComponent";
import { Product } from "utils/interfaces";
import HeaderComponent from "@/components/header/HeaderComponent";
import { getOrders, getTargets } from "api/sheets";

const ordersCount = 5;

const Home: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setLoading] = useState(true);
    const [ordersSum, setOrdersSum] = useState(0);
    const [filteredOrders, setFilteredOrders] = useState<string[]>([]);
    const [popularProducts, setPopularProducts] = useState<Product[]>([]);
    const [values, setValues] = useState<string[]>([]);
    const [targets, setTargets] = useState<string[]>([]);

    const monthTarget = getNumberFromString(
        targets.find((el) => el.includes(getMonthName(currentDate)))?.[1]
    );

    const maxTarget = Math.max(
        ...JSON.parse(JSON.stringify(targets))
            .splice(1)
            .map((el: string[]) => getNumberFromString(el[1]))
    );

    const changeCurrentMonth = (dir: "next" | "prev") => {
        if (!dir || (dir !== "next" && dir !== "prev")) return;

        if (dir === "next") {
            const newDate = new Date(currentDate);

            newDate.setMonth(newDate.getMonth() - 1);

            setCurrentDate(newDate);
        } else {
            const newDate = new Date(currentDate);

            newDate.setMonth(newDate.getMonth() + 1);

            setCurrentDate(newDate);
        }
    };

    useEffect(() => {
        getDataHandler();
    }, []);

    const getDataHandler = async () => {
        const fetchOrders = getOrders()
            .then((res) => res.json())
            .then((data) => {
                setValues(data.values);
            });
        const fetchTargets = getTargets()
            .then((res) => res.json())
            .then((data) => {
                setTargets(data.values);
            });

        Promise.all([fetchOrders, fetchTargets]).then(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        if (!targets.length || !values.length) return;

        const dateFilter = currentDate
            .toLocaleString("default", {
                month: "2-digit",
                year: "numeric",
            })
            .split(".")
            .reverse()
            .join("/");

        const [header, ...data] = values;
        const dateIndex = header.indexOf("Order date");
        const volumeIndex = header.indexOf("Order volume");
        const productIndex = header.indexOf("Product");

        if (dateIndex === -1 || volumeIndex === -1 || productIndex === -1) {
            console.error(
                "Could not find 'Order date', 'Order volume', or 'Product' in header row"
            );
            return;
        }

        const orders: string[] = data
            .filter((order: string) => {
                const orderDate = new Date(
                    order[dateIndex].split(".").reverse().join("/")
                );
                const orderDateFilter = orderDate
                    .toLocaleString("default", {
                        month: "2-digit",
                        year: "numeric",
                    })
                    .split(".")
                    .reverse()
                    .join("/");
                return orderDateFilter === dateFilter;
            })
            .sort((a: string, b: string) => {
                const dateA = new Date(a[dateIndex]);
                const dateB = new Date(b[dateIndex]);

                const dayA =
                    dateA.getFullYear() * 10000 +
                    (dateA.getMonth() + 1) * 100 +
                    dateA.getDate();
                const dayB =
                    dateB.getFullYear() * 10000 +
                    (dateB.getMonth() + 1) * 100 +
                    dateB.getDate();

                return dayB - dayA;
            });

        setFilteredOrders(orders);

        const orderVolume = orders
            .map((row) => row[volumeIndex])
            .reduce((acc, curr) => acc + getNumberFromString(curr), 0);

        setOrdersSum(orderVolume || 0);

        const uniqueProducts = Array.from(
            new Set(orders.map((row) => row[productIndex]))
        );

        const popularProducts = uniqueProducts.map((product) => {
            const productOrders = orders.filter(
                (row) => row[productIndex] === product
            );
            const volume = productOrders
                .map((row) => row[volumeIndex])
                .reduce((acc, curr) => acc + getNumberFromString(curr), 0);
            return {
                name: product,
                volume: volume,
            };
        });

        setPopularProducts(popularProducts.sort((a, b) => b.volume - a.volume));
    }, [currentDate, targets, values]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.bg}>
                <div className={styles.circleOne}></div>
                <div className={styles.circleSec}></div>
                <div className={styles.circleThr}></div>
            </div>

            <div className={styles.container}>
                <HeaderComponent
                    changeCurrentMonth={(dir) => changeCurrentMonth(dir)}
                    currentDate={currentDate}
                    getDataHandler={getDataHandler}
                />

                {isLoading ? (
                    <div className={styles.loadingWrap}>
                        <img src="/WhiteLoader.svg" />
                    </div>
                ) : (
                    <>
                        <h1>{getFormattedString(ordersSum)}</h1>

                        <TargetComponent
                            target={monthTarget}
                            maxTarget={maxTarget}
                            result={ordersSum}
                        />
                    </>
                )}
            </div>

            {!isLoading && (
                <div className={styles.columns}>
                    <OrdersListComponent
                        type={"recent"}
                        ordersCount={ordersCount}
                        orders={filteredOrders}
                        totalSum={ordersSum}
                    />

                    <OrdersListComponent
                        type={"top"}
                        ordersCount={ordersCount}
                        products={popularProducts}
                        totalSum={ordersSum}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
