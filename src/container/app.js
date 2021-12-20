import { connect } from "react-redux";
import { setTab } from "../redux";
import App from "../App";

const mapStateToProps = (state) => ({
    tab: state.tab
});

const mapActiontoProps = {
    setTab
};

export default connect(mapStateToProps, mapActiontoProps)(App);