//npm add node-sass
//yarn add react-router-dom
//yarn add redux redux-logger react-redux
//yarn add redux-persist
// yarn add react-stripe-checkout
// for payment code 4242424242424242 date future date cvc= 123

import React from 'react';
import { Switch, Route,Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

import {createStructuredSelectors} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';

import SignInAndSignUp from '../src/pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from'../src/pages/checkout/checkout.component';

import Header from './components/header/header.componenet';

import {auth,createUserProfileDocument} from '../src/firebase/firebase.utils';


import {setCurrentUser} from '../src/redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors';


class App extends React.Component {

 

  unsubscribeFromAuth = null;

  componentDidMount() {
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
         
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data()
        })

       
        });

      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route exact path='/signin' render={()=>this.props.currentUser ? (<Redirect to='/'/>):(<SignInAndSignUp/>)} />
          
        </Switch>
      </div>
    );


  }
 
}
const mapStateToprops = createStructuredSelectors=>({
  currentUser:selectCurrentUser
});
const mapDispatchToProps = dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user))

});

export default connect(mapStateToprops,mapDispatchToProps)(App);