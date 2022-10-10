import React from "react";
import Navigation from'./Navigation';
import classes from './NavBar.module.css';


export default function NavBar(props) {
    return (
        <div className={classes.NavBar}>
        <img src={props.img} alt='error loading' className='navbar--logo' />
        <Navigation />
        </div>
    )
}



