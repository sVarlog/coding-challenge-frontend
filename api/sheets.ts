import { Order, Target } from "utils/interfaces.js";
import credentials from "./credentials.js";

const getOrders = async (): Promise<Order[]> => {
    return await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${credentials.GOOGLE_SHEETS_ID}/values/A:D?key=${credentials.GOOGLE_API_KEY}`
    )
        .then((res) => res.json())
        .then((res) => {
            const keys: (keyof Order)[] = res.values[0] as (keyof Order)[];

            const result = res.values.slice(1).map((row: string[]) => {
                const obj: Order = {} as Order;

                row.forEach((cell, index) => {
                    obj[keys[index]] = cell;
                });

                return obj;
            });

            return result;
        });
};

const getTargets = async () => {
    return await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${credentials.GOOGLE_SHEETS_ID}/values/Targets!A:D?key=${credentials.GOOGLE_API_KEY}`
    )
        .then((res) => res.json())
        .then((res) => {
            const keys: (keyof Target)[] = res.values[0] as (keyof Target)[];

            const result = res.values.slice(1).map((row: string[]) => {
                const obj: Target = {} as Target;

                row.forEach((cell, index) => {
                    obj[keys[index]] = cell;
                });

                return obj;
            });

            return result;
        });
};

export { getOrders, getTargets };
