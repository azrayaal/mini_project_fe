// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./pages/home";
import Layout from "./pages/layout";
import Barang from "./pages/barang";
import Penjualan from "./pages/penjualan";
import Pelanggan from "./pages/pelanggan";
import { AddBarang } from "./pages/barang/add";
import { AddPelanggan } from "./pages/pelanggan/add";
import { AddPenjualan } from "./pages/penjualan/add";
import { EditBarang } from "./pages/barang/edit";
import { EditPenjualan } from "./pages/penjualan/edit";
import { EditPelanggan } from "./pages/pelanggan/edit";
import { ToastContainer } from "react-toastify";
import ItemPenjualan from "./pages/itemPenjualan";
import { AddItemPenjualan } from "./pages/itemPenjualan/add";
import { EditItemPenjualan } from "./pages/itemPenjualan/edit";
import DetailPenjualan from "./pages/penjualan/detail";
// import Home from "./pages/home";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const App: React.FC = () => {
  return (
    <Router>
      <div className="h-screen">
        <Layout>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/barang" element={<Barang />} />
            <Route path="/barang/add" element={<AddBarang />} />
            <Route path="/barang/edit/:id" element={<EditBarang />} />
            {/* penjualan */}
            <Route path="/penjualan" element={<Penjualan />} />
            <Route path="/penjualan/add" element={<AddPenjualan />} />
            <Route path="/penjualan/:id" element={<DetailPenjualan />} />
            <Route path="/penjualan/edit/:id" element={<EditPenjualan />} />
            {/* item-penjualan */}
            <Route path="/item-penjualan" element={<ItemPenjualan />} />
            <Route path="/item-penjualan/add" element={<AddItemPenjualan />} />
            <Route
              path="/item-penjualan/edit/:id"
              element={<EditItemPenjualan />}
            />
            {/* pelanggan */}
            <Route path="/pelanggan" element={<Pelanggan />} />
            <Route path="/pelanggan/add" element={<AddPelanggan />} />
            <Route path="/pelanggan/edit/:id" element={<EditPelanggan />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
