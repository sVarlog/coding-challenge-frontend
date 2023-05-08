import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./target.module.css";

interface TargetComponentProps {
    target: number;
    maxTarget: number;
    result: number;
}

const TargetComponent: React.FC<TargetComponentProps> = ({
    target,
    result,
    maxTarget,
}) => {
    const [widthPercent, setWidthPercent] = useState(0);

    const resultWidthPercent = widthPercent * (target / maxTarget);

    const targetWrapRef = useRef<HTMLDivElement>(null);

    console.log(widthPercent, resultWidthPercent);

    const getInnerStyles = () => {
        if (!widthPercent) return { width: 0 };
        maxTarget;

        return { width: `${(target / maxTarget) * 100}%` };
    };

    const getTargetMarkerStyles = () => {
        if (!targetWrapRef?.current) return {};

        return { width: `${(result / target) * 100}%`, opacity: 100 };
    };

    const getFormattedString = (num: number) => {
        return new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
        }).format(num);
    };

    useEffect(() => {
        if (targetWrapRef?.current) {
            setWidthPercent(
                targetWrapRef.current.getBoundingClientRect().width / 100
            );
        }
    }, [targetWrapRef]);

    return (
        <div ref={targetWrapRef} className={styles.targetWrap}>
            <div className={styles.result} style={getInnerStyles()}>
                <div
                    className={styles.inner}
                    style={getTargetMarkerStyles()}
                ></div>

                <div className={styles.marker}>
                    <span>{getFormattedString(target)}</span>
                </div>
            </div>
        </div>
    );
};

export default TargetComponent;
