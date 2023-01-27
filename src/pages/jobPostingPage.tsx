// Third-party Import
import Image from "next/image";
// Local imports
import styles from "@/styles/JobPostings.module.sass";
import vccLogo from "@/../public/images/vccLogo.png";
import avatar from "@/../public/images/avatar.png";
import Header from "@/components/jobHeader";
import EventCard from "@/components/eventCard";


export default function Home() {
    return (
        <>
            <Header/>

            <div className={styles.fillerBanner}>
                <h1>
                    VCC Co-op Page
                </h1>
            </div>

            <div className={styles.contentRow}>
                <div className={styles.sideBar}>
                    <EventCard/>
                </div>

                <div className={styles.content}></div>
            </div>
        </>
    );
};