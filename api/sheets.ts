import { Order, Target } from "utils/interfaces";
import credentials from "./credentials";
import { parseArray } from "../utils/formatting";

const URL = `https://sheets.googleapis.com/v4/spreadsheets/${credentials.GOOGLE_SHEETS_ID}`;

const getOrders = async (): Promise<Order[]> => {
    return await fetch(`${URL}/values/A:D?key=${credentials.GOOGLE_API_KEY}`)
        .then((res) => res.json())
        .then((res) => {
            return parseArray<Order>(res.values);
        });
};

const getTargets = async () => {
    return await fetch(
        `${URL}/values/Targets!A:D?key=${credentials.GOOGLE_API_KEY}`
    )
        .then((res) => res.json())
        .then((res) => {
            return parseArray<Target>(res.values);
        });
};

export { getOrders, getTargets, parseArray };
