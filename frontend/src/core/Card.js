import React, { useState } from "react";
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from "./helper/CartHelper";
import {isAuthenticated} from '../auth/helper';
// TODO: Deal with it later


const Card = ({
        product, 
        addToCart=true, 
        removeFromCart=false,
        reload = undefined,
        setReload = f => f,
        cart_item_id=undefined
    }) => {

    const cardTitle = product? product.name : "New T-shirt edition";
    const cardDescription = product ? product.description: "A T-shirt that suits you";
    const cardPrice = product ? product.price : "Default"

    const [redirect, setRedirect] = useState(false);

    const AddToCart = () => {
        if (isAuthenticated()) {
            addItemToCart(product, () => {setRedirect(true)});
        } else {
            console.log("Login first!")
        }
    }

    const getARedirect = (redirect) => {
        if (redirect) {
            return <Redirect to="/user/cart" />
        }
    }

    const showAddToCartButton = (addToCart) => {
        return (
            addToCart && (
                <button
                    onClick={AddToCart}
                    className="btn btn-block btn-outline-success mt-2 mb-2"
                >
                    Add to Cart
                </button>
            )
        )
    }

    const showRemoveFromCartButton = (removeFromCart) => {
        return (
            removeFromCart && (
                <button
                    onClick={()=>{
                        // TODO: handle this too
                        removeItemFromCart(product.id,cart_item_id, () => {setReload(!reload)});
                        
                    }}
                    className="btn btn-block btn-outline-danger mt-2 mb-2"
                >
                    Remove from cart
                </button>
            )
        )
    }

    
    return (
        <div className="card text-white bg-dark border border-info">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
                <ImageHelper product={product} />
                <p className="lead bg-success font-weight-normal text-wrap">
                    {cardDescription}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">${cardPrice}</p>
                <div className="row">
                    <div className="col-12">
                        {showAddToCartButton(addToCart)}
                    </div>
                    <div className="col-12">
                        {showRemoveFromCartButton(removeFromCart)}
                    </div>
                </div>
            </div>
            {getARedirect(redirect)}
        </div>
    )
}


export default Card;