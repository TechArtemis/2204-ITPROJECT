import { ReactNode, ChangeEvent } from "react";
import styles from "@/styles/components.module.sass";
import dynamic from "next/dynamic";

const CameraAlt = dynamic(() => import("@mui/icons-material/CameraAlt"));


interface Props {
    value: string;
    label?: string;
    type?: "text" | "password" | "email" | "datetime-local" | "tel" | "textarea" | "file";
    children?: ReactNode;
    onChangeTextArea?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    onChangeInput?: (e: ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    placeholder?: string;
    readonly?: boolean;
    required?: boolean;
    rows?: number;
    className?: string;
  }

export default function Input(props:Props){
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
            ) : props.type === "file" ? (
                <div className={styles.fileupload}>
                    <button>
                        <CameraAlt fontSize={"large"} sx={{ color: "#84BD00" }}/>
                    </button>
                    <input
                        type={props.type || "file" }
                        value={props.value}
                        onChange={props.onChangeInput}
                        placeholder={props.placeholder}
                        name={props.name}
                    />
                </div>
            ): (
                <input
                    className={styles.inputfield}
                    type={ props.type || "text"}
                    value={props.value}
                    onChange={props.onChangeInput}
                    placeholder={props.placeholder}
                    name={props.name}
                />
            )}
        </div>
    );
}