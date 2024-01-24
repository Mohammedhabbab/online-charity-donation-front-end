import { Button } from 'bootstrap';
import { react, useState } from 'react';
import { useCart  } from 'react-use-cart';

const Cart = () => {
    const [notification, setNotification] = useState({ show: false, message: '' });
  
    const handleNotification = (message) => {
        setNotification({ show: true, message });

        // Hide the notification after a certain time (e.g., 3 seconds)
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 6500);
    };
    const {
        isEmpty,
        totalUniqueItems,
        items,
        totalItems,
        cartTotal,
        updateItemQuantity,
        removeItem,
        emptyCart,
    } = useCart();
    if (isEmpty) return <h1 className="text-center " style={{ marginTop: '6rem' }}>Your Cart is Empty</h1>
    return(
        <section className="py-4 container" style={{ marginTop: '6rem' }} >
            <div className ="row justify-content-center">
            <div className ="col-12">
                <h5>Cart ({totalUniqueItems}) Total items : ({totalItems})</h5>
                <table className="tabel table-light table-hover m-0">
                    <tbody>
                    {items.map((item ,index)=>{
                        return(
                        <tr key ={index}>
                            <td>
                                <img src ={item.image} style={{height: '6rem'}}/>
                            </td>
                            <td>{item.name_of_proudct}</td>
                                <td>{item.price_per_item}</td>
                                <td>{(item.total_count - item.available_count)}</td>
                                <td>Quantity ({item.quantity})p</td>
                            <td>
                                <button 
                                className="btn btn-info ms-2"
                                        onClick={() => updateItemQuantity(item.id ,item.quantity - 1 )}
                                >-</button>
                                    <button
                                        className="btn btn-info ms-2"
                                        onClick={() => {if ((item.total_count - item.available_count) > item.quantity){
                                            
                                            updateItemQuantity(item.id, item.quantity + 1);
                                        } else {
                                            handleNotification(`Thanks but no need for more ${item.name_of_proudct}`);
                                        }
                                        }}
                                >+</button>
                                <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => {
                                            removeItem(item.id); 
                                                handleNotification(`Item removed: ${item.name_of_proudct}`);
                                            
                                        }}
                                >Remove Item</button>


                            </td>
                        </tr>
                        )
                    })}

                    </tbody>
                </table>
            </div>
                    <div className="col-auto ms-auto">
                        <h2>Total Price: $ {cartTotal}</h2>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-danger m-2" 
                        onClick ={()=> emptyCart()}
                        >Clear Cart</button>
                        <button className="btn btn-primary m-2">Buy Now</button>
                    </div>
            </div>
            {notification.show && (
                <div
                    className="notification"
                    style={{
                        position: 'fixed',
                        top: '10px',
                        right: '10px',
                        padding: '10px',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        borderRadius: '5px',
                        zIndex: 9999,
                    }}
                >
                    {notification.message}
                </div>
            )}
    </section>

    );



};

export default Cart;