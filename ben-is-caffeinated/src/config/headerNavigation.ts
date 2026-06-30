export type NavLinkItem = {
  label: string;
  href: string;
  children?: never;
};

export type NavDropdownItem = {
  label: string;
  href?: string;
  children: NavLinkItem[];
};

export type NavItem = NavLinkItem | NavDropdownItem;

export const mainNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Recipes",
    children: [
      { label: "Ben's recipes", href: "/recipes/ben" },
      { label: "Community recipes", href: "/recipes/community" },
      { label: "Submit a recipe", href: "/recipes/submit" },
    ],
  },
  { label: "Gear", href: "/gear" },
  { label: "About Ben", href: "/about" },
];
