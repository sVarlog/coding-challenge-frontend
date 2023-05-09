const getFormattedString = (num: number, withoutCents = false) => {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: withoutCents ? 0 : 2,
    }).format(num);
};

const getNumberFromString = (str: string | undefined): number => {
    if (!str) return 0;

    return Number(
        str
            .replace(/[^\d,.-]/g, "")
            .replace(/\./g, "")
            .replace(",", ".")
    );
};

const getMonthName = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long" });
};

const parseArray = async <T>(res: string[][]): Promise<T[]> => {
    const keys: (keyof T)[] = res[0] as (keyof T)[];

    const result = res.slice(1).map((row: string[]) => {
        const obj: T = {} as T;

        row.forEach((cell, index) => {
            obj[keys[index]] = cell as T[keyof T];
        });

        return obj;
    });

    return result;
};

export { getFormattedString, getNumberFromString, getMonthName, parseArray };
