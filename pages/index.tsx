import React from "react";
import TargetComponent from "@/components/target/TargetComponent";
import styles from "./index.module.css";
import { values, targets } from "../tempData";
import { useEffect, useState } from "react";
import { getFormattedString, getNumberFromString } from "utils/formatting";
import OrdersListComponent from "@/components/orders/OrdersListComponent";
import { Order } from "utils/types";
import { Product } from "utils/interfaces";
import CountdownComponent from "@/components/countdown/CountdownComponent";

const ordersCount = 5;

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setLoading] = useState(true);
    const [ordersSum, setOrdersSum] = useState(0);
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [popularProducts, setPopularProducts] = useState<Product[]>([]);

    const getMonthName = (date: Date) => {
        return date.toLocaleDateString("en-US", { month: "long" });
    };

    const monthTarget = getNumberFromString(
        targets.find((el) => el.includes(getMonthName(currentDate)))?.[1]
    );

    const maxTarget = Math.max(
        ...JSON.parse(JSON.stringify(targets))
            .splice(1)
            .map((el: string[]) => getNumberFromString(el[1]))
    );

    console.log(monthTarget);

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

    const getDataHandler = () => {
        console.log("getData");
    };

    useEffect(() => {
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

        const orders: Order[] = data
            .sort(
                (a: Order, b: Order) =>
                    new Date(b[dateIndex]).getTime() -
                    new Date(a[dateIndex]).getTime()
            )
            .filter((order: Order) => {
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
            });

        setFilteredOrders(orders as Order[]);

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
        console.log("updated");
    }, [currentDate]);

    setTimeout(() => {
        setLoading(false);
    }, 250);

    return (
        <div className={styles.wrapper}>
            <div className={styles.bg}>
                <div className={styles.circleOne}></div>
                <div className={styles.circleSec}></div>
                <div className={styles.circleThr}></div>
            </div>

            <div className={styles.container}>
                <div className={styles.head}>
                    <div className="left">
                        <p>Order Dashboard</p>

                        <div className={styles.switcher}>
                            <h2>
                                {getMonthName(currentDate)}{" "}
                                {currentDate.getFullYear()}
                            </h2>

                            <div className={styles.switcherBtns}>
                                <button
                                    onClick={() => changeCurrentMonth("next")}
                                >
                                    {/* prettier-ignore */}
                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_3_161)">
										<path d="M21.4638 10.1887L19.525 8.25L11.275 16.5L19.525 24.75L21.4638 22.8113L15.1663 16.5L21.4638 10.1887Z" fill="#C4C4C4"/>
									</g>
									<defs>
										<clipPath id="clip0_3_161">
											<rect width="33" height="33" fill="white"/>
										</clipPath>
									</defs>
								</svg>
                                </button>

                                <button
                                    onClick={() => changeCurrentMonth("prev")}
                                >
                                    {/* prettier-ignore */}
                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clipPath="url(#clip0_3_166)">
										<path d="M11.5362 22.8113L13.475 24.75L21.725 16.5L13.475 8.25L11.5362 10.1887L17.8337 16.5L11.5362 22.8113Z" fill="#C4C4C4"/>
									</g>
									<defs>
										<clipPath id="clip0_3_166">
											<rect width="33" height="33" fill="white" transform="matrix(-1 0 0 -1 33 33)"/>
										</clipPath>
									</defs>
								</svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="right">
                        <CountdownComponent getData={getDataHandler} />
                    </div>
                </div>

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
