"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DesktopNavigation.module.scss";
import { mainNavItems, NavItem } from "@/config/navigation";
import Link from "next/link";

const DesktopNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [focus, setFocus] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const subNavRef = useRef<HTMLUListElement | null>(null);
  const lastDropdownButtonRef = useRef<HTMLButtonElement | null>(null);

  const closeDropdown = () => setActiveDropdown(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDropdown();
        lastDropdownButtonRef?.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (focus) {
      const currentFocusableElements =
        subNavRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );

      if (currentFocusableElements) {
        currentFocusableElements[0].focus();
      }
    }
    return () => {
      setFocus(false);
    };
  }, [focus]);

  return (
    <nav
      ref={navRef}
      className={styles.navigation}
      aria-label="Main navigation"
    >
      <ul className={styles.mainNav}>
        {mainNavItems.map((navItem, index) => {
          const hasDropdown = navItem.children && navItem.children.length > 0;
          const isActive = activeDropdown === index;
          const subNavId = `desktop-subnav-${index}`;

          return hasDropdown ? (
            <li
              key={`${navItem.label}-${index}`}
              className={styles.dropdown}
              onMouseEnter={() => setActiveDropdown(index)}
              onMouseLeave={closeDropdown}
            >
              <button
                type="button"
                className={styles.dropdownButton}
                aria-expanded={isActive}
                aria-controls={subNavId}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  lastDropdownButtonRef.current = e.currentTarget;
                  setActiveDropdown(isActive ? null : index);
                  setFocus(isActive ? false : true);
                }}
              >
                {navItem.label}
              </button>

              <ul
                id={subNavId}
                className={`${styles.subNav} ${isActive ? styles.activeSubNav : ""}`}
                hidden={!isActive}
                ref={subNavRef}
              >
                {navItem.children.map((subNavItem, i) => (
                  <li key={`${subNavItem.label}-${i}`}>
                    <Link href={subNavItem.href} onClick={closeDropdown}>
                      {subNavItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={`${navItem.label}-${index}`}>
              {navItem?.href ? (
                <Link href={navItem.href}>{navItem.label}</Link>
              ) : (
                navItem.label
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNavigation;
