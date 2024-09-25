import React, { useState } from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  // State untuk mengontrol visibilitas sidebar
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Fungsi untuk mengubah status sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex h-full">
      <Sidebar visible={sidebarVisible} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-gray-300">{children}</main>
      </div>
    </div>
  );
}
