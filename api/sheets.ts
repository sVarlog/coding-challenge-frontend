import credentials from "./credentials.json";

const getOrders = async () => {
    return await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${credentials.GOOGLE_SHEETS_ID}/values/A:D?key=${credentials.GOOGLE_API_KEY}`
    );
};

const getTargets = async () => {
    return await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${credentials.GOOGLE_SHEETS_ID}/values/Targets!A:D?key=${credentials.GOOGLE_API_KEY}`
    );
};

export { getOrders, getTargets };
