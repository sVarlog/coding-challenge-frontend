const getFormattedString = (num: number) => {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(num);
};

const getNumberFromString = (str: string | undefined) => {
    if (!str) return 0;

    return Number(
        str
            .replace(/[^\d,.-]/g, "")
            .replace(/\./g, "")
            .replace(",", ".")
    );
};

export { getFormattedString, getNumberFromString };
