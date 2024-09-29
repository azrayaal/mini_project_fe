import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks";

// Define types for Penjualan, Item, and Barang
interface Item {
  id: number;
  kode_barang: string;
  nama_barang: string;
  qty: number;
  harga_satuan: number;
  total_harga: number;
}

interface Penjualan {
  nota: string;
  tgl: string;
  pelanggan: {
    kode_pelanggan: string;
    nama: string;
  };
  items: Item[];
  subtotal: number;
}

interface Barang {
  id: number;
  kode: string;
  nama: string;
  harga: number;
}

export default function DetailPenjualan() {
  const [penjualan, setPenjualan] = useState<Penjualan>({
    nota: "",
    tgl: "",
    pelanggan: {
      kode_pelanggan: "",
      nama: "",
    },
    items: [],
    subtotal: 0,
  });

  const [availableItems, setAvailableItems] = useState<Barang[]>([]); // Type for available items
  const { id } = useParams<{ id: string }>(); // Mengambil id dari URL
  const [barangInput, setBarangInput] = useState({ id: 0, qty: 0 });

  // Fetch available items (products) from the API
  const getAvailableItems = async () => {
    try {
      const response = await API.get("barang");
      setAvailableItems(response.data);
    } catch (error) {
      console.error("Failed to load available items", error);
    }
  };

  // Fungsi untuk mengambil data penjualan dari API
  const getPenjualan = async () => {
    try {
      const response = await API.get(`penjualan/${id}`);
      setPenjualan(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Gagal memuat data penjualan!");
    }
  };

  useEffect(() => {
    if (id) {
      getPenjualan();
      getAvailableItems(); // Fetch available items
    }
  }, [id]);

  // Fungsi untuk menghapus penjualan item
  const handleDeleteItem = async (itemId: any) => {
    try {
      await API.delete(`item-penjualan/${itemId}`);
      toast.success("Item berhasil dihapus");
      getPenjualan(); // Refresh the data after deletion
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus item!");
    }
  };

  // Handle perubahan input untuk barang
  const handleBarangChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setBarangInput({
      ...barangInput,
      [name]: name === "qty" ? Number(value) : value, // Ensure qty is treated as a number
    });
  };

  // Fungsi untuk menambah barang ke penjualan
  const handleAddItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Payload:", barangInput); // Log the payload to verify
    if (barangInput.id && barangInput.qty > 0) {
      try {
        // Send correct payload with item id
        await API.post(`penjualan/${penjualan.nota}/items`, {
          kode_barang: barangInput.id,
          qty: barangInput.qty,
        });
        toast.success("Item berhasil ditambahkan!");
        getPenjualan(); // Refresh data after item added
      } catch (error) {
        console.error(error);
        toast.error("Gagal menambahkan item!");
      }
    } else {
      toast.error("Lengkapi data barang sebelum menambahkannya");
    }
  };

  // Function to get item name from the available items based on the kode_barang
  const getItemName = (kode_barang: string) => {
    const item = availableItems.find((barang) => barang.kode === kode_barang);
    return item ? item.nama : "Unknown Item";
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <div className="flex items-center pb-4">
        <div className="font-bold text-lg">Detail Penjualan</div>
        <Link to="/penjualan">
          <button className="ml-2 px-4 py-1 h-8 bg-blue-500 text-white rounded text-sm">
            Kembali
          </button>
        </Link>
      </div>

      {/* Detail Penjualan */}
      <div className="overflow-x-auto mb-6">
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
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {penjualan.nota}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {penjualan.tgl}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {penjualan.pelanggan.nama}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                {penjualan.subtotal}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table Item Penjualan */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-600 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                KODE BARANG
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                NAMA BARANG
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                QTY
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                HARGA SATUAN
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                TOTAL HARGA
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {penjualan.items.map((item: Item, index: any) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-100 ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.kode_barang}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {getItemName(item.kode_barang)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.qty}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.harga_satuan}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  {item.total_harga}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Add Item */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">Tambah Item Penjualan</h3>
        <form onSubmit={handleAddItem} className="flex space-x-4">
          {/* Select Dropdown for Barang */}
          <select
            name="id"
            value={barangInput.id}
            onChange={handleBarangChange}
            className="px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Pilih Barang</option>
            {availableItems.map((barang) => (
              <option key={barang.id} value={barang.id}>
                {barang.nama}
              </option>
            ))}
          </select>

          {/* Input for Qty */}
          <input
            type="number"
            name="qty"
            value={barangInput.qty}
            onChange={handleBarangChange}
            className="px-4 py-2 border border-gray-300 rounded"
            placeholder="Masukkan Jumlah"
          />

          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Tambah Item
          </button>
        </form>
      </div>
    </div>
  );
}
