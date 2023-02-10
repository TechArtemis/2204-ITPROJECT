import { ChangeEvent, useRef, MouseEvent } from "react";
import Image from "next/image";
import styles from "@/styles/components.module.sass";

interface Props {
    image: File | null;
    imageUrl?: string;
    onRemove?: (e: MouseEvent<HTMLButtonElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}


export default function ImageUpload(props: Props) {
    return (
        <div className={styles.imgwrapper}>
            <div className={styles.upload}>
                {props.image ? (
                    <Image src={URL.createObjectURL(props.image)} alt="" />
                ) : (
                    <div className={styles.icon}>
                        <i className="fa fa-camera" aria-hidden="true"></i>
                    </div>
                )}
            </div>
            <input
                type="file"
                id="file-input"
                className={styles.fileinput}
                accept="image/*"
                onChange={props.onChange}
            />
            {props.image && (
                <button className={styles.remove} onClick={props.onRemove}>
                    <p className="fa fa-times" aria-hidden="true"></p>
                </button>
            )}
        </div>
    );
}