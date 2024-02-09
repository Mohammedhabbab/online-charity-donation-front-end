import { useState, useEffect } from 'react';
import { useCart } from 'react-use-cart';
import { useUser } from '../Dynamic/UserContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [notification, setNotification] = useState({ show: false, message: '' });
    const { userData, setUserData } = useUser();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
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


    let totalAmount = cartTotal;
    useEffect(() => {

        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                    setUserData(null);
                    setIsLoading(false);
                    
                    return;
                }

                const userResponse = await fetch('http://localhost:8000/api/auth/me', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + authToken,
                    },
                    body: JSON.stringify({}),
                });

                if (!userResponse.ok) {
                    throw new Error(`Failed to fetch user data. Status: ${userResponse.status}`);
                }

                const userData = await userResponse.json();
                setUserData(userData);
            } catch (error) {
                console.error('Error fetching data:', error);

            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        if (!userData || userData.type_of_user !== 'user') {
            // Clear the cart if user data is not available or if the user is not of type 'user'
            emptyCart();
        }
    }, [userData]);

    const handleNotification = (message) => {
        setNotification({ show: true, message });
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 6500);
    };

    const handleRemoveItem = (itemId) => {
        removeItem(itemId);
        handleNotification('Item removed from cart');
    };

    const handleClearCart = () => {
        emptyCart();
        handleNotification('Cart cleared');
    };

    if (!userData || userData.type_of_user !== 'user') {
        return (
            <h1 className="text-center" style={{ marginTop: '6rem' }}>لا يمكن التبرع إلا للمستخدمين</h1>
        );
    }

    if (isEmpty) {
        return <h1 className="text-center" style={{ marginTop: '6rem' }}>السلة فارغة</h1>;
    }




    const handleDonate = async () => {
        try {
            if (!userData) {
                console.log('please sign in')
            } else {

                const response = await fetch(`http://localhost:8000/api/create-payment/${cartTotal}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                });

                console.log('Edit Response:', response);

                if (!response.ok) {
                    throw new Error('Failed to edit record');
                }

                response.json().then(data => {
                    const url = data.Data.url;

                    window.open(url, '_blank');

                    const intervalId = setInterval(() => {
                        fetch(`http://localhost:8000/api/payment-callback/${data.Data.paymentId}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.Data.status === 'A') {
                                    clearInterval(intervalId); 
                                    console.log('Payment approved:', data);
                                    
                                    navigate('/profile')


                                    try {



                                        const cartData = {
                                            orderDetails: {
                                                
                                                iteamsPurchased: items.map(item => ({
                                                 
                                                    itemName: item.name_of_proudct,
                                                    quantity: item.quantity,
                                                    subtotal: (item.quantity * item.price_per_item),
                                                    donater_id: userData?.id,
                                                    charity_id: item.charity_id,
                                                    id: item.id,

                                                })),
                                                
                                                totalAmount
                                                
                                            }
};

                                      
                                       
                                        



                                        const insert = fetch(`http://localhost:8000/api/purchase`, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify(cartData)
                                        });
                                        console.log('Add Record Response:', insert);
                                        if (!insert.ok) {
                                            throw new Error('Failed to edit record');
                                        }


                                    } catch (error) {
                                        console.error('Error editing record:', error);
                                    }





                                }
                            })
                            .catch(error => {
                                console.error('Error occurred while checking payment status:', error);
                                clearInterval(intervalId); // Stop further checks
                            });
                    }, 120000); // Check every second
                }).catch(error => {
                    console.error("Error occurred while parsing JSON:", error);
                });

            }
        } catch (error) {
            console.error('Error editing record:', error);
        }
    };




    return (
        <section className="py-4 container" style={{ marginTop: '6rem' }}>
            <div className="row justify-content-center">
                <div className="col-12">
                    <h5>Cart ({totalUniqueItems}) كل العناصر: ({totalItems})</h5>
                    <table className="table table-light table-hover m-0">
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item.image} style={{ height: '6rem' }} /></td>
                                    <td>{item.name_of_proudct}</td>
                                    <td>{item.price_per_item}</td>
                                    <td>{item.total_count - item.available_count}</td>
                                    <td>الكمية ({item.quantity})</td>
                                    <td>
                                        <button className="btn btn-info ms-2"
                                            onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                                        >-</button>
                                        <button className="btn btn-info ms-2"
                                            onClick={() => {
                                                if (item.total_count - item.available_count > item.quantity) {
                                                    updateItemQuantity(item.id, item.quantity + 1);
                                                } else {
                                                    handleNotification(`شكرا,لكن تم الوصول إلى الكمية المطلوبة ${item.name_of_proudct}`);
                                                }
                                            }}
                                        >+</button>
                                        <button className="btn btn-danger ms-2"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >إزالة العنصر</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-auto ms-auto">
                    <h2>السعر الكلي: $ {cartTotal}</h2>
                </div>
                <div className="col-auto">
                    <button className="btn btn-danger m-2"
                        onClick={handleClearCart}
                    >إفراغ السلة</button>
                    <button onClick={handleDonate} className="btn btn-primary m-2">التبرع</button>
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
