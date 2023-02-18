import { JobPosting } from "@/interface/JobPosting";
import Image from "next/image";
import styles from "@/styles/components.module.sass";
import { ReactNode, useState } from "react";
import dynamic from "next/dynamic";
import { instance } from "@/shared/axiosInstance";

const FavoriteBorderIcon = dynamic(() => import("@mui/icons-material/FavoriteBorder"));
const FavoriteIcon = dynamic(() => import("@mui/icons-material/Favorite"));



interface Props {
    image: string,
    name: string,
    address : string,
    job: string,
    type: string,
    children?: ReactNode;
    className?: string;
}


export default function Card( props : Props) {
    const [liked, setLiked] = useState(1);

    // async function handleAddToLiked(id: string) {

    // }
    return (
        <div className={styles.cards}>
            {props.children}
            <div className={styles.companyInfo}>
                <div>
                    <Image src={`https://res.cloudinary.com/honeydrew/${props.image}`} alt={"logo"} width={64} height={72}/>
                </div>
                <div>
                    <h3>{props.name}</h3>
                    <h4>{props.address}</h4>
                </div>
            </div>

            <div className={styles.jobInfo}>
                <div>
                    <h1>{props.job}</h1>
                    <h2>{props.type}</h2>
                </div>

                {liked === 1 ?
                    <div>
                        <button onClick={() => setLiked(0)}>
                            <FavoriteBorderIcon/>
                        </button>
                    </div>
                    :
                    <div>
                        <button onClick={() => setLiked(1)}>
                            <FavoriteIcon/>
                        </button>
                    </div>
                }
            </div>
        </div>

    );
};
