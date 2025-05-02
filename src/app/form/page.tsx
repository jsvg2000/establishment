'use client'

import { useEffect, useState } from "react"
import { Form } from "@/components/Form"
import { useAuthFetch } from "@/hooks/useAuthFetc"
import { useLoading } from "@/hooks/useLoading"
import axios from "axios"

export default  function FormPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()
  const authFetch = useAuthFetch()

  const [municipalities, setMunicipalities] = useState([])
  const [loadingMunicipalities, setLoadingMunicipalities] = useState(true)
  
  const active = [
    { value: '1', label: 'Activo' },
    { value: '2', label: 'Inactivo' },
  ]


  useEffect(() => {
    const fetchMunicipalities = async () => {
      try {
        const response = await axios.get('http://localhost:3000/town', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setMunicipalities(
          response.data.map((m: any) => ({
            value: m.id.toString(),
            label: m.name
          }))
        )
      } catch (error) {
        console.error('Error al obtener municipios:', error)
      } finally {
        setLoadingMunicipalities(false)
      }
    }

    fetchMunicipalities()
  }, [])

  

  const dataMerchants = async (formData:any) => {
    startLoading()
    await authFetch({
      endpoint:'merchants',
      redirectRoute: '/home',
      formData:formData
    })
    finishLoading()
  }

  if (loadingMunicipalities) return <p>Cargando municipios...</p>

  return (
    <div>
      <Form title="Datos Generales" onSubmit={dataMerchants}>
        <div className="flex flex-wrap gap-10 ">
          <div className="w-[45%]">
            <Form.Input label="Razón Social" name="businessName" type="text" />

            <Form.Select label="Municipio" name="municipality" options={municipalities} />

            <Form.Input label="Teléfono" name="phone" type="number" />

            <Form.Input label="Correo Electrónico" name="email" type="email" />
          </div>

          <div className="w-[45%]">
            <Form.Input label="Fecha de Registro" name="registrationDate" type="date" />

            <Form.Select label="Estado" name="stateId" options={active} />

            <label>
              <input type="checkbox" />
              ¿Posee establecimientos?
            </label>
          </div>
        </div>

        <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading} />
      </Form>
    </div>
  )
}
