import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks"; // Pastikan untuk menyesuaikan import API
import { useNavigate } from "react-router-dom";

type FormData = {
  kode: string;
  nama: string;
  kategori: string;
  harga: number;
};

export const AddBarang = () => {
  const [formData, setFormData] = useState<FormData>({
    kode: "",
    nama: "",
    kategori: "",
    harga: 0,
  });
  const [data, setData] = useState<FormData[]>([]);
  const navigate = useNavigate();
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "harga" ? Number(value) : value, // Pastikan harga diubah ke tipe number
    });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Pastikan semua field telah terisi
    if (formData.kode && formData.nama && formData.kategori && formData.harga) {
      try {
        // Kirim data ke API menggunakan POST request
        const response = await API.post("barang", {
          KODE: formData.kode,
          NAMA: formData.nama,
          KATEGORI: formData.kategori,
          HARGA: formData.harga,
        });

        // Tambahkan data baru ke state jika berhasil
        setData([...data, response.data]);
        setFormData({ kode: "", nama: "", kategori: "", harga: 0 }); // Reset form

        // Tampilkan notifikasi sukses
        toast.success("Barang berhasil ditambahkan!", { theme: "colored" });
        navigate("/barang");
      } catch (error) {
        console.error("Error menambahkan barang:", error);
        toast.error("Gagal menambahkan barang!", { theme: "colored" });
      }
    } else {
      toast.error("Semua field harus diisi!", { theme: "colored" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h2 className="text-2xl font-bold mb-4">Tambah Barang</h2>
      <div className="overflow-x-auto">
        <form onSubmit={handleSubmit}>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Kode Barang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="kode"
                    value={formData.kode}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Kode Barang"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Nama Barang"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="kategori"
                    value={formData.kategori}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Kategori"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="number"
                    name="harga"
                    value={formData.harga}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Harga"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};
