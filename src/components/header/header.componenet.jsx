import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CartIcon from '../../components/cart-icon/cart-icon.componenet';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {ReactComponent as Logo} from '../../assests/crown.svg';
import {auth} from '../../firebase/firebase.utils';
import{selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import './header.style.scss';


const Header=({currentUser,hidden})=>(
    <div className="header">

        <Link className='logo-container' to='/'>
            <Logo className='logo' />


        </Link>
        <div class='options'>
            <Link className='option' to='/shop'>Shop</Link>
            <Link className='option' to='/shop'>Contact</Link>
            {
                currentUser?(
                <div className='option' onChange={()=>auth.signOut()}>Sign out</div>
                 ) :(
                <Link className="option" to='/signin'>Sign in</Link>
                 )}
            <CartIcon/>
            
        </div>
        {
            hidden? null : <CartDropdown/>
           

        }
        


    </div>
)
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden

});
export default connect(mapStateToProps)(Header);