import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from '@mui/material';
import { Paper } from '@mui/material';
import moment from 'moment';
import { OrderService } from '../../services/order.service';
import { BrowserRouter as Router, Link, NavLink, useHistory } from "react-router-dom";



export default function OrderList({ orders, page, pageSize, fetchData, totalOrder, changePage, changePageSize, total }) {

    const getList = (page = 0, rowsPerPage = 0) => {
        OrderService.getOrder(page, rowsPerPage)
            .then(res => {
                console.log(res)
                if (!res || res.status !== 200) return;
                fetchData(res.data.data);
                totalOrder(res.data.total);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getList();
    }, []);

    //getList();
    const handleChangePage = ($event, newPage) => {
        changePage(newPage);
        getList(page, pageSize);
    }



    const handleChangeRowsPerPage = ($event) => {
        changePageSize($event.target.value);
        getList(page, pageSize);
    }

    const redirectPath = (path) => {
        window.location.pathname = path;
    }
    return (
        <>
            <Router>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <TableContainer component={Paper} style={{ display: 'contents' }}>
                        <Table sx={{ maxWidth: 850 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Number</TableCell>
                                    <TableCell align="right">Customer</TableCell>
                                    <TableCell align="right">Phone</TableCell>
                                    <TableCell align="right">CreateAt</TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((row, index) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {row.customer ? row.customer.fullname : ''}
                                        </TableCell>
                                        <TableCell align="right">{row.customer ? row.customer.phone : ''}</TableCell>
                                        <TableCell align="right">{moment(row.created_time).format('DD/MM/YYYY')}</TableCell>
                                        <TableCell align="right">
                                            <Button onClick={() => redirectPath(`order/${row._id}`)}>Detail</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center', }}>
                    <div style={{ width: '850px' }}>
                        <TablePagination
                            style={{ float: 'right' }}
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={total}
                            rowsPerPage={pageSize}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>

                </div>
            </Router>


        </>
    )

};
