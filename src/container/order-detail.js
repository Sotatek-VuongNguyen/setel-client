import { connect } from "react-redux";
import { setOrder, setToastFail, setToastSuccess } from "../redux";
import { OrderDetail } from "../components/order-details/order-detail";
const mapStateToProps = (state) => ({
    order: state.order,
    toastSuccess: state.toastSuccess,
    toastFail: state.toastFail,
    toastMessage: state.toastMessage
});

const mapActiontoProps = {
    setOrder,
    setToastFail,
    setToastSuccess,
};

export default connect(mapStateToProps, mapActiontoProps)(OrderDetail);