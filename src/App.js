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
          <PrivateRoute path="/checkoutproduct">
            <CheckoutProduct></CheckoutProduct>
          </PrivateRoute>
          <PrivateRoute path="/admin">
            <AddProduct></AddProduct>
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
