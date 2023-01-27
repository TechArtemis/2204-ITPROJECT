// Third-party Import
import Image from "next/image";
// Local imports
import styles from "@/styles/JobPostings.module.sass";
import vccLogo from "@/../public/images/vccLogo.png";
import avatar from "@/../public/images/avatar.png";

const EventCard = () => {
    return (
        <>
            <div className={styles.eventCard}>
                <h1>
                    <p>Jan 28</p>
                </h1>
            </div>
        </>
    );
};

export default EventCard;