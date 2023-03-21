// Third-party imports
import { ReactNode, ChangeEvent } from "react";

// Local imports
import styles from "@/styles/components.module.sass";

/**
 * @param {string} name - The name of the input
 * @param {string} value - The value of the input
 * @param {string} label - The label of the input
 * @param {string} type - The type of the input
 * @param {ReactNode} children - The content of the input
 * @param {(event: ChangeEvent<HTMLTextAreaElement>) => void} onChangeTextArea - The function to be called when the textarea is changed
 * @param {(e: ChangeEvent<HTMLInputElement>) => void} onChangeInput - The function to be called when the input is changed
 * @param {string} placeholder - The placeholder of the input
 * @param {boolean} readonly - Whether the input is readonly or not
 * @param {boolean} required - Whether the input is required or not
 * @param {number} rows - The number of rows of the textarea
 * @param {string} className - The class name of the input
 *
 */
interface Props {
    name?: string;
    value?: string;
    label?: string;
    type?: "text" | "password" | "email" | "datetime-local" | "tel" | "textarea" | "file";
    children?: ReactNode;
    onChangeTextArea?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    className?: string;
}

// The input component
export default function Input(props: Props) {
    return (
        <div className={styles.form}>
            {props.children}
            {props.type === "textarea" ? (
                <textarea
                    className={styles.textfield}
                    value={props.value}
                    rows={props.rows || 5}
                    onChange={props.onChangeTextArea}
                    placeholder={props.placeholder}
                    name={props.name}
                >
                </textarea>
            ) : (
                <input
                    className={styles.inputfield}
                    type={props.type || "text"}
                    value={props.value}
                    onChange={props.onChangeInput}
                    placeholder={props.placeholder}
                    name={props.name}
                />
            )}
        </div>
    );
}