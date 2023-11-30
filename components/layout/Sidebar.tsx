import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";
import iTILESLogo from './iTILES_Logo_Solid.png';
import { Button } from "flowbite-react";
import { ACCESS_TOKEN_KEY } from "consts";
import { useRouter } from "next/router";

// define a NavItem prop
export type NavItem = {
  label: string;
  href: string;
  icon?: React.ReactNode;
};
// add NavItem prop to component prop
type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    router.push('/')
  }

  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });
  return (
    <div
      className={classNames({
        "px-9 py-6 md:py-0": true,
        "flex flex-col justify-between": true, // layout
        "bg-stone text-zinc-50": true, // colors
        "md:w-full md:sticky md:z-0 top-0 z-20 fixed": true, // positioning
        "h-full w-[280px]": true, // for height and width
        "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
        "-translate-x-full ": !open, //hide sidebar to the left when closed
      })}
      ref={ref}
    >
      <nav className="md:sticky top-0 md:top-12">
        {/* nav items */}
        {/* <img src={iTILESLogo} /> */}
        <Image
          src={iTILESLogo}
          width={96}
          height={61}
          alt="Picture of the author"
        />
        <ul className="py-2 mt-16 flex flex-col gap-2">
          {navItems.map((item, index) => {
            return (
              <Link key={index} href={item.href}>
                <li
                  className={classNames({
                    "text-gray-800 hover:bg-gray-200": true, //colors
                    "flex gap-4 items-center ": true, //layout
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-2": true, //self style
                  })}
                >
                  {item.icon} {item.label}
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      {/* account  */}
      <div className="border-t border-t-indigo-800 p-4">
        <div className="flex gap-4 items-center">
          {/* <Image
            src={
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            }
            height={36}
            width={36}
            alt="profile image"
            className="rounded-full"
          /> */}
          <div className="flex flex-col ">
            {/* <span className="text-gray-800 my-0">Tom Cook</span> */}
            <Button onClick={handleLogout} className="text-red-600 text-sm">
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
