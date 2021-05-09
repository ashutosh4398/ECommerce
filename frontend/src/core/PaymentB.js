import React,{useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {cartEmpty} from './helper/CartHelper';
import {getmeToken, processPayment} from './helper/PaymentHelper'
import {createOrder} from './helper/OrderHelper';
import { isAuthenticated, Signout } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react';

const PaymentB = ({
    products=[],
    reload=undefined,
    setReload=f=>f,
    total_amount=null,
    orderID=null
}) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    useEffect(() => {
        getToken();
    },[]);

    const getToken = () => {
        getmeToken()
        .then(resp => {
            if (resp.status === 200 && resp.data?.success) {
                const clientToken = resp.data?.clientToken
                setInfo({...info,clientToken})
            } else {
                Signout(() => {
                    <Redirect to="/" />
                })
            }
            
        })
        .catch(err => {console.log(err)})
    }

    const showbtnDropin = () => {
        return (
            <div className="">
                {
                    info.clientToken !== null && products.length > 0 ?
                    (
                        <div className="">
                            <h3>Your bill is: ${total_amount}</h3>
                            <DropIn 
                                options={{
                                    authorization: info.clientToken,
                                }}

                                onInstance = {instance => {
                                    // info.instance = instance;
                                    setInfo({instance: instance})
                                }}
                            />
                                <button 
                                onClick={onPurchase}
                                className="btn btn-block btn-success">Purchase</button>
                            
                        </div>
                    ):
                    (
                        ""
                    )
                }
            </div>
        )
    }

    const onPurchase = () => {
        setInfo({...info, loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod()
                        .then(data => {
                            nonce = data.nonce;
                            const paymentData = {
                                payment_method_nonce :nonce,
                                amount: total_amount,
                            };
                            processPayment(paymentData)
                                .then(response => {
                                    if (response.error) {
                                        if (response.code === 1) {
                                            console.error("PAYMENT FAILED");
                                            Signout(() => <Redirect to="/login" />)
                                        }
                                    } else {
                                        setInfo({ 
                                            loading: false, 
                                            success: response.data?.success
                                        });
                                        const orderData = {
                                            transaction_id: response.data?.transaction?.id
                                        }
                                        createOrder(orderData,orderID)
                                            .then(resp => {
                                                if (resp.error && resp.code === 1) {
                                                    Signout(() => {
                                                        return (
                                                            <Redirect to="/login" />
                                                        )
                                                    })
                                                } else {
                                                    if (response.success) {
                                                    }
                                                    setReload(!reload)
                                                }

                                            })
                                            .catch(err => console.log(err))
                                        ;
                                    }
                                })
                                .catch(err => {
                                    setInfo({loading: false, success: false})
                                    console.log("failed")
                                })
                                
                        })
                        .catch(err => console.log(err))
    }

    return (
        <div>
            {showbtnDropin()}
        </div>
    );
};

export default PaymentB;