import React, { useState } from "react";

// Tipe data untuk form
type FormData = {
  id: string;
  name: string;
  email: string;
};

export const EditPenjualan = () => {
  // State untuk data form
  const [formData, setFormData] = useState<FormData>({
    id: "",
    name: "",
    email: "",
  });
  const [data, setData] = useState<FormData[]>([
    { id: "1", name: "John Doe", email: "johndoe@example.com" },
    { id: "2", name: "Jane Doe", email: "janedoe@example.com" },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false); // Status untuk form edit
  const [editIndex, setEditIndex] = useState<number | null>(null); // Indeks data yang sedang diedit

  // Fungsi untuk menangani perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fungsi untuk menambahkan data baru
  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.id && formData.name && formData.email) {
      setData([...data, formData]);
      setFormData({ id: "", name: "", email: "" });
    }
  };

  // Fungsi untuk mulai mengedit data
  const handleEdit = (index: number) => {
    const item = data[index];
    setFormData(item);
    setIsEditing(true);
    setEditIndex(index);
  };

  // Fungsi untuk memperbarui data yang sedang diedit
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editIndex !== null && formData.id && formData.name && formData.email) {
      const updatedData = [...data];
      updatedData[editIndex] = formData;
      setData(updatedData);
      setFormData({ id: "", name: "", email: "" });
      setIsEditing(false);
      setEditIndex(null);
    }
  };

  // Fungsi untuk menghapus data
  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {isEditing ? "Edit Data" : "Edit Data"}
      </h2>
      <div className="overflow-x-auto">
        <form onSubmit={isEditing ? handleUpdate : handleAdd}>
          <table className="min-w-full bg-white shadow-md rounded-lg mb-4">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                  Email
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
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter ID"
                    disabled={isEditing} // Nonaktifkan input ID saat sedang mengedit
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Name"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-2 py-1 border border-gray-300 rounded"
                    placeholder="Enter Email"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="submit"
                    className={`px-4 py-2 ${
                      isEditing ? "bg-green-500" : "bg-blue-500"
                    } text-white rounded hover:${
                      isEditing ? "bg-green-600" : "bg-blue-600"
                    } transition`}
                  >
                    {isEditing ? "Update" : "Add"}
                  </button>
                </td>
              </tr>
              {data.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};
