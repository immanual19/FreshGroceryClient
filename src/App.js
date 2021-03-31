import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Shop from './components/Shop/Shop';
import SignIn from './components/SignIn/SignIn';
import NotFound from './components/NotFound/NotFound';
import SignUp from './components/SignUp/SignUp';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckoutProduct from './components/CheckoutProduct/CheckoutProduct';
import AddProduct from './components/AddProduct/AddProduct';
import OrderHistory from './components/OrderHistory/OrderHistory';
import ModifyProduct from './components/ModifyProduct/ModifyProduct';
import AdminPanel from './components/AdminPanel/AdminPanel';
function App() {
  return (
    <div className="App">
    
    <Router>
    <Header></Header>
    <SearchBar></SearchBar>
        <Switch>
          <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/login">
          <SignIn></SignIn>
          </Route>
          <Route path="/signup">
          <SignUp></SignUp>
          </Route>
          <PrivateRoute path="/checkoutproduct/:pdId">
            <CheckoutProduct></CheckoutProduct>
          </PrivateRoute>
          <PrivateRoute path="/orderhistory">
          <OrderHistory></OrderHistory>
          </PrivateRoute>
          <PrivateRoute path="/admin">
          <AdminPanel></AdminPanel>
          </PrivateRoute>
          <Route path="*">
        <NotFound></NotFound>
      </Route>
        </Switch>
    </Router>
    </div>
  )
}

export default App;
