import facebook from "@/assets/icons/facebook.svg";
import instagram from "@/assets/icons/instagram.svg";
import tiktok from "@/assets/icons/tiktok.svg";
import youtube from "@/assets/icons/youtube.svg";

export type NavLinkItem = {
  label: string;
  href: string;
};

export type SocialLinkItem = {
  icon: string;
  href: string;
  label: string;
};

export const mainNavItems: NavLinkItem[] = [
  {
    label: "Ben's Recipes",
    href: "/recipes/ben",
  },
  {
    label: "Community recipes",
    href: "/recipes/community",
  },
  {
    label: "Gear",
    href: "/gear",
  },
  {
    label: "About Ben",
    href: "/about",
  },
];

export const infoNavItems: NavLinkItem[] = [
  {
    label: "Accessibility",
    href: "/accessibility",
  },
  {
    label: "Privacy policy",
    href: "/privacy-policy",
  },
  {
    label: "Sitemap",
    href: "/sitemap",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const socialNavItems: SocialLinkItem[] = [
  {
    icon: facebook,
    href: "https://www.facebook.com/",
    label: "Facebook",
  },
  {
    icon: instagram,
    href: "https://www.instagram.com/",
    label: "Instagram",
  },
  {
    icon: tiktok,
    href: "https://www.tiktok.com/",
    label: "Tiktok",
  },
  {
    icon: youtube,
    href: "https://www.youtube.com/",
    label: "YouTube",
  },
];
