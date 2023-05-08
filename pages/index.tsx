import TargetComponent from "@/components/target/TargetComponent";
import styles from "./index.module.css";
import { values, targets } from "./temp";
import { useState } from "react";

const Home = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isLoading, setLoading] = useState(true);

    const getMonthName = (date: Date) => {
        return date.toLocaleDateString("en-US", { month: "long" });
    };

    const getNumber = (str: string | undefined) => {
        console.log(str);
        console.log(currentDate);
        console.log(targets);

        if (!str) return 0;

        return Number(
            str
                .replace(/[^\d,.-]/g, "")
                .replace(/\./g, "")
                .replace(",", ".")
        );
    };

    const monthTarget = getNumber(
        targets.find((el) => el.includes(getMonthName(currentDate)))?.[1]
    );

    const maxTarget = Math.max(
        ...JSON.parse(JSON.stringify(targets))
            .splice(1)
            .map((el: string[]) => getNumber(el[1]))
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

    setTimeout(() => {
        setLoading(false);
    }, 100);

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
                                    onClick={() => changeCurrentMonth("prev")}
                                >
                                    {/* prettier-ignore */}
                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_3_161)">
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
                                    onClick={() => changeCurrentMonth("next")}
                                >
                                    {/* prettier-ignore */}
                                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_3_166)">
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
                        <p className={styles.countdown}>
                            Refresh in <span>10</span>
                        </p>
                    </div>
                </div>

                {isLoading ? (
                    <p>Loading</p>
                ) : (
                    <>
                        <h1>5.237,27 €</h1>

                        <TargetComponent
                            target={monthTarget}
                            maxTarget={maxTarget}
                            result={90000}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
