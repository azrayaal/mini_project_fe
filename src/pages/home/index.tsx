import React from "react";
import { FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap -mx-2">
          {/* Card 1 */}

          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 ">
            <Link to="/pelanggan">
              <div className="bg-blue-600 shadow-md rounded-lg p-6 hover:bg-blue-800 transition duration-300 ease-in-out cursor-pointer">
                <div className="flex items-center">
                  <FaUser className="mr-2 text-white" />
                  <h2 className="text-xl font-semibold ">Pelanggan</h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <Link to="/barang">
              <div className="bg-yellow-500 shadow-md rounded-lg p-6 hover:bg-yellow-700 transition duration-300 ease-in-out cursor-pointer">
                <div className="flex items-center">
                  <IoBagHandleSharp className="mr-2 text-white" />{" "}
                  <h2 className="text-xl font-semibold">Barang</h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
            <Link to="/penjualan">
              <div className="bg-green-600 shadow-md rounded-lg p-6 hover:bg-green-800 transition duration-300 ease-in-out cursor-pointer">
                <div className="flex items-center">
                  <FaMoneyCheckAlt className="mr-2 text-white" />
                  <h2 className="text-xl font-semibold">Penjualan</h2>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
