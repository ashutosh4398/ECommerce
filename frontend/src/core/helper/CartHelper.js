import { isAuthenticated } from "../../auth/helper";
import { axiosInstance } from "../../axiosInstance";

export const addItemToCart = (item, next) => {
    let cart = []
    if (typeof window !== undefined) {
        // api calls for saving items on server. As final amount will be calculated from server
        axiosInstance.post("order/",{products: [
            {
                product_info: {id: item.id},
                quantity: 1,
                amount: item.amount
            },
        ]},{
            headers: {
                Authorization: `Bearer ${isAuthenticated()}`
            }
        })
            .then(resp => {
                if (resp.status === 200) {
                    next();
                }
            })
            .catch(err => console.log(err));
    }
}

export const loadCart = () => {
    if (typeof window !== undefined) {
        return axiosInstance.get("order/",{
            headers: {
                Authorization: `Bearer ${isAuthenticated()}`
            }
        })
    }
}


export const removeItemFromCart = (productId,cart_item_id,next) => {
    let cart = []
    if (typeof window !== undefined) {
        axiosInstance.delete(`order/cart/update/${cart_item_id}/`,{
            headers: {
                Authorization: `Bearer ${isAuthenticated()}`
            }
        })
        .then(resp => {
            // TODO: items are deleted successfully. Now we have to remount the component on successful deletion
            // checking whether we have got a successful delete and then only remounting the component
            if (resp.status === 204) {
                next();
            };            
        })
        .catch(err => {
            console.log(err);
        })
    }
    return cart;
}

export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify([]));
        next();
    }
}