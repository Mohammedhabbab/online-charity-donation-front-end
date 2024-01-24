import React, { useState } from 'react';
import { useCart } from 'react-use-cart';


const ItemCard = (props) => {
    const { addItem, inCart } = useCart();
   
    const [notification, setNotification] = useState({ show: false, message: '' });

    const handleNotification = (message) => {
        setNotification({ show: true, message });
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 6500);
    };

    const itemWithPrice = {
        ...props.item,
        price: props.price
    };

    const handleAddToCart = () => {
        const currentQuantityInCart = inCart(props.item.id) ? inCart(props.item.id).quantity : 0;

        if (props.wanted > currentQuantityInCart) {
            addItem(itemWithPrice);
      
        } else {
            handleNotification(`Thanks but no need for more ${props.title}`);
        }
    };

    return (
        <div className="col-11 col-md-6 col-lg-3 mx-0 mb-4">
            <div className="card p-0 overflow-hidden h-100 shadow" alt="im">
                <img src={props.img} className="card-img-top img-fluid" alt={props.title} />
                <div className="card-body text-center">
                    <h5 className="card-title">{props.title}</h5>
                    <h5 className="card-title">${props.price}</h5>
                    <p className="card-text">الكمية المطلوبة:{props.wanted}</p>
                    <p className="card-text">{props.desc}</p>
                    <button className="btn btn-success" onClick={ 
                    handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
            </div>
            </div>
    );
};

export default ItemCard;
