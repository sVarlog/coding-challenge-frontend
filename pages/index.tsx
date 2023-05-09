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
import { Order, Product, Target } from "utils/interfaces";
import HeaderComponent from "@/components/header/HeaderComponent";
import { getOrders, getTargets } from "api/sheets";

const ordersCount = 5;

const Home: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setLoading] = useState(true);
    const [ordersSum, setOrdersSum] = useState(0);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [popularProducts, setPopularProducts] = useState<Product[]>([]);
    const [values, setValues] = useState<Order[]>([]);
    const [targets, setTargets] = useState<Target[]>([]);

    const monthTarget = getNumberFromString(
        targets.find((el) => el["Month"] === getMonthName(currentDate))?.Target
    );

    const maxTarget = Math.max(
        ...JSON.parse(JSON.stringify(targets))
            .splice(1)
            .map((el: Target) => getNumberFromString(el["Target"]))
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
        getOrders().then((result) => {
            setValues(result);
        });
        const fetchTargets = getTargets().then((result) => {
            setTargets(result);
        });

        Promise.all([getOrders(), fetchTargets]).then(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        if (!values.length) return;

        const dateFilter = currentDate
            .toLocaleString("default", {
                month: "2-digit",
                year: "numeric",
            })
            .split(".")
            .reverse()
            .join("/");

        const orders = values
            .filter((order: Order) => {
                const [day, month, year] = order["Order date"].split(".");
                const orderDate = new Date(`${year}-${month}-${day}`);
                const orderDateFilter = orderDate.toLocaleString("default", {
                    month: "2-digit",
                    year: "numeric",
                });
                return orderDateFilter === dateFilter;
            })
            .sort((a: Order, b: Order) => {
                const [dayA, monthA, yearA] = a["Order date"].split(".");
                const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
                const [dayB, monthB, yearB] = b["Order date"].split(".");
                const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
                return dateB.getTime() - dateA.getTime();
            });

        setFilteredOrders(orders);

        const orderVolume = orders
            .map((row) => row["Order volume"])
            .reduce((acc, curr) => acc + getNumberFromString(curr), 0);

        setOrdersSum(orderVolume || 0);

        const uniqueProducts = Array.from(
            new Set(orders.map((row) => row["Product"]))
        );

        const popularProducts = uniqueProducts.map((product) => {
            const productOrders = orders.filter(
                (row) => row["Product"] === product
            );
            const volume = productOrders
                .map((row) => row["Order volume"])
                .reduce((acc, curr) => acc + getNumberFromString(curr), 0);
            return {
                name: product,
                volume: volume,
            };
        });

        setPopularProducts(popularProducts.sort((a, b) => b.volume - a.volume));
    }, [currentDate, values]);

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
