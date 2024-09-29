import React, { useState } from "react";
import axios from "axios";
import { API } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type FormData = {
  // id_pelanggan: string;
  nama: string;
  domisili: string;
  jenis_kelamin: string;
};

export const AddPelanggan = () => {
  const [formData, setFormData] = useState<FormData>({
    // id_pelanggan: "",
    nama: "",
    domisili: "",
    jenis_kelamin: "",
  });
  const [data, setData] = useState<FormData[]>([]);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Format data yang akan dikirim ke API
    const newPelanggan = {
      // ID_PELANGGAN: formData.id_pelanggan,
      nama: formData.nama,
      domisili: formData.domisili,
      jenis_kelamin: formData.jenis_kelamin,
    };

    try {
      // Kirim data ke API
      const response = await API.post("pelanggan", newPelanggan);
      // Tambahkan data baru ke state jika berhasil
      setData([...data, response.data]);
      // Tampilkan notifikasi sukses
      toast.success("Pelanggan berhasil ditambahkan!", { theme: "colored" });
      // Redirect ke halaman pelanggan
      setTimeout(() => {
        navigate("/pelanggan");
      }, 1500); // Delay untuk memberikan waktu toast muncul
    } catch (error) {
      console.error("Error menambahkan pelanggan:", error);
      // Tampilkan notifikasi error
      toast.error("Gagal menambahkan pelanggan!", { theme: "colored" });
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* ToastContainer untuk menampilkan notifikasi */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      <h2 className="text-2xl font-bold mb-4">Tambah Pelanggan</h2>
      <div className="overflow-x-auto">
        <form onSubmit={handleSubmit}>
          <table className="min-w-full bg-white shadow-md rounded-lg">
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
