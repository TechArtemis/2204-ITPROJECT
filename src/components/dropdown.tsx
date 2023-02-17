import { ReactNode, ChangeEvent } from "react";
import styles from "@/styles/components.module.sass";
import { Location } from "@/interface/Location";
import { JobPosting } from "@/interface/JobPosting";

interface Option {
    value: keyof typeof Location.Province | keyof typeof JobPosting.EmploymentType | keyof typeof JobPosting.JobTitleType;
    label: string;
}

interface Props {
  children?: ReactNode;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  name?: string;
}

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


