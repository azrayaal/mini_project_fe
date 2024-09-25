import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks";

export default function Pelanggan() {
  const [pelanggan, setPelanggan] = useState([]);

  // Fungsi untuk mengambil data pelanggan dari API
  const getPelanggan = async () => {
    try {
      const response = await API.get("pelanggan");
      setPelanggan(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPelanggan();
  }, []);

  // Fungsi untuk menghapus pelanggan
  const handleDelete = async (ID_PELANGGAN: any) => {
    // Tampilkan pesan konfirmasi menggunakan toast
    toast.info(`Menghapus pelanggan dengan ID: ${ID_PELANGGAN}`);

    try {
      const response = await API.delete(`pelanggan/${ID_PELANGGAN}`);
      getPelanggan(); // Refresh daftar pelanggan
      toast.success(`Pelanggan dengan ID ${ID_PELANGGAN} berhasil dihapus.`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus pelanggan!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex items-center pb-4">
        <div className="font-bold text-lg">Pelanggan</div>
        <Link to="/pelanggan/add">
          <button className="ml-2 px-4 py-1 h-8 bg-blue-500 text-white rounded text-sm">
            Tambah
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-600 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                ID PELANGGAN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                NAMA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                JENIS KELAMIN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pelanggan.map((user: any, index: any) => (
              <tr
                key={user.ID_PELANGGAN}
                className={`border-b hover:cursor-pointer hover:bg-gray-400  ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.ID_PELANGGAN}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.NAMA}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {user.JENIS_KELAMIN}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/pelanggan/edit/${user.ID_PELANGGAN}`}>
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(user.ID_PELANGGAN)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
