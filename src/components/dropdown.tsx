// Third-party imports
import { ReactNode, ChangeEvent } from "react";

// Local imports
import styles from "@/styles/components.module.sass";
import { Location } from "@/interface/Location";
import { JobPosting } from "@/interface/JobPosting";


/**
 * @param {ReactNode} children - The content of the select option
 * @param {string} value - The value of the select option
 * @param {(e: ChangeEvent<HTMLSelectElement>) => void} onChange - The function to be called when the select option is changed
 * @param {Option[]} options - The options of the select option
 * @param {string} name - The name of the select option
 */
interface Props {
    children?: ReactNode;
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    options: Option[];
    name?: string;
}

// The options of the select option
interface Option {
    value: keyof typeof Location.Province | keyof typeof JobPosting.EmploymentType | keyof typeof JobPosting.JobTitleType;
    label: string;
}

// SelectOption component
export default function SelectOption(props: Props) {
    return (
        <div className={styles.form}>
            {props.children}
            <select
                className={styles.dropdown}
                id="selected"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}


