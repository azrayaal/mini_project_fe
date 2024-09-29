import React, { useState, useEffect } from "react";
import { API } from "../../hooks";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

type FormData = {
  kode_pelanggan: string;
  barang: {
    id: number;
    qty: number;
  }[];
};

export const AddPenjualan: React.FC = () => {
  const [idNota, setIdNota] = useState<string | null>(null); // Store `idNota` after creating penjualan
  const [dataPelanggan, setDataPelanggan] = useState<any[]>([]); // Store pelanggan data from API
  const [dataBarang, setDataBarang] = useState<any[]>([]); // Store barang data from API
  const [formData, setFormData] = useState<FormData>({
    kode_pelanggan: "",
    barang: [],
  });

  const [barangInput, setBarangInput] = useState({ id: 0, qty: 0 });

  // Fetch pelanggan and barang data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const pelangganResponse = await API.get("pelanggan");
        const barangResponse = await API.get("barang");
        setDataPelanggan(pelangganResponse.data);
        setDataBarang(barangResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal memuat data pelanggan atau barang!");
      }
    };

    fetchData();
  }, []);

  // Handle perubahan input untuk pelanggan
  const handlePelangganChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, kode_pelanggan: e.target.value });
  };

  // Handle perubahan input untuk barang
  const handleBarangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBarangInput({
      ...barangInput,
      id: Number(e.target.value), // Updated to store `id`
    });
  };

  // Handle perubahan input untuk quantity
  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBarangInput({
      ...barangInput,
      qty: Number(e.target.value),
    });
  };

  // Fungsi untuk menambah barang ke dalam state
  const addBarang = () => {
    if (barangInput.id && barangInput.qty > 0) {
      setFormData({
        ...formData,
        barang: [...formData.barang, barangInput],
      });
      setBarangInput({ id: 0, qty: 0 });
    } else {
      toast.error("Lengkapi data barang sebelum menambahkannya");
    }
  };

  const navigate = useNavigate();
  // Handle form submit for creating Penjualan
  const handleSubmitPenjualan = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.kode_pelanggan) {
      try {
        // Kirim data penjualan ke backend
        const response = await API.post("penjualan", {
          kode_pelanggan: formData.kode_pelanggan,
        });

        // Assuming API returns the newly created `idNota`
        setIdNota(response.data.id_nota);

        toast.success(
          "Penjualan berhasil ditambahkan! Silakan tambahkan barang."
        );
      } catch (error) {
        toast.error("Gagal menambahkan penjualan!");
      }
    } else {
      toast.error("Lengkapi data pelanggan!");
    }
  };
  console.log("formData", formData.barang);

  // Handle submit for adding items to the penjualan
  const handleSubmitItem = async () => {
    if (idNota && formData.barang.length > 0) {
      try {
        // Kirim setiap barang ke API
        await Promise.all(
          formData.barang.map(async (item) => {
            console.log("Submitting item:", item); // Debugging log to check the payload

            // Ensure the correct payload is being sent
            await API.post(`penjualan/${idNota}/items`, {
              kode_barang: item.id, // Change `id` to `kode_barang`
              qty: item.qty,
            });
          })
        );
        toast.success("Semua item berhasil ditambahkan ke penjualan!");
        setTimeout(() => {
          navigate("/penjualan");
        }, 2000);
      } catch (error) {
        console.error("Error submitting items:", error); // More detailed error log
        toast.error("Gagal menambahkan item ke penjualan!");
      }
    } else {
      toast.error("Tambah penjualan terlebih dahulu atau masukkan barang!");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h2 className="text-2xl font-bold mb-4">Tambah Penjualan</h2>
      <div className="overflow-x-auto">
        {/* Form to create Penjualan */}
        <form onSubmit={handleSubmitPenjualan}>
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    name="kode_pelanggan"
                    value={formData.kode_pelanggan}
                    onChange={handlePelangganChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                  >
                    <option value="">Pilih Pelanggan</option>
                    {dataPelanggan.map((pelanggan) => (
                      <option key={pelanggan.id} value={pelanggan.id}>
                        {pelanggan.nama}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Buat Penjualan
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>

        {/* After creating the penjualan, allow adding items */}
        {idNota && (
          <>
            <h2 className="text-2xl font-bold mt-6 mb-4">
              Tambahkan Barang ke Penjualan (Nota: {idNota})
            </h2>
            <form>
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Barang
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        name="kode_barang"
                        value={barangInput.id}
                        onChange={handleBarangChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                      >
                        <option value="">Pilih Barang</option>
                        {dataBarang.map((barang) => (
                          <option key={barang.id} value={barang.id}>
                            {barang.nama}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        name="qty"
                        value={barangInput.qty}
                        onChange={handleQtyChange}
                        className="w-full px-2 py-1 border border-gray-300 rounded"
                        placeholder="Masukkan Jumlah"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        onClick={addBarang}
                      >
                        Tambah Barang
                      </button>
                    </td>
                  </tr>
                  {formData.barang.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {
                          dataBarang.find((barang) => barang.id === item.id)
                            ?.nama // Display the name of the selected item
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        {item.qty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() =>
                            setFormData({
                              ...formData,
                              barang: formData.barang.filter(
                                (_, i) => i !== index
                              ),
                            })
                          }
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 text-right">
                <button
                  type="button"
                  onClick={handleSubmitItem}
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Simpan Semua Item
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
