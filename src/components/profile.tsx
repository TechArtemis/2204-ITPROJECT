import { signOut, useSession } from "next-auth/react";

import styles from "@/styles/components.module.sass";
import router from "next/router";
import { useState } from "react";


interface Props {
    session: {
    user: {
        name: string
    }
    }
}

export default function Profile(props: Props) {
    const { data: session } = useSession();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogoClick = () => {
        setShowDropdown(!showDropdown);
    };

    async function handleLogout() {
        await signOut();
        router.push("/");
    }


    const firstLetter = typeof session?.user?.name === "string" && session?.user?.name.length > 0 ? session?.user?.name.charAt(0).toUpperCase() : "";

    return (
        <div className={styles.container}>
            <div className={styles.logo} onClick={handleLogoClick}>
                {firstLetter}
            </div>
            {showDropdown &&
          <div className={styles.option}>
              <div className={styles.optionItem} onClick={handleLogout}>Sign out</div>
          </div>
            }
        </div>
    );
}
