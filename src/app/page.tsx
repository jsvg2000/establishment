'use client'
import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetc";
import { useLoading } from "@/hooks/useLoading";
import React, { useState } from 'react';

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading} = useLoading()
  const authFetch = useAuthFetch()
  const [aceptado, setAceptado] = useState(false);

  const login = async (FormData:any)=>{
    if(aceptado){
      startLoading()
      const data =await authFetch({
        endpoint:'auth/login',
        redirectRoute: '/home',
        formData:FormData
      })
      localStorage.setItem('token', data.token);
      localStorage.setItem('name', data.token);
      localStorage.setItem('roleId', data.token);
      finishLoading()
    }else{
      alert('Debes aceptar los términos y condiciones.');
    }
  }
    

  return (
    <div>
      <h1 className="initial-message">Debes iniciar sesión para acceder a la plataforma</h1>
      <Form 
        description="Digita tu correo Electrónico y la contraseña" 
        onSubmit={login}
      >
        <div className='my-[10px] flex flex-col gap-4 '>
          <Form.Input
            label='Correo'
            name='email'
            type='text'
          ></Form.Input>
          <Form.Input
            label='Contraseña'
            name='password'
            type='password'
          ></Form.Input>
          <label>
            <input
              type="checkbox"
              checked={aceptado}
              onChange={(e) => setAceptado(e.target.checked)}
            />
            Acepto los términos y condiciones
          </label>
        </div>
        <Form.SubmitButton 
          buttonText="Iniciar Sesión" 
          isLoading={isLoading}
        />
      </Form>
    </div>
  );
}
