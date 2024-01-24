import { useEffect, useState } from 'react';
import ItemCard from './ItemCard';
import Cart from './Cart'

import { useParams, useNavigate } from 'react-router-dom';
const CartHome = () => {
    const [productData, setProductData] = useState([]);
    const { serviceUrl } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/get_needs');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                console.log(data);
                setProductData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const lowercasedServiceUrl = serviceUrl?.toLowerCase();
    const items = productData.filter(
        (item) => item.needs_type.toLowerCase() === lowercasedServiceUrl
    );

    if (!items) {
        navigate('/404');
        return null;
    }

    return (
        <>
            <body style={{ background: 'white', color: 'black' }}>
                <h1 className="text-center " >Donation Items</h1>
                <section className="py-4 container" >
                    <div className="row justify-content-center">
                        {items.map((item) => (
                            <ItemCard item={item}
                                img={item.image}
                                title={item.name_of_proudct}
                                desc={item.overview}
                                total={item.total_count}
                                price={item.price_per_item}
                                wanted={(item.total_count - item.available_count )}
                                key={item.id} />))}


                    </div>
                    <Cart
                    />
                </section>
            </body>
        </>
    );

};

export default CartHome;