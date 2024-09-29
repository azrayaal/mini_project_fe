import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar visible={sidebarVisible} />
      <div
        className={`flex-1 flex flex-col ${
          sidebarVisible ? "ml-64" : "ml-20"
        } transition-all duration-300`}
      >
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-gray-300 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
