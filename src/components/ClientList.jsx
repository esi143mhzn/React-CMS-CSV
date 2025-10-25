import React, { useEffect, useState } from "react";
import { getClients, getExportClients } from "../api/clientApi";
import Pagination from './Pagination';
import ImportCSV from '../components/ImportCSV'

const ClientReport = () => {
  const [clients, setClients] = useState([]);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchClients(page, filter);
  }, [page, filter]);

  const fetchClients = async (currentPage = 1, currentFilter = "all") => {
    try {
      const res = await getClients(currentPage, currentFilter);
      setClients(res.data.data);
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

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1);
  };

  const handleExport = async () => {
    try {
      await getExportClients(filter);
    } catch (err) {
      console.error("Export error:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Clients Report</h2>

        {/* Alerts */}

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <button
            onClick={handleExport}
            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
          >
            Export CSV
          </button>

          <a
            href="/duplicate-clients"
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition"
          >
            Manage Duplicates
          </a>

          {/* Import Form */}
          <div className="ml-auto w-full md:w-auto">
            <ImportCSV onSuccess={() => fetchClients()} />
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4 flex items-center gap-3">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="duplicates">Duplicates</option>
            <option value="unique">Unique</option>
          </select>
        </div>

        {/* Import Errors */}
        

        {/* Duplicates */}
        

        {/* Clients Table */}
        <div className="bg-white rounded-md shadow overflow-hidden">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 w-16">S.N.</th>
                <th className="px-4 py-2">Company Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2 w-24">Duplicate</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client, index) => (
                  <tr
                    key={client.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2">
                      {(pagination.current_page - 1) * pagination.per_page +
                        index +
                        1}
                    </td>
                    <td className="px-4 py-2">{client.company_name}</td>
                    <td className="px-4 py-2">{client.email}</td>
                    <td className="px-4 py-2">{client.phone_number}</td>
                    <td className="px-4 py-2">
                      {client.is_duplicate ? (
                        <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded text-xs font-medium">
                          Yes
                        </span>
                      ) : (
                        <span className="bg-green-200 text-green-900 px-2 py-1 rounded text-xs font-medium">
                          No
                        </span>
                      )}
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
        </div>

        {/* Pagination */}
        <Pagination page={page} lastPage={pagination.last_page} setPage={setPage} from={pagination.from} to={pagination.to} total={pagination.total} />
      </div>
    </div>
  );
};

export default ClientReport;
