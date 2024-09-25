import { FaHome, FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBagHandleSharp } from "react-icons/io5";

type SidebarProps = {
  visible: boolean;
};

export default function Sidebar({ visible }: SidebarProps) {
  return (
    <>
      {/* full sidebar */}
      <div
        className={`w-64 h-full bg-gray-800 text-white flex-col ${
          visible ? "flex" : "hidden"
        }`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <hr />
        <nav className="flex-1 px-2 space-y-1 py-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <FaHome className="mr-2 text-gray-400" />
              <span className="text-gray-300">Home</span>
            </div>
          </Link>
          <Link
            to="/pelanggan"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <FaUser className="mr-2 text-gray-400" />
              <span className="text-gray-300">Pelanggan</span>
            </div>
          </Link>
          <Link
            to="/barang"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <IoBagHandleSharp className="mr-2 text-gray-400" />
              Barang
            </div>
          </Link>
          <Link
            to="/penjualan"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <FaMoneyCheckAlt className="mr-2 text-gray-400" />
              Penjualan
            </div>
          </Link>
        </nav>
      </div>

      {/* hide sidebar */}
      <div
        className={`w-20 h-screen bg-gray-800 text-white text-center ${
          visible ? "hidden" : "flex"
        } flex-col`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">D</h2>
        </div>
        <hr />
        <nav className="flex-1 px-2 space-y-1 py-4">
          <Link
            to="/"
            className="block items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <FaHome className="mx-auto text-gray-400" />
            </div>
          </Link>
          <Link
            to="/pelanggan"
            className="block items-center text-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center ">
              <FaUser className="mx-auto text-gray-400" />
            </div>
          </Link>
          <Link
            to="/barang"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center ">
              <IoBagHandleSharp className="mx-auto text-gray-400" />
            </div>
          </Link>
          <Link
            to="/penjualan"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <div className="flex items-center">
              <FaMoneyCheckAlt className="mx-auto text-gray-400" />
            </div>
          </Link>
        </nav>
      </div>
    </>
  );
}
