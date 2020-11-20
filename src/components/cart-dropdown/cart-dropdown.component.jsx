import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButtom from '../custom-button/custom-button.component';
import CarItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className='cart-dropdown'>
        <div className='cart-items' >
            {
                cartItems.length ?
                cartItems.map(cartItem => (
                    <CarItem key={ cartItem.id } item={ cartItem } />
                ))
                :
                <span className='empty-message'>Your cart is empty</span>
            }
        </div>
        <CustomButtom onClick={() => {
            history.push('./checkout');
            dispatch( toggleCartHidden() );
        }
        }>GO TO CHECKOUT</CustomButtom>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems // se utiliza un memoize selector para que no se tenga que ejecutar la funcion de nuevo aunque los valores no cambien
});

export default withRouter(connect(mapStateToProps)(CartDropdown)); // si no le pasas dispatchToProps le pasa el dispatch automaticamente como prop