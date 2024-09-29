import { FaHome, FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoBagHandleSharp } from "react-icons/io5";

type SidebarProps = {
  visible: boolean;
};

export default function Sidebar({ visible }: SidebarProps) {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen ${
          visible ? "w-64" : "w-20"
        } bg-gray-800 text-white flex flex-col overflow-hidden transition-all duration-300`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold">{visible ? "Dashboard" : "D"}</h2>
        </div>
        <hr />
        <nav className="flex-1 px-2 space-y-1 py-4">
          <Link
            to="/"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <FaHome className="mr-2 text-gray-400" />
            {visible && <span className="text-gray-300">Home</span>}
          </Link>
          <Link
            to="/pelanggan"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <FaUser className="mr-2 text-gray-400" />
            {visible && <span className="text-gray-300">Pelanggan</span>}
          </Link>
          <Link
            to="/barang"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <IoBagHandleSharp className="mr-2 text-gray-400" />
            {visible && <span className="text-gray-300">Barang</span>}
          </Link>
          <Link
            to="/penjualan"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <FaMoneyCheckAlt className="mr-2 text-gray-400" />
            {visible && <span className="text-gray-300">Penjualan</span>}
          </Link>
          {/* <Link
            to="/item-penjualan"
            className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700"
          >
            <FaMoneyCheckAlt className="mr-2 text-gray-400" />
            {visible && <span className="text-gray-300">Item Penjualan</span>}
          </Link> */}
        </nav>
      </div>
    </>
  );
}
