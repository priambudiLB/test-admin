import React from "react";
import {
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { NavItem } from "./Sidebar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Clients",
    href: "/clients",
  },
  {
    label: "Games",
    href: "/games",
  },
  // {
  //   label: "Projects",
  //   href: "/projects",
  //   icon: <FolderIcon className="w-6 h-6" />,
  // },
];
