//third-party import
import { ReactNode } from "react";

/**
 * @param {ReactNode} children - The content of the button
 * @param {() => void} onClick - The function to be called when the button is clicked
 * @param {"button" | "submit"} type - The type of the button
 * @param {string} className - The class name of the button
 */
interface Props {
    children?: ReactNode;
    onClick?: () => void;
    type: "button" | "submit";
    className?: string;
}

// Button component
export default function Button(props: Props) {
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={props.className}
        >
            {props.children}
        </button>
    );
}