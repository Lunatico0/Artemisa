import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { ApiContext } from '../../context/apiContext.jsx';

const Ticket = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(location.state?.ticket || null);
  const { fetchTicketById } = useContext(ApiContext);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    const loadTicket = async () => {
      const fetchedTicket = await fetchTicketById(ticketId);
      if (!fetchedTicket) {
        navigate('/');
        return;
      }
      setTicket(fetchedTicket);
    };

    loadTicket();
  }, [ticketId, navigate]);

  if (!ticket) {
    return <p>Cargando ticket...</p>;
  }

  return (
    <div className='lg:pt-40 pt-20 px-2 pb-20'>
      <div className="max-w-xl mx-auto bg-white p-3 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-3">Detalle de tu compra</h2>

        <div className="flex flex-col border-b pb-3 mb-3">
          <p className='mb-1'><strong>ID del ticket:</strong> {ticket._id}</p>
          <p className='mb-1'><strong>Código de la compra:</strong> {ticket.code}</p>
        </div>

        <div className="border-b pb-3 mb-3">
          <h3 className="font-semibold">Datos del comprador:</h3>
          <p className='mb-1'><strong>Nombre:</strong> {ticket.purchaser.nombre} {ticket.purchaser.apellido}</p>
          <p className='mb-1'><strong>Email:</strong> {ticket.purchaser.email}</p>
          <p className='mb-1'><strong>Teléfono:</strong> {ticket.purchaser.telefono}</p>
          <p className='mb-1'><strong>Dirección:</strong> {ticket.purchaser.direccion}, {ticket.purchaser.localidad}</p>
          <p><strong>Fecha:</strong> {new Date(ticket.purchase_datetime).toLocaleString('en-GB', { hour12: false })}</p>
        </div>

        <div className="border-b pb-3 mb-3">
          <h3 className="font-semibold mb-2">Detalle de la compra:</h3>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Cantidad</th>
                  <th className="border border-gray-300 px-4 py-2 text-center">Producto</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {ticket.products.map((prod, index) => (
                  <tr key={index} className="border border-gray-200 odd:bg-white even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{prod.quantity}</td>
                    <td className="border border-gray-300 px-4 py-2">{prod.productId.title}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      ${(prod.productId.price * prod.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="text-xl font-bold text-green-600">Total: ${ticket.amount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Ticket;
