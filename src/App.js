import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const { setCurrentUser }  = this.props;
    
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => { // signin (exitoso) - signup - signout (estos son los que activan el onAuthStateChanged// Esta parte es para obtener los datos de la cuenta y poner el current user
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // obtiene a la referencia al usuario (si no existia, fue creada)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });        
      }

      setCurrentUser(userAuth);
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={ HomePage } />
          <Route path='/shop' component={ ShopPage } />
          <Route exact path='/checkout' component={ CheckoutPage } />
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } />
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = createStructuredSelector({ 
  currentUser: selectCurrentUser
})

// const mapStateToProps = ({ user }) => ({ // user reducer destructurado, con esto podemos utilizar el currentUser (ya lo puedes utilizar como prop)
//   currentUser: user.currentUser
// })

const mapDispatchToProps = dispatch => ({  // (ya lo puedes utilizar como prop) entonces cuando lo utilices como prop se ejecutara esta funcion que recibira al user y luego con el dispatch se pasara a la accion setCurrentUser y luego se enviara el nuevo objeto a la store
  setCurrentUser: user => dispatch(setCurrentUser(user)) //dispatch permite a redux saber que el objeto que este pasando es un action object que se pasara a cada reducer (aqui cambiamos el currentUser)
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
