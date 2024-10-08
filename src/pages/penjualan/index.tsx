import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks";

export default function Penjualan() {
  const [penjualan, setPenjualan] = useState([]);

  // Fungsi untuk mengambil data penjualan dari API
  const getPenjualan = async () => {
    try {
      const response = await API.get("penjualan");
      console.log(response.data);
      setPenjualan(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data penjualan!");
    }
  };

  useEffect(() => {
    getPenjualan();
  }, []);

  // Fungsi untuk menghapus penjualan
  const handleDelete = async (nota: string) => {
    // Tampilkan pesan konfirmasi menggunakan toast
    toast.info(`Menghapus penjualan dengan ID Nota: ${nota}`);

    try {
      await API.delete(`penjualan/${nota}`);
      getPenjualan(); // Refresh daftar penjualan
      toast.success(`Penjualan dengan ID Nota ${nota} berhasil dihapus.`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus penjualan!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex items-center pb-4">
        <div className="font-bold text-lg">Penjualan</div>
        <Link to="/penjualan/add">
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
                ID NOTA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                TGL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                NAMA PELANGGAN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                SUBTOTAL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {penjualan.map((sale: any, index: any) => (
              <tr
                key={sale.id}
                className={`border-b hover:cursor-pointer hover:bg-gray-400  ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {sale.nota}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {sale.tgl}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {sale.pelanggan.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {sale.subtotal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {/* <Link to={`/penjualan/edit/${sale.id}`}>
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                  </Link> */}
                  <Link to={`/penjualan/${sale.nota}`}>
                    <button className="text-green-600 hover:green-blue-900 mr-2">
                      Detail
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(sale.id)}
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
