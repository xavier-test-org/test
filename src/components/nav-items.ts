export type NavItem = {
  href: string;
  label: string;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Dashboard" },
  { href: "/orders", label: "Orders" },
];
