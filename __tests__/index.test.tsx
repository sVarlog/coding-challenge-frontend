import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import { getMonthName } from "../utils/formatting";
import { values, targets } from "../api/__mocks__/tempData";
import { Order, Target } from "utils/interfaces";
import { act } from "react-dom/test-utils";
import OrdersListComponent from "@/components/orders/OrdersListComponent";
import { parseArray } from "../utils/formatting";

const today = new Date();
const currentMonth = getMonthName(today);
const currentYear = today.getFullYear();

jest.useFakeTimers();

jest.mock("../api/sheets", () => {
    return {
        getOrders: () =>
            new Promise((res) => {
                res(() => {
                    parseArray<Order>(values);
                });
            }),
        getTargets: () =>
            new Promise((res) => {
                res(() => {
                    parseArray<Target>(targets);
                });
            }),
    };
});

test("It shows current month", () => {
    act(() => {
        render(<Home />);
    });

    const currentMonthElement = screen.getByRole("heading", {
        name: `${currentMonth} ${currentYear}`,
    });

    expect(currentMonthElement).toBeInTheDocument();
});

test("It shows correct recent orders count", async () => {
    const ordersCount = 5;
    const orders = await parseArray<Order>(values).then((res) => res);

    act(() => {
        render(
            <OrdersListComponent
                type={"recent"}
                ordersCount={ordersCount}
                orders={orders}
                totalSum={100}
            />
        );
    });

    const ordersElement = screen.getByRole("heading", {
        name: `${ordersCount} recent orders`,
    });

    expect(ordersElement).toBeInTheDocument();
});

test("It shows correct top orders count", async () => {
    const ordersCount = 5;
    const orders = await parseArray<Order>(values).then((res) => res);

    act(() => {
        render(
            <OrdersListComponent
                type={"top"}
                ordersCount={ordersCount}
                orders={orders}
                totalSum={100}
            />
        );
    });

    const ordersElement = screen.getByRole("heading", {
        name: `Top ${ordersCount} products`,
    });

    expect(ordersElement).toBeInTheDocument();
});
