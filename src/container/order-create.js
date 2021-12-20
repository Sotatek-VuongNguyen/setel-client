import { connect } from "react-redux";
import { setToastFail, setToastSuccess } from "../redux";
import { OrderCreate } from "../components/order-create/order-create";

const mapStateToProps = (state) => ({
    tab: state.tab,
    toastSuccess: state.toastSuccess,
    toastFail: state.toastFail,
    toastMessage: state.toastMessage
});

const mapActiontoProps = {
    setToastFail,
    setToastSuccess
};

export default connect(mapStateToProps, mapActiontoProps)(OrderCreate);