import {motion} from 'framer-motion';

const NavLinks = (props) => {
    const animateFrom = {opacity: 0, y: -40}
    const animateTo = {opacity: 1, y: 0}

    return (
        <ul>
            <motion.li initial={animateFrom} animate={animateTo} transition={{delay: 0.05}} onClick={() => props.closeNavigationMenu()}>
                <a href='/api/login'>Login</a>
            </motion.li>
            <motion.li initial={animateFrom} animate={animateTo} transition={{delay: 0.10}} onClick={() => props.closeNavigationMenu()}>
                <a href='/api/signup'>Sign Up</a>
            </motion.li>
            {/* <li>
                <a href='/api/spots'>Host your spot</a>
            </li> */}
        </ul>
    )
}

export default NavLinks;