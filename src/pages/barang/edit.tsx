import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks"; // Pastikan untuk menyesuaikan import API

// Tipe data untuk form barang
type FormData = {
  kode: string;
  nama: string;
  kategori: string;
  harga: number;
};

export const EditBarang = () => {
  // State untuk data form
  const [formData, setFormData] = useState<FormData>({
    kode: "",
    nama: "",
    kategori: "",
    harga: 0,
  });

  const { id } = useParams<{ id: string }>(); // Mengambil id dari URL

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "harga" ? Number(value) : value,
    });
  };

  // Fungsi untuk mengambil detail barang berdasarkan ID dari API
  const getDetailBarang = async (id: string) => {
    try {
      const response = await API.get(`barang/${id}`);
      setFormData({
        kode: response.data.KODE,
        nama: response.data.NAMA,
        kategori: response.data.KATEGORI,
        harga: response.data.HARGA,
      });
      // toast.success("Data barang berhasil dimuat!", { theme: "colored" });
    } catch (error) {
      console.error("Gagal memuat data barang:", error);
      toast.error("Gagal memuat data barang!", { theme: "colored" });
    }
  };

  useEffect(() => {
    if (id) {
      getDetailBarang(id); // Memuat detail barang jika ada id di URL
    }
  }, [id]);

  const navigate = useNavigate();
  // Fungsi untuk memperbarui data yang sedang diedit
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Kirim data yang diperbarui ke API
      await API.put(`barang/${formData.kode}`, {
        KODE: formData.kode,
        NAMA: formData.nama,
        KATEGORI: formData.kategori,
        HARGA: formData.harga,
      });

      // Tampilkan notifikasi sukses
      toast.success("Data barang berhasil diperbarui!", { theme: "colored" });
      navigate("/barang");
    } catch (error) {
      console.error("Gagal memperbarui data barang:", error);
      toast.error("Gagal memperbarui data barang!", { theme: "colored" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h2 className="text-2xl font-bold mb-4">Edit Data Barang</h2>
      <div className="overflow-x-auto">
        <form onSubmit={handleUpdate}>
          <table className="min-w-full bg-white shadow-md rounded-lg mb-4">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Kode Barang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Nama Barang
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
                    placeholder="Enter Kode"
                    disabled // Nonaktifkan input Kode karena tidak boleh diedit
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
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Update
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
