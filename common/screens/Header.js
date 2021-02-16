// -----------------------------------------------------------------
// This is the application-specific Header placeholder. It uses the Navbar 
// widget and defines the application's menu structure declaratively which it 
// passes to the generic Navbar
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import Navbar from '../components/widgets/Navbar'

const navDef={
    brand: {
        href: '#',
        image: 'https://genesisui.com/demo/clever/bootstrap4-react/img/logo.5a69406456e16136660db1c6119ab2bb.png'
    },
    navMenu: [
        {title: 'Home', href: '#', active: true}, 
        {title: 'Product', href: '/dashboard2'},
        {title: 'Shop', href: '/dashboard1'},
        {title: 'About', href: '/matches'},
        {title: 'Drop Menu', href: '#', 
            submenu: [
                {title: 'Action', href: '#'},
                {title: 'Another Action', href: '#'},
                {title: 'Something else', href: '#'},
                {divider: true},
                {title: 'Separated link', href: '#'}
            ]
        },
        {title: 'Events', href: '#'},
    ],
    iconMenu: [
        {icon: 'fa-instagram', href: '#'}, 
        {icon: 'fa-twitter', href: '#'}
    ]
};

const Header = () => (
    <Navbar def={navDef}/>
)

Header.propTypes = {
}

export default Header
