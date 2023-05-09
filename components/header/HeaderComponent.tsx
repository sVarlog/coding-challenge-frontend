import React from "react";
import styles from "./header.module.css";
import { getMonthName } from "../../utils/formatting";
import CountdownComponent from "@/components/countdown/CountdownComponent";

interface HeaderProps {
    currentDate: Date;
    changeCurrentMonth: (dir: "next" | "prev") => void;
    getDataHandler: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({
    currentDate,
    changeCurrentMonth,
    getDataHandler,
}) => {
    return (
        <div className={styles.head}>
            <div className="left">
                <p>Order Dashboard</p>

                <div className={styles.switcher}>
                    <h2>
                        {getMonthName(currentDate)} {currentDate.getFullYear()}
                    </h2>

                    <div className={styles.switcherBtns}>
                        <button onClick={() => changeCurrentMonth("next")}>
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

                        <button onClick={() => changeCurrentMonth("prev")}>
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
    );
};

export default HeaderComponent;
