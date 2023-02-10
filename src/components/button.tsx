
import { ReactNode } from "react";
import styles from "@/styles/components.module.sass";

interface Props {
    children?: ReactNode;
    onClick?: () => void;
    type: "button" | "submit";
    className?: string;
}

export default function Button(props: Props) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={styles.button}
        >
            {props.children}
        </button>
    );
}