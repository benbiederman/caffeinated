"use client";

import styles from "./MobileNavigation.module.scss";
import { mainNavItems } from "@/config/navigation";
import Button from "@/components/Button";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const MobileNavigation = () => {
  const [navActive, setNavActive] = useState(false);
  const [subNavActive, setSubNavActive] = useState(false);

  const navRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const toggleNav = () => {
    setNavActive((prev) => !prev);
  };

  const toggleSubNav = () => {
    setSubNavActive((prev) => !prev);
  };

  const closeNav = () => {
    setNavActive(false);
    setSubNavActive(false);
    menuButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!navActive || !navRef.current) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const focusableElements = navRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    const firstElement = focusableElements[0];

    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeNav();
      }

      if (event.key !== "Tab") return;

      const currentFocusableElements =
        navRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (!currentFocusableElements?.length) return;

      const currentFirst = currentFocusableElements[0];
      const currentLast =
        currentFocusableElements[currentFocusableElements.length - 1];

      if (event.shiftKey && document.activeElement === currentFirst) {
        event.preventDefault();
        currentLast.focus();
      }

      if (!event.shiftKey && document.activeElement === currentLast) {
        event.preventDefault();
        currentFirst.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [navActive]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 992px)");

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return;

      setNavActive(false);
      setSubNavActive(false);
    };

    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      desktopQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  return (
    <>
      <Button
        ref={menuButtonRef}
        className={styles.navButton}
        label={navActive ? "Close" : "Menu"}
        onClick={toggleNav}
        aria-expanded={navActive}
        aria-controls="mobile-navigation"
      />
      <nav
        id="mobile-navigation"
        ref={navRef}
        className={`${styles.navigation} ${navActive ? styles.activeNav : ""}`}
        aria-label="Main navigation"
        aria-hidden={!navActive}
      >
        <ul className={styles.mainNav}>
          {mainNavItems.map((navItem, index) => {
            const hasSubNav = navItem.children && navItem.children.length > 0;
            const subNavId = `mobile-subnav-${index}`;

            return hasSubNav ? (
              <li key={`${navItem.label}-${index}`} className={styles.dropdown}>
                <button
                  type="button"
                  onClick={toggleSubNav}
                  tabIndex={navActive ? 0 : -1}
                  aria-expanded={subNavActive}
                  aria-controls={subNavId}
                >
                  {navItem.label}
                </button>

                <ul
                  id={subNavId}
                  className={`${styles.subNav} ${
                    subNavActive ? styles.activeSubNav : ""
                  }`}
                  hidden={!subNavActive}
                >
                  {navItem.children.map((subNavItem, i) => (
                    <li key={`${subNavItem.label}-${i}`}>
                      <Link
                        href={subNavItem?.href}
                        tabIndex={navActive && subNavActive ? 0 : -1}
                      >
                        {subNavItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={`${navItem.label}-${index}`}>
                {navItem?.href ? (
                  <Link href={navItem.href} tabIndex={navActive ? 0 : -1}>
                    {navItem.label}
                  </Link>
                ) : (
                  navItem.label
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        className={`${styles.overlay} ${navActive ? styles.overlayActive : ""}`}
      ></div>
    </>
  );
};

export default MobileNavigation;
