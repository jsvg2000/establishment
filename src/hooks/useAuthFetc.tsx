import NotificationContext from '../context/NotificationContext'
import axios, { AxiosRequestConfig } from 'axios'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface AuthFetchProps {
  endpoint: string
  redirectRoute?: string
  formData?: any
  options?: AxiosRequestConfig<any>
}

export function useAuthFetch () {
  const { showNotification } = useContext(NotificationContext)
  const router = useRouter()

  const authRouter = async ({
    endpoint,
    formData,
    redirectRoute,
    options = {}
  }: AuthFetchProps) => {
    try {
      const token = localStorage.getItem('token')

      const config: AxiosRequestConfig = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`
        }
      }

      const { data } = await axios.post(
        `http://localhost:3000/${endpoint}`,
        formData,
        config
      )

      showNotification({
        msj: data.message,
        open: true,
        status: 'success'
      })

      if (redirectRoute) router.push(redirectRoute)
      return data
    } catch (error: any) {
      showNotification({
        msj: error?.response?.data?.message || 'Error desconocido',
        open: true,
        status: 'error'
      })
    }
  }

  return authRouter
}
