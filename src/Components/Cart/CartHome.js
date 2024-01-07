import react from 'react';
import ItemCard from './ItemCard';
import data from './Products';
const CartHome = () => {
    return(
        <>
        <h1 className ="text-center ">Donation Items</h1>
        <section className="py-4 container">
            <div className="row justify-content-center">
                {data.ProductData.map((item ,index)=>{
                    return(
                        <ItemCard img ={item.img}
                         title={item.title} 
                         desc={item.desc} 
                         price={item.price}
                         item ={item}
                         key = {index} /> )
                })}
   
            </div>            
            </section>
        </>
    );

};

export default CartHome;