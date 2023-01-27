// Third-party Import
import Image from "next/image";
// Local imports
import styles from "@/styles/Header.module.sass";
import vccLogo from "@/../public/images/vccLogo.png";
import avatar from "@/../public/images/avatar.png";

// flex ~ Utilities for controlling how flex items both grow and shrink.
// justify-center ~ justify-content: center;

const JobHeader = () => {
    return (
        <>
            <div className="flex justify-center items-center py-6">
                <Image
                    src={vccLogo}
                    alt="VCC Logo"
                    height={100}
                />
                <Image
                    src={avatar}
                    alt="VCC Logo"
                    height={50}
                />
            </div>
        </>
    );
};

export default JobHeader;