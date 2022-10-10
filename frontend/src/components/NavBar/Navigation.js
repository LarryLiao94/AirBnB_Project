import NavLinks from "./NavLinks";
import {GiHamburgerMenu} from 'react-icons/gi';
import classes from './NavBar.module.css';
import { useState } from "react";
import {AiOutlineCloseCircle} from 'react-icons/ai';

const Navigation = () => {

    const [open, setOpen] = useState(false);

    const hamburgerButton = <GiHamburgerMenu className={classes.Hamburger} size='40px' color='grey' onClick={() => setOpen(!open)} />
    const closeButton = <AiOutlineCloseCircle className={classes.Hamburger} size='40px' color='grey' onClick={() => setOpen(!open)} />
  
    const closeNavigationMenu = () => setOpen(false);


    return (
    <nav className={classes.Navigation}>
      {open ? closeButton : hamburgerButton}
      {open && <NavLinks closeNavigationMenu={closeNavigationMenu} />}
    </nav>
  );
};

export default Navigation;
