import Image from "next/image";
import MobileNavigation from "./MobileNavigation";
import styles from "./Header.module.scss";
import logo from "../../assets/logo.png";
import Link from "next/link";
import Button from "../Button";
import accountIcon from "../../assets/icons/account.svg";
import DesktopNavigation from "./DesktopNavigation";

const Header = () => {
  return (
    <header className={styles.header}>
      <Button label={"Skip to main content"} className={styles.skipNavButton} />
      <Link href="/" className={styles.logo}>
        <Image src={logo} alt="" width={150} height={60} />
      </Link>
      <div className={styles.navContainer}>
        <DesktopNavigation />
        <Link href="/account" className={styles.profileIcon}>
          <Image src={accountIcon} alt={" "} width={30} height={30} />
        </Link>
        <MobileNavigation />
      </div>
    </header>
  );
};

export default Header;
