import React,{ useState, useEffect } from 'react';
import Base from './Base';
import {getProducts} from './helper/coreApiCalls';
import Card from './Card';
import { withRouter } from 'react-router-dom';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts()
            .then(resp => {
                setProducts(resp.data || [])
            })
            .catch(error => {
                setError(error.response)
            })
    }

    useEffect(() => {
        loadAllProducts();
    },[]);

    return (
        <Base title="Home Page" description="Welcome to TShirt Store">
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-4 mb-4">
                        <Card product = {product}/>
                    </div>
                ))}
            </div>
        </Base>
    );
};

export default withRouter(Home);
