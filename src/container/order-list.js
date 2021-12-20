import { connect } from "react-redux";
import OrderList from "../components/order-list/order-list";
import { fetchData, changePageSize, changePage, totalOrder } from "../redux";

const mapStateToProps = (state) => ({
    orders: state.orders,
    page: state.page,
    pageSize: state.pageSize,
    total: state.total,
});

const mapActiontoProps = ({
    fetchData,
    changePageSize,
    changePage,
    totalOrder
});

export default connect(mapStateToProps, mapActiontoProps)(OrderList);