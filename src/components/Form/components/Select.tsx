'use client'

import { useContext } from 'react'
import { FormContext } from '..'
import styles from './syles.module.scss'

interface SelectProps {
  name: string
  label: string
  options: { 
    value: string 
    label: string
  }[]
}

export function Select({ label, name, options }: SelectProps) {
  const { formValues, setFormValues } = useContext(FormContext)!

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value
    }))
  }

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={formValues[name] || ''}
        onChange={handleChange}
      >
        <option value="">Seleccione una opción</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
