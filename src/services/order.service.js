import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const getOrder = (page = 0, pageSize = 5, q = null) => {
    const offset = page * pageSize;
    let params = `limit=${pageSize}&offset=${offset}`;
    params = q ? params + `&q=${q}` : params;

    return axios.get(`${BASE_URL}/api/orders?${params}`)
}

const createOrder = (request) => {
    const model = {
        customer: {
            fullname: request.fullname,
            email: request.email,
            address: request.address,
            phone: request.address
        },
        products: [
            {
                name: request.p_name,
                quantity: request.p_quantity,
                price: request.p_price
            }
        ]
    };

    return axios.post(`${BASE_URL}/api/orders`, model);
}

const updateOrder = (request) => {
    return axios.put(`${BASE_URL}/api/orders`, request);
}

export  const OrderService = { getOrder, createOrder, updateOrder }; 