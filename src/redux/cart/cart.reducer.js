import { clearItemFromCart } from './cart.actions';
import CartActionTypes from './cart.types';
import {addItemToCart,removeItemFromCart} from './cart.utils';
const INITIAL_SATATE ={
    hidden: true,
    cartItems:[]
};

const cartReducer = (state = INITIAL_SATATE,action)=>{
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden: !state.hidden
            }

        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems:addItemToCart(state.cartItems,action.payload)
            }   
        case CartActionTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems:removeItemFromCart(state.cartItems,action.payload)
            } 
            default:
                 return state;
        
                 case CartActionTypes.CLEAR_ITEM_FROM_CART:
                    return {
                      ...state,
                      cartItems: state.cartItems.filter(
                        cartItem => cartItem.id !== action.payload.id
                      )
                    };
     }
       
}

export default cartReducer;