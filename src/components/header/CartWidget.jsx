import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { IonIcon } from '@ionic/react';
import { cartOutline } from 'ionicons/icons';

const CartWidget = () => {
  const { viewWidth } = useContext(CartContext);
  const { calcularCantidad, closeMenu } = useContext(CartContext);
  const cantidad = calcularCantidad();
  const mostrarBefore = cantidad > 0;

  return (
    <div
      className={`lg:right-12 max-h-20 h-full flex items-center justify-center ${viewWidth < 1024 ? 'bottom-0 right-0' : 'absolute right-2'}`}
    >
      <Link
        to={"/carrito"}
        className='no-underline flex items-center justify-center text-textDark dark:text-textLight md:text-2xl text-xl'
        onClick={() => closeMenu()}
      >
        {cantidad != 0 ? cantidad : ""}
        <span className={`md:text-[32px] text-2xl pt-2 ${mostrarBefore && 'before:contents before:absolute before:bg-textoLogo before:rounded-full before:h-3 before:w-3 before:top-1/4 before:right-5 lg:before:-right-1'}`}>
          <IonIcon icon={cartOutline} />
        </span>
      </Link>
    </div>
  )
}

export default CartWidget
