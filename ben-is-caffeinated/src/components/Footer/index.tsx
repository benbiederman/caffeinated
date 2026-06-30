"use client";
import Image from "next/image";
import Link from "next/link";
import {
  mainNavItems,
  infoNavItems,
  socialNavItems,
} from "@/config/footerNavigation";
import Button from "../Button";
import FooterNavList from "./FooterNavList";
import styles from "./Footer.module.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const submissionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add logic for email subscibe
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <section className={styles.subscribeSection}>
          <div className={styles.subscribeCopy}>
            <h2>Need more coffee in your life?</h2>
            <p>
              Coffee recipes, brewing tips, gear, and more, delivered straight
              to your inbox.
            </p>
          </div>

          <form className={styles.subscribeForm} onSubmit={submissionHandler}>
            <label className={styles.visuallyHidden} htmlFor="footer-email">
              Email address
            </label>

            <input
              id="footer-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />

            <Button type="submit" variant="outline" label="Sign up" />
          </form>
        </section>

        <div className={styles.navGrid}>
          <FooterNavList
            listHeader="Explore"
            navList={mainNavItems}
            className={styles.navSection}
          />

          <FooterNavList
            listHeader="Info"
            navList={infoNavItems}
            className={styles.navSection}
          />

          <div className={styles.socialSection}>
            <h3>Follow along</h3>

            <ul className={styles.socialList}>
              {socialNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>
            &copy; {currentYear} Ben Is Caffeinated. Built by Ben, fueled by
            coffee. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
