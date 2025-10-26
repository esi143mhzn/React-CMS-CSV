import React, { useEffect, useState } from "react";
import { getDuplicateClients, deleteDuplicateClient, updateDuplicateClient } from "../api/clientApi";
import Pagination from './Pagination';
import { Link } from "react-router-dom";

const DuplicateClients = () => {
    const [duplicateClients, setDuplicateClients] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [successMsg, setSuccessMsg] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [formData, setFormData] = useState({
        "company_name": "",
        "email": "",
        "phone_number": ""
    })

    useEffect(() => {
        fetchClients(page);
    }, [page]);

    const fetchClients = async (currentPage = 1) => {
        try {
            const res = await getDuplicateClients(currentPage);
            setDuplicateClients(res.data.data);
            setPagination({
                current_page: res.data.current_page,
                last_page: res.data.last_page,
                from: res.data.from,
                to: res.data.to,
                total: res.data.total,
                per_page: res.data.per_page
            });
        } catch (error) {
            console.error("Error fetching clients:", error);
        }
    };

    const openEditModal = (dupClient) => {
        setSelectedClient(dupClient);
        setFormData({
            company_name: dupClient.company_name,
            email: dupClient.email,
            phone_number: dupClient.phone_number
        })
        setShowModal(true);
    }

    const handleEditChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value}) 
    }

    const handleUpdate = async(e) => {
        e.preventDefault();
        try {
            const res = await updateDuplicateClient(selectedClient.id, formData);
            setSuccessMsg(res.data.message);
            setShowModal(false);
            fetchClients(pagination.current_page);
        } catch (error) {
            console.error("Update Failed:", error);
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        try {
            const res = await deleteDuplicateClient(id);
            console.log(res.data.message)
            setSuccessMsg(res.data.message);
            fetchClients(pagination.current_page);
        } catch (error) {
            console.error("Failed to delete client.", error);
        }
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">List of Duplicate Clients</h2>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                    <Link
                        to="/clients"
                        className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition"
                    >
                        Back to Clients
                    </Link>
                </div>

                {/* Alerts */}
                {successMsg && (
                    <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md mb-3 text-sm">
                        {successMsg}
                    </div>
                )}

                {/* Clients Table */}
                <div className="bg-white rounded-md shadow overflow-hidden">
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2 w-16">S.N.</th>
                                <th className="px-4 py-2">Company Name</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Phone Number</th>
                                <th className="px-4 py-2 w-40">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {duplicateClients.length > 0 ? (
                                duplicateClients.map((dup_client, index) => (
                                    <tr
                                        key={dup_client.id}
                                        className="border-b hover:bg-gray-50 transition"
                                    >
                                        <td className="px-4 py-2">
                                            {(pagination.current_page - 1) * pagination.per_page +
                                                index +
                                                1}
                                        </td>
                                        <td className="px-4 py-2">{dup_client.company_name}</td>
                                        <td className="px-4 py-2">{dup_client.email}</td>
                                        <td className="px-4 py-2">{dup_client.phone_number}</td>
                                        <td className="px-4 py-2">
                                            <button className="bg-blue-500 mr-3 hover:bg-blue-600 transiton duration-200 text-white px-3 py-1 rounded-md" onClick={() => openEditModal(dup_client)}>Edit</button>

                                            <button className="bg-red-500 hover:bg-red-600 transiton duration-200 text-white px-3 py-1 rounded-md" onClick={() => handleDelete(dup_client.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="text-center py-3 text-gray-500 italic"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Edit Modal */}
                    {showModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                                <h3 className="text-xl font-semibold mb-4">Edit Client</h3>
                                <form onSubmit={handleUpdate}>
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Company Name</label>
                                        <input
                                            type="text"
                                            name="company_name"
                                            value={formData.company_name}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                                        <input
                                            type="text"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleEditChange}
                                            className="w-full border border-gray-300 rounded-md p-2"
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2 mt-4">
                                        <button
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <Pagination page={page} lastPage={pagination.last_page} setPage={setPage} from={pagination.from} to={pagination.to} total={pagination.total} />
            </div>
        </div>
    );
};

export default DuplicateClients;
