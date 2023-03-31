// Third-party imports
import Image from "next/image";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { instance } from "@/shared/axiosInstance";
import { red } from "@mui/material/colors";
import router from "next/router";

// Local imports
import styles from "@/styles/components.module.sass";

// Dynamic imports
const FavoriteBorderIcon = dynamic(() => import("@mui/icons-material/FavoriteBorder"));
const FavoriteIcon = dynamic(() => import("@mui/icons-material/Favorite"));

/**
 * @param {string} id - The id of the job
 * @param {string} image - The image of the company
 * @param {string} name - The name of the company
 * @param {string} address - The address of the company
 * @param {string} job - The job title
 * @param {string} type - The type of job
 * @param {boolean} liked - Whether the job is liked or not
 * @param {ReactNode} children - The content of the card
 * @param {string} className - The class name of the card
 * @param {(jobID: string) => void} extraFunction - The function to be called when the button is clicked
 *
 */

interface Props {
    id: string;
    image?: string,
    name: string,
    address: string,
    job: string,
    type: string,
    liked: boolean,
	tags: string[],
    children?: ReactNode;
    className?: string;
    extraFunction?: (jobID: string) => void;
}

// Card component
export default function Card(props: Props) {

	const [liked, setLiked] = useState<boolean>(props.liked);

	async function handleAddToLiked(id: string, action: string) {

		if (props.extraFunction && action !== "add") {
			props.extraFunction(id);
		}

		if (action === "add") {
			setLiked(true);
			const res = await instance.post("favorites", { id, action }).then(response => console.log(response)).catch(error => console.log(error));
		} else {
			setLiked(false);
			const res = await instance.post("favorites", { id, action }).then(response => console.log(response)).catch(error => console.log(error));
		}
	}

	function handleClick() {
		router.push(`/jobs/view/${props.id}`);
	}

	return (
		<div className={styles.cards}>
			{props.children}
			<div className={styles.companyInfo} onClick={() => handleClick()}>
				<div className={styles.companyLogo}>
					<Image className={styles.cardLogo} src={`https://res.cloudinary.com/honeydrew/image/upload/${props.image}`} alt={"image"} width={50} height={50} />
				</div>
				<div>
					<h3>{props.name}</h3>
					<h4>{props.address}</h4>
				</div>
			</div>

			<div className={styles.jobInfo} onClick={() => handleClick()}>
				<h1>{props.job}</h1>
				<h2>{props.type}</h2>
				<div className={styles.tag}>
					<div className={styles.tags}>
						<p>{props.tags[0]}</p>
					</div>
					<div className={styles.tags}>
						<p>{props.tags[1]}</p>
					</div>
				</div>
			</div>
			<div>
				{!liked ?
					<div className={styles.heartIcon}>
						<button onClick={() => handleAddToLiked(props.id as string, "add")}>
							<FavoriteBorderIcon fontSize="large" />
						</button>
					</div>
					:
					<div className={styles.heartIcon}>
						<button onClick={() => handleAddToLiked(props.id as string, "remove")}>
							<FavoriteIcon fontSize="large" sx={{ color: red[500] }}/>
						</button>
					</div>
				}
			</div>
		</div>

	);
};

