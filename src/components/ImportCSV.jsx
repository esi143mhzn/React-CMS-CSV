import React, { useState, useRef } from 'react'
import { importClients } from '../api/clientApi';

const ImportCSV = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [importErrors, setImportErrors] = useState({});
  const [duplicates, setDuplicates] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileInputRef = useRef(null);

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return setErrorMsg('Please select a CSV file.');

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setImportErrors({});
    setDuplicates({});

    try {
      const res = await importClients(file);
      setSuccessMsg(res.data.message);
      setImportErrors(res.data.import_errors || {});
      setErrorMsg(res.data.error || []);
      setDuplicates(res.data.duplicates || {});

      onSuccess && onSuccess();
      setFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const errMsg = err.response.data
      console.log(errMsg.error)
      setErrorMsg("Import Failed: " + errMsg.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-white p-4 rounded-md shadow">
      <form onSubmit={handleImport} className="flex flex-wrap items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm w-60 cursor-pointer"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 transition"
          disabled={loading}>
          {loading ? "Importing..." : "Import CSV"}
        </button>
      </form>

      {/* Alerts */}
      {successMsg && (
        <div className="bg-green-100 text-green-800 px-3 py-2 rounded-md mt-3 text-sm">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="bg-red-100 text-red-800 px-3 py-2 rounded-md mt-3 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Import Errors */}
      {Object.keys(importErrors).length > 0 && (
        <div className="border border-red-400 rounded-md mt-3">
          <div className="bg-red-500 text-white px-3 py-2 rounded-t-md">
            Import Errors
          </div>
          <div className="p-3 text-sm text-red-700 bg-red-50">
            <ul className="list-disc list-inside">
              {Object.entries(importErrors).map(([row, msgs]) => (
                <li key={row}>
                  <strong>Row {row}:</strong> {msgs.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Duplicates */}
      {Object.keys(duplicates).length > 0 && (
        <div className="border border-yellow-400 rounded-md mt-3">
          <div className="bg-yellow-400 text-white px-3 py-2 rounded-t-md">
            Duplicates Detected During Import
          </div>
          <div className="p-3 text-sm bg-yellow-50 text-yellow-800">
            <ul className="list-disc list-inside">
              {Object.entries(duplicates).map(([row, msg]) => (
                <li key={row}>
                  <strong>Row {row}:</strong> {msg}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImportCSV