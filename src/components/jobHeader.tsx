// Third-party Import
import Image from "next/image";
// Local imports
import styles from "@/styles/JobPostings.module.sass";
import vccLogo from "@/../public/images/vccLogo.png";
import avatar from "@/../public/images/avatar.png";

const JobHeader = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.flex5}>
                    <Image
                        src={vccLogo}
                        alt="VCC Logo"
                        height={135}
                    />
                </div>

                <div className={styles.flex1}>
                    <nav>
                        <ul className={styles.row}>
                            <li><a href="#jobs">Jobs</a></li>
                            <li><a href="#employers">Employers</a></li>
                            <li><a href="#resources">Resources</a></li>
                        </ul>
                    </nav>
                </div>
                <div className={styles.flex1}>
                    <Image
                        src={avatar}
                        alt="VCC Logo"
                        height={90}
                    />
                </div>
            </div>
        </>
    );
};

export default JobHeader;