import React from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./target.module.css";
import { getFormattedString } from "../../utils/formatting";

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

    const targetWrapRef = useRef<HTMLDivElement>(null);

    const getInnerStyles = () => {
        if (!widthPercent) return { width: 0 };

        return { width: `${(target / maxTarget) * 100}%` };
    };

    const getTargetMarkerStyles = () => {
        if (!targetWrapRef?.current) return {};

        return { width: `${(result / target) * 100}%`, opacity: 100 };
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
                    <span>{getFormattedString(target, true)}</span>
                </div>
            </div>
        </div>
    );
};

export default TargetComponent;
