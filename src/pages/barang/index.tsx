import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks"; // Pastikan import API dari hooks yang sesuai

export default function Barang() {
  const [barang, setBarang] = useState([]);

  // Fungsi untuk mengambil data barang dari API
  const getBarang = async () => {
    try {
      const response = await API.get("barang");
      setBarang(response.data);
      // toast.success("Data barang berhasil dimuat!");
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data barang!");
    }
  };

  useEffect(() => {
    getBarang();
  }, []);

  // Fungsi untuk menghapus barang berdasarkan ID
  const handleDelete = async (kode: string) => {
    try {
      await API.delete(`barang/${kode}`);
      setBarang(barang.filter((item: any) => item.KODE !== kode));
      toast.success(`Barang dengan kode ${kode} berhasil dihapus.`);
    } catch (error) {
      console.error("Gagal menghapus barang:", error);
      toast.error("Gagal menghapus barang!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex items-center pb-4">
        <div className="font-bold text-lg">Barang</div>
        <Link to="/barang/add">
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
                Kode
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Harga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {barang.map((item: any, index: any) => (
              <tr
                key={item.KODE}
                className={`border-b hover:cursor-pointer hover:bg-gray-400  ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.KODE}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.NAMA}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.KATEGORI}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.HARGA}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link to={`/barang/edit/${item.KODE}`}>
                    <button className="text-blue-600 hover:text-blue-900 mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(item.KODE)}
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
