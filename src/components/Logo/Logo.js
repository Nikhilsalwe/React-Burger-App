import React from 'react';
import classes from './Logo.css'
import burgerLogo from '../../assests/images/burger-logo.png'

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={burgerLogo} alt="myBurger"/>
    </div>
);

export default logo;


//in toolbar.js