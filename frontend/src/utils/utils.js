import { HomeIcon, ChartBarIcon, PackageIcon, CogIcon } from "lucide-react";

export function extractUsername(email) {
  return email.split("@")[0];
}

export const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: HomeIcon },
  { name: "Progress", path: "/progress", icon: ChartBarIcon },
  { name: "Shipments", path: "/shipments", icon: PackageIcon },
  { name: "Settings", path: "/settings", icon: CogIcon },
];
