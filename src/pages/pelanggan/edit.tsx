import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Untuk mengambil parameter dari URL
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../hooks";

// Tipe data untuk form
type FormData = {
  nama: string;
  domisili: string;
  jenis_kelamin: string;
};

export const EditPelanggan = () => {
  // State untuk data form
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    domisili: "",
    jenis_kelamin: "",
  });

  const { id } = useParams<{ id: string }>(); // Mengambil id dari URL

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk mengambil detail pelanggan berdasarkan ID dari API
  const getDetailPelanggan = async (id: string) => {
    try {
      const response = await API.get(`pelanggan/${id}`);
      setFormData({
        nama: response.data.nama,
        domisili: response.data.domisili,
        jenis_kelamin: response.data.jenis_kelamin,
      });
    } catch (error) {
      console.error("Gagal memuat data pelanggan:", error);
      toast.error("Gagal memuat data pelanggan!", { theme: "colored" });
    }
  };

  useEffect(() => {
    if (id) {
      getDetailPelanggan(id); // Memuat detail pelanggan jika ada id di URL
    }
  }, [id]);
  const navigate = useNavigate();
  // Fungsi untuk memperbarui data yang sedang diedit
  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Kirim data yang diperbarui ke API
      await API.put(`pelanggan/${id}`, {
        nama: formData.nama,
        domisili: formData.domisili,
        jenis_kelamin: formData.jenis_kelamin,
      });

      // Tampilkan notifikasi sukses
      toast.success("Data pelanggan berhasil diperbarui!", {
        theme: "colored",
      });
      setTimeout(() => {
        navigate("/pelanggan");
      }, 1500); // Delay untuk memberikan waktu toast muncul
    } catch (error) {
      console.error("Gagal memperbarui data pelanggan:", error);
      toast.error("Gagal memperbarui data pelanggan!", { theme: "colored" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h2 className="text-2xl font-bold mb-4">Edit Data Pelanggan</h2>
      <div className="overflow-x-auto">
        <form onSubmit={handleUpdate}>
          <table className="min-w-full bg-white shadow-md rounded-lg mb-4">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Domisili
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Jenis Kelamin
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
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Nama"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="domisili"
                    value={formData.domisili}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Domisili"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="jenis_kelamin"
                    value={formData.jenis_kelamin}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Jenis Kelamin"
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
