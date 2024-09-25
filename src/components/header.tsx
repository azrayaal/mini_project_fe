import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className=" shadow-sm p-4 flex justify-between items-center">
      <GiHamburgerMenu
        className="cursor-pointer text-2xl"
        onClick={toggleSidebar}
      />
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* Komponen lain seperti logout, user info, dll. */}
      </div>
    </header>
  );
}
