'use client'

import { useEffect, useState } from 'react'
import { dateTransform } from '../../utils/dateTransform'

export default function HomePage() {
  const [merchants, setMerchants] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:3000/merchants?page=${page}&limit=${limit}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!res.ok) {
        console.error('Error al obtener los datos')
        return
      }

      const data = await res.json()
      setMerchants(data.data)
      setTotalPages(data.totalPaginas)
    }

    fetchData()
  }, [page, limit])

  return (
    <main className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Lista de Establecimientos</h1>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Nombre del Negocio</th>
            <th className="border px-4 py-2 text-left">Fecha de Registro</th>
            <th className="border px-4 py-2 text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map((merchant: any) => (
            <tr key={merchant.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{merchant.id}</td>
              <td className="px-4 py-2">{merchant.businessName}</td>
              <td className="px-4 py-2">{dateTransform(merchant.registrationDate)}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${merchant.state.name === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {merchant.state.name}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <div>
          <label className="text-sm mr-2">Items:</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={e => setLimit(Number(e.target.value))}
          >
            {[10, 15, 25, 50].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPage(prev => Math.max(1, prev - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            ◀ Anterior
          </button>
          <span className="px-2 py-1 text-sm">Página {page} de {totalPages}</span>
          <button
            onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Siguiente ▶
          </button>
        </div>
      </div>
    </main>
  )
}
