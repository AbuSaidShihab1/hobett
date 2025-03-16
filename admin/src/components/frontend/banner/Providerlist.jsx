import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../../common/Header";

const ProviderList = () => {
  const [providers, setProviders] = useState([]);
  const base_url = import.meta.env.VITE_API_KEY_Base_URL;

  // Fetch Providers
  const fetchProviders = () => {
    axios
      .get(`${base_url}/admin/providers`)
      .then((res) => {
        setProviders(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // Handle Delete Provider
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this provider?")) return;

    axios
      .delete(`${base_url}/admin/provider-remove/${id}`)
      .then(() => {
        setProviders((prev) => prev.filter((provider) => provider._id !== id));
        toast.success("Provider deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to delete provider.");
      });
  };

  return (
    <div className="w-full font-bai overflow-y-auto">
      <Header />
      <Toaster />
      <section className="p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Providers</h1>

        <div className="custom-scrollbar overflow-x-auto bg-white p-6 ">
          <table className="w-full border-collapse rounded-t-[10px] overflow-hidden">
            <thead>
              <tr className="bg-[#4634FF] text-white">
                <th className="p-3 text-left">Provider Name</th>
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider) => (
                <tr key={provider._id} className="border-b even:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-700">{provider.providerName}</td>
                  <td className="p-3">
                    <img src={`${base_url}/images/${provider.imageUrl}`} alt={provider.providerName} className="w-16 h-16 object-cover rounded-lg" />
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(provider._id)}
                      className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {providers.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    No providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProviderList;
