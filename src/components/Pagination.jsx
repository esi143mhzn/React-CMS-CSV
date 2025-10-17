import React from 'react'

const Pagination = ({ page, lastPage, setPage, from, to, total }) => {

    const generatePageNumbers = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = 1; i <= lastPage; i++) {
            if(i === 1 || i === lastPage || (i >= page - delta && i <=page + delta)) {
                range.push(i);
            }
        }

        for (let i of range) {
            if(l) {
                if(i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if(i - l > 2){
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }
        return rangeWithDots;
    }

    const pages = generatePageNumbers();

  return (
    <div className='flex items-center mt-6 space-x-3'>
        <div className='text-sm text-gray-600 mr-2'>
            Showing <span className='font-semibold'>{from}</span> to <span className='font-semibold'>{to}</span> of <span className='font-semibold'>{total}</span> results
        </div>

        <div className="flex space-x-1">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className={`px-3 py-1 rounded border ${page === 1 ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}>Prev</button>

            {pages.map((p, index) => p === '...' ? (
                <span key={index} className='px-3 py-1 text-gray-400 select-none'>...</span> ) : (
                <button key={p} onClick={() => setPage(p)} className={`px-3 py-1 rounded ${p === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                    {p}
                </button>
            ))}

            <button onClick={() => setPage(page + 1)} disabled={page === lastPage} className={`px-3 py-1 rounded border ${page === 1 ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-300'}`}>Next</button>
        </div>
    </div>
  )
}

export default Pagination