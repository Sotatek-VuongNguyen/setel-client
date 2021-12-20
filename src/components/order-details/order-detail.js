import { Button } from "@mui/material";
import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { OrderService } from '../../services/order.service';
import { BrowserRouter as Router, Link, NavLink  } from "react-router-dom";


export function OrderDetail({ order, setOrder, setToastFail, setToastSuccess, toastMessage, toastSuccess, toastFail }) {
    let params = useParams();
    const getOrder = () => {
        OrderService.getOrder(0, 5, params.id)
            .then(res => {
                console.log(res)
                if (!res || res.status !== 200 || !res.data || !res.data.data || !res.data.data.length) return;
                setOrder(res.data.data[0]);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getOrder();
    }, []);

    const updateOrder = (status) => {
        let request = {
            _id: params.id,
            status
        }
        OrderService.updateOrder(request).then(res => {
            if (!res || res.status !== 200) {
                setToastFail({ messsage: res && res.data ? res.data.message : 'unknow error', value: true});
                return;
            }

            setToastSuccess({message: 'success', value: true});
            setOrder({...order, status});
        }).catch( err => {
            setToastFail({ messsage: err, value: true});
        });
    }

    const handleClose = () => {
        setToastSuccess({ message: '', value: false })
    }

    const handleFailClose = () => {
        setToastFail({ message: '', value: false })
    }

    return (
        <>
            <div style={{
                display: 'flex', justifyContent: 'center'
            }}>
                <div style={{
                    width: '850px', textAlign: 'left',
                    padding: '50px',
                    border: '1px solid #d9d5d5f2',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 1px #aea5a5'
                }}>
                    <h2>Order detail</h2>
                    <p><b>ID: </b>{order._id}</p>
                    <p><b>Status: </b>{order.status === 0 ? 'New' : order.status === 1 ? 'Cancelled'
                        : order.status === 2 ? 'Confirmed' : order.status === 3 ? 'Deliveried' : 'Unknow'}</p>
                    <p><b>Customer name: </b>{order.customer ? order.customer.fullname : ''}</p>
                    <p><b>Customer phone: </b>{order.customer ? order.customer.phone : ''}</p>
                    <p><b>Customer address: </b>{order.customer ? order.customer.address : ''}</p>
                    <p><b>Customer email: </b>{order.customer ? order.customer.email : ''}</p>
                    <p><b>Product name: </b>{order.products && order.products.length ? order.products[0].name : ''}</p>
                    <p><b>Quantity: </b>{order.products && order.products.length ? order.products[0].quantity : ''}</p>
                    <p><b>Price: </b>{order.products && order.products.length ? order.products[0].price : ''}</p>
                    <p><b>Amount: </b>{order.amount}</p>
                    <div>
                        <Button style={{marginRight: '10px'}}  variant="contained" color="success" onClick={() => updateOrder(2)} id='confirm'>Confirm</Button>
                        <Button  variant="contained" color="error" onClick={() => updateOrder(1)} id='cancel'>Cancel</Button>
                        <Link to="/">back</Link>
                    </div>
                </div>
            </div>
            <Snackbar open={toastSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {toastMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={toastFail} autoHideDuration={6000} onClose={handleFailClose}>
                <Alert onClose={handleFailClose} severity="error">{toastMessage}</Alert>
            </Snackbar>
        </>
    );
}