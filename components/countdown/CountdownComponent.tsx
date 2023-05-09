import React, { useEffect, useState } from "react";
import styles from "./countdown.module.css";

interface CountdownProps {
    getData: () => void;
}

const CountdownComponent: React.FC<CountdownProps> = ({ getData }) => {
    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    getData();
                    return 60;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <p className={styles.countdown}>
            Refresh in <span>{countdown}</span>
        </p>
    );
};

export default CountdownComponent;
