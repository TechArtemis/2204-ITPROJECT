import { ReactNode } from "react";
import Image from "next/image";
import styles from "@/styles/components.module.sass";
import router from "next/router";



interface Props {
    id: string,
    name: string,
    image?: string,
    hyperlink: string,
    description: string,
    children?: ReactNode;
    className?: string;
}

export default function ProjectCards(props: Props) {

	function handleClick() {
		router.push(`/projects/view/${props.id}`);
	}

	return (
		<div className={styles.projectCards} onClick={() => handleClick()}>
			{props.children}
			<div className={styles.preview}>
				<Image className={styles.image} src={`https://res.cloudinary.com/di8zlg2gt/image/upload/${props.image}`} alt={"image"} width={500} height={500}/>
			</div>
			<div className={styles.cardcontent}>
				<h3>{props.name}</h3>
				<h4>{props.hyperlink}</h4>
				<p>{props.description}</p>
			</div>
		</div>
	);
}
