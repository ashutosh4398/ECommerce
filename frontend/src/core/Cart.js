import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import PaymentB from './PaymentB';


const Cart = () => {

    const [products, setProducts] = useState([]);
    const [total_amount, setTotal_amount] = useState(null);
    const [reload, setReload] = useState(false);
    const [orderID, setOrderId] = useState(null);

    useEffect(()=>{
        loadCart()
        .then(resp => {
            // console.log(resp.data[0]?.products)
            setProducts(resp.data[0]?.products || []);
            setTotal_amount(resp.data[0]?.total_amount)
            setOrderId(resp.data[0]?.id);
        })
        .catch(err => {console.log(err)});
    },[reload]);

    const loadAllProducts = () => {
        return (
            <div className="">
                {
                    products.map((product,index) => (
                        <Card 
                            key={index}
                            product={product.product_info}
                            removeFromCart={true}
                            addToCart={false}
                            reload={reload}
                            setReload={setReload}
                            cart_item_id = {product.cart_item_id}
                        />
                    ))
                }
                {
                    products.length === 0 && (
                        <h2>No products</h2>
                    )
                }
            </div>
        )
    }


    const loadCheckOut = () => {
        return (
            <div className="">
                <h1>Checkout</h1>
            </div>
        )
    }

    return (
        <Base
            title="Cart Page"
            description="View your items"
        >
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProducts()}
                </div>
                <div className="col-6">
                    {
                        products.length > 0 ?
                        (
                            <PaymentB 
                                setReload={setReload}
                                total_amount={total_amount}
                                products={products}
                                orderID={orderID}
                            />
                        )
                        :
                        (
                            <h3>Please add something to cart</h3>
                        )
                    }
                    <PaymentB />
                </div>
            </div>
        </Base>
    );
};

export default withRouter(Cart);
