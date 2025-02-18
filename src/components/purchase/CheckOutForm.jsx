import React from 'react';
import { Input, Textarea } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

const CheckOutForm = ({ control, handleSubmit, comprar }) => {

  const darkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <div className='flex flex-col gap-2 p-2 bg-backgroundLight/80 dark:bg-backgroundDark/90 shadow-lg rounded-lg'>
      <h2 className='text-textDark dark:text-textLight'>Datos de envio y facturación</h2>
      <form id='checkout-form' className="grid border-none lg:grid-cols-2 gap-2 text-textDark dark:text-textLight" onSubmit={handleSubmit(comprar)}>

        <Controller
          name="nombre"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input color={`${darkTheme ? 'white' : 'black'}`} label="Nombre" {...field} required className="w-full border-none border-transparent" />
          )}
        />

        <Controller
          name="apellido"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input color={`${darkTheme ? 'white' : 'black'}`} label="Apellido" {...field} required className="w-full border-none border-transparent" />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input color={`${darkTheme ? 'white' : 'black'}`} label="Email" type="email" {...field} required className="w-full border-none border-transparent" />
          )}
        />

        <Controller
          name="telefono"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input color={`${darkTheme ? 'white' : 'black'}`} label="Teléfono" type="tel" {...field} required className="w-full border-none border-transparent" />
          )}
        />

        <Controller
          name="direccion"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input color={`${darkTheme ? 'white' : 'black'}`} label="Dirección" {...field} required className="w-full border-none border-transparent" />
          )}
        />

        <Controller
          name="localidad"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input color={`${darkTheme ? 'white' : 'black'}`} label="Localidad" {...field} required className="w-full border-none border-transparent" />
          )}
        />

        <Controller
          name="comentarios"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Textarea color={`${darkTheme ? 'white' : 'black'}`} label="Comentarios" {...field} className="col-sp border-none border-transparentan-2 w-full" />
          )}
        />

      </form>
    </div>

  );
};

export default CheckOutForm;
