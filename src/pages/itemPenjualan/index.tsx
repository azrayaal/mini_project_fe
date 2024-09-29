import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks"; // Make sure API hook is set up

type Penjualan = {
  id: number;
  nota: string;
  tgl: string;
  pelanggan: {
    kode_pelanggan: string;
    nama: string;
  };
  items: Array<{
    kode_barang: string;
    nama_barang: string;
    qty: number;
    harga_satuan: number;
    total_harga: number;
  }>;
  subtotal: number;
};

export default function Penjualan() {
  const [penjualan, setPenjualan] = useState<Penjualan[]>([]);

  // Fungsi untuk mengambil data penjualan dari API
  const getPenjualan = async () => {
    try {
      const response = await API.get("penjualan"); // Assuming API is correctly set up
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
  const handleDelete = async (id: number) => {
    toast.info(`Menghapus penjualan dengan ID Nota: ${id}`);

    try {
      await API.delete(`penjualan/${id}`);
      getPenjualan(); // Refresh daftar penjualan
      toast.success(`Penjualan dengan ID Nota ${id} berhasil dihapus.`);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus penjualan!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer for notifications */}
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
                ITEMS
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
            {penjualan.map((sale) => (
              <tr
                key={sale.id}
                className="border-b hover:cursor-pointer hover:bg-gray-400"
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
                  <ul>
                    {sale.items.map((item, idx) => (
                      <li key={idx}>
                        {item.nama_barang} ({item.qty} pcs @ Rp
                        {item.harga_satuan}) = Rp{item.total_harga}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  Rp{sale.subtotal}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
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
