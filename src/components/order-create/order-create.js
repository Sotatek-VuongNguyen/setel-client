import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { OrderService } from '../../services/order.service';

export function OrderCreate({ toastSuccess, toastFail, toastMessage, setToastSuccess, setToastFail }) {
    const request = {};

    const onSubmit = (event) => {
        if (!request.fullname) return setToastFail({ message: '', value: true });

        OrderService.createOrder(request).then(res => {
            if (!res || !res.data || !res.data.status !== 200) {
                setToastFail({ messsage: res && res.data ? res.data.message : 'unknow error', value: true});
                return;
            }

            setToastSuccess({message: '', value: true});
        }).catch( err => {
            setToastFail({ messsage: err, value: true});
        });

        event.preventDefault();


    }

    const changeValue = (event) => {
        request[event.target.id] = event.target.value;
    }

    const handleClose = () => {
        setToastSuccess({ message: '', value: false })
    }

    const handleFailClose = () => {
        setToastFail({ message: '', value: false })
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '850px' }}>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="fullname" style={{ float: 'left'}}>Fullname</label>
                            <input type="text" className="form-control" id="fullname"
                                placeholder="Fullname" onChange={changeValue} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address" style={{ float: 'left'}}>Address</label>
                            <input type="text" className="form-control" id="address"
                                placeholder="Address" onChange={changeValue} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone" style={{ float: 'left'}}>Phone</label>
                            <input type="text" className="form-control" id="phone"
                                placeholder="Phone" onChange={changeValue} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" style={{ float: 'left'}}>Email</label>
                            <input type="email" className="form-control" id="email"
                                placeholder="Email" onChange={changeValue} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="p_name" style={{ float: 'left'}}>Product name</label>
                            <input type="text" className="form-control" id="p_name"
                                placeholder="Product name" onChange={changeValue} required />
                        </div>
                        <div className="form-group" >
                            <label htmlFor="p_quantity" style={{ float: 'left'}}>Quantity</label>
                            <input type="number" className="form-control" id="p_quantity"
                                placeholder="Quantity" onChange={changeValue} required />
                        </div>
                        <button  style={{ float: 'left'}}type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>


            <Snackbar open={toastSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Create order success
                </Alert>
            </Snackbar>
            <Snackbar open={toastFail} autoHideDuration={6000} onClose={handleFailClose}>
                <Alert onClose={handleFailClose} severity="error">{toastMessage}</Alert>
            </Snackbar>
        </>
    );

};