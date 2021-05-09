import React from 'react';
import default_image from '../../assets/default_image.png';

const ImageHelper = ({product}) => {
    const imageUrl = product ? product.image : default_image
    return (
        <div className="rounded border border-success p-2 d-block d-flex justify-content-center">
            <img 
                src={imageUrl} 
                alt="some image"  
                style={{
                    height: "250px",
                    maxWidth: "100%",
                }}    
                className="mb-3 rounded img-fluid mx-auto"
            />
        </div>
    );
};

export default ImageHelper;