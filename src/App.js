import './App.css';
import Layout from './components/layout/layout';
// import OrderList from './components/order-list/order-list';
import OrderList from './container/order-list';
import { Box, Tab } from '@mui/material';
import { TabList, TabPanel, TabContext } from '@mui/lab';
import OrderCreate from './container/order-create';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import OrderDetail from './container/order-detail';

function App({ setTab, tab }) {
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Router>
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/" exact>
              <TabContext value={tab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Order list" value="0" />
                    <Tab label="Order create" value="1" />
                  </TabList>
                </Box>
                <TabPanel value="0">
                  <OrderList></OrderList>
                </TabPanel>
                <TabPanel value="1">
                  <OrderCreate></OrderCreate>
                </TabPanel>
              </TabContext>
            </Route>
            <Route path="/order/:id">
                <OrderDetail></OrderDetail>
            </Route>
            <Route>404 Not Found!</Route>
          </Switch>


        </Layout>

      </div>
    </Router>

  );
}

export default App;
