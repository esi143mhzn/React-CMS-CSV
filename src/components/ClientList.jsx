import React, { useEffect, useState } from 'react'
import { getClients} from '../api/clientApi';
import Pagination from './Pagination';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});

    const fetchClients = async (currentPage = 1) => {
        try {
            const res = await getClients(currentPage);
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
            console.error('Error fetching clients:', error);
        }
    }

    useEffect(() => {
        fetchClients(page);
    }, [page]);

    return (
        <div className='p-6 bg-gray-50 rounded shadow'>
            <div className='flex  justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold mb-4'>Clients Report</h2>
            </div>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-white border border-gray-200 rounded'>
                    <thead className='bg-gray-100'>
                        <tr>
                            <th className='py-3'>S.N.</th>
                            <th className='py-3'>Company Name</th>
                            <th className='py-3'>Email</th>
                            <th className='py-3'>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {clients.map((client, index) => (
                            <tr key={client.id}>
                                <td className='py-2 px-4 border-b'>{(pagination.current_page - 1) * pagination.per_page + index + 1}</td>
                                <td className='py-2 px-4 border-b'>{client.company_name}</td>
                                <td className='py-2 px-4 border-b'>{client.email}</td>
                                <td className='py-2 px-4 border-b'>{client.phone_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Pagination page={page} lastPage={pagination.last_page} setPage={setPage} from={pagination.from} to={pagination.to} total={pagination.total} />
        </div>
    )
}

export default ClientList