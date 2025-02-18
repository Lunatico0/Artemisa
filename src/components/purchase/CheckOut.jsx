import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../context/CartContext.jsx';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import CheckOutForm from './CheckOutForm.jsx'
import Swal from 'sweetalert2';

const CheckOut = () => {
  const { carrito, calcularTotal, vaciarCarrito, cartId } = useContext(CartContext);
  const { control, register, handleSubmit, watch } = useForm();
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const comprar = async (data) => {
    if (!cartId) {
      Swal.fire('Error', 'No hay un carrito válido para procesar la compra.', 'error');
      return;
    }

    const pedido = {
      cliente: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        telefono: data.telefono,
        direccion: data.direccion,
        localidad: data.localidad,
        comentarios: data.comentarios
      }
    };

    try {
      const response = await fetch(`${BASE_URL}/carts/${cartId}/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido)
      });

      const isJsonResponse = response.headers.get("content-type")?.includes("application/json");

      if (response.ok) {
        if (isJsonResponse) {
          const result = await response.json();
          setTicketId(result.ticket._id);
          setPurchaseSuccess(true);
          Swal.fire({
            title: 'Compra realizada',
            text: `Tu código de compra es: ${result.ticket._id}`,
            icon: 'success',
            confirmButtonText: 'Ver ticket'
          }).then(() => {
            vaciarCarrito();
            navigate(`/ticket/${result.ticket._id}`, { state: { ticket: result.ticket } });
          });
        } else {
          setPurchaseSuccess(true);
          Swal.fire('Compra realizada', 'Tu compra fue exitosa. Revisa tu correo para más detalles.', 'success');
        }
      } else {
        const errorText = isJsonResponse ? (await response.json()).message : 'Error desconocido';
        Swal.fire('Error en la compra', errorText, 'error');
      }
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      Swal.fire('Error', 'No se pudo procesar la compra', 'error');
    }
  };

  if (purchaseSuccess) {
    return (
      <div className="compraRealizada">
        <div className='graciasCompra'>
          <h2>Muchas gracias por tu compra</h2>
          <p>Tu código de seguimiento es: {ticketId}</p>
          <NavLink to="/" className="btn bg-principal text-white px-4 py-2 rounded-md">Volver al inicio</NavLink>
        </div>
      </div>
    );
  }

  return (
    <>
      {carrito.length > 0 ? (
        <>
          <div
            className="flex flex-col px-2 pt-20 lg:pt-40 gap-3 z-20 lg:w-3/4 mx-auto h-[93dvh]"
          >
            <div className="flex flex-col gap-2">
              {carrito.map(prod => (
                <div key={prod.product._id} className="flex flex-row justify-between items-center border border-gray-800 rounded-lg gap-2 backdrop-blur-md">
                  <img
                    src={prod.product.thumbnails[0]}
                    alt={prod.product.title}
                    className='aspect-square w-36 my-2 ml-2 rounded-lg object-cover'
                  />
                  <div className="flex flex-col w-full gap-2 md:gap-4">
                    <NavLink to={`/item/${prod.product._id}`} className='line-clamp-2 text-textDark dark:text-textLight no-underline lg:text-lg text-normal font-semibold'>
                      {prod.product.title}
                    </NavLink>

                    <div className='p-0 m-0'>
                      <p className='flex gap-x-1 text-sm p-0 m-0 text-textDark dark:text-textLight'>{prod.product.description[0].label}: {prod.product.description[0].value}</p>
                    </div>

                    <div className='flex flex-col md:flex-row items-start pr-2 justify-between'>

                      <p className='text-textDark dark:text-textLight font-semibold text-nowrap text-center m-0 p-0'>
                        Cant: {prod.quantity}
                      </p>

                      <p className='text-textDark dark:text-textLight font-semibold text-nowrap text-center m-0 p-0'>
                        Precio unitario: ${prod.product.price.toFixed(2)}
                      </p>

                      <p className='text-textDark dark:text-textLight font-semibold text-nowrap text-center m-0 p-0'>
                        Subtotal: ${(prod.product.price * prod.quantity).toFixed(2)}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            <CheckOutForm control={control} handleSubmit={handleSubmit} comprar={comprar} />

            <div className='pb-16'>
              <h2 className='text-textDark dark:text-textLight'>Total: ${calcularTotal()}</h2>
              <button
                type='submit'
                form="checkout-form"
                className='px-6 py-2 bg-principal border border-principal rounded-lg hover:bg-gray-700'
              >
                Comprar
              </button>
            </div>
          </div>

        </>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default CheckOut;
