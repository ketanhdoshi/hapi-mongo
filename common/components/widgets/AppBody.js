// -----------------------------------------------------------------
// Presentational component for the AppBody
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import styled from 'styled-components';

import { injectGlobal } from 'styled-components';

/* TODO - temporarily hardcoded only for testing */
injectGlobal`
    @font-face {
        font-family: 'Source Sans Pro';
        src: url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic');
    }

    body {
        height: 100%;
    }
`;

// -----------------------------------------------------------------
// SideMenu component
// -----------------------------------------------------------------
const SideMenu = styled.nav.attrs({
    className: 'h-100',
})`
    /* Background colour of the Sidebar */
    background-color: #222d32;

    /* TODO - temporarily hardcoded only for testing */
    font-weight: 400;
    font-size: 14px;

    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
`;

// -----------------------------------------------------------------
// NavLinkMenu component
// -----------------------------------------------------------------
const NavLinkMenu = styled.a.attrs({
    className: 'nav-link',
})`
    color: red;

    /* Put a down-arrow or up-arrow next to sub-menus */
    &.collapsed:after {
        content: "▾";
    }
    &:not(.collapsed):after {
        content: "▴";
    }
`;

// -----------------------------------------------------------------
// MenuItem component
// -----------------------------------------------------------------
const MenuItem = styled.a.attrs({
    className: '',
})`
    /* Text colour of menu item */
    color: #b8c7ce;

    /* This is a vertical strip on the Left border, highlighted during hover */
    /* On hover, highlight the left border strip, and change the text colour */
    border-left: 5px solid transparent;
    &:hover,
    &:focus {
        color: #ffffff;
        background: #1e282c;
        border-left-color: #3c8dbc;
    }

    /* Put a down-arrow or up-arrow next to sub-menus */
    &.collapsed:after {
        content: "▾";
        text-align: right;
    }
    &:not(.collapsed):after {
        content: "▴";
        text-align: right;
    }
`;

// -----------------------------------------------------------------
// MyMenuItem component
// Example of extending an already styled component
// -----------------------------------------------------------------
const MyMenuItem = styled(MenuItem)`
    color: yellow;
`;

// -----------------------------------------------------------------
// SubMenuItem component
// -----------------------------------------------------------------
const SubMenuItem = styled.a.attrs({
    className: '',
})`
    /* Text colour of menu item */
    color: #8aa4af;

    /* Add a border to line it up with other MenuItems since there is no 
        left border strip. We need to set only the left-width here but for 
        some reason that doesn't take effect unless we set the border-style
        and background as well */
    border-left: 5px solid #2c3b41;

    /* On hover, change the text colour */
    &:hover,
    &:focus {
        color: #ffffff;
        background: #2c3b41;
    }
`;

// -----------------------------------------------------------------
// SubMenu component
// -----------------------------------------------------------------
const SubMenu = styled.div.attrs({
    className: '',
})`
    /* Background of sub-menus */
    background: #2c3b41;
`;

// -----------------------------------------------------------------
// MenuTitle component
// -----------------------------------------------------------------
const MenuTitle = styled.span.attrs({
    className: '',
})`

    flex: 1;
`;


// -----------------------------------------------------------------
// DrawerExample component
// -----------------------------------------------------------------
const DrawerExample = () => (
    <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
        <ul className="nav flex-column">
            <li className="nav-item">
                <a className="nav-link" href="#">Overview <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Reports</a>
            </li>
        </ul>
    </nav>
)

// -----------------------------------------------------------------
// TODO
// Spacing
// Transitions
// Multi-level sub-menus
// Make proper components, and for widgets vs app screens
// Fix the up-arrow and down-arrow, so it is only for sub-menus
// Use Reactstrap
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Controls the visibility mode of the Drawer - FULL, NONE, MINI
// -----------------------------------------------------------------
const DrawerControl = ({toggleCB, toggleMode}) => {
    let icon = null;
    if (toggleMode) {
        icon = "fa-mobile";
    }
    else {
        icon = "fa-desktop";
    }
    return (
        <a href=".drawerdesk" data-toggle="collapse" onClick={toggleCB}>
            <i className={"fa fa-lg " + icon}></i>
        </a>
    )
}

const Prog = styled.div`
	/* Adapt the width based on primary prop */
        background: purple;
	transition: all 0.25s ease-in-out;
`;

// -----------------------------------------------------------------
// Drawer component
// Off-canvas sidebar toggle works in two modes: 
// 1) Desktop mode - the sidebar is always visible but shrinks and grows 
// when toggled. This is achieved by expanding or collapsing some 'span' elements
// for the menu text and the sub-menus.
// 2) Mobile mode - the sidebar is not visible by default, but slides in and out
// when toggled. This is achieved by expanding the entire sidebar
// The toggle button is different in the two cases, so is the behaviour and so
// is the mechanism for achieving that behaviour. In both cases, the expanding 
// and collapsing is achieved using the Collapse functionality
// -----------------------------------------------------------------
const Drawer = ({mode}) => {
    let colCss = null;
    if (mode) {
        colCss = "col-3 ";
    }
    else {
        colCss = "col-1 ";
    }
    return (
            <SideMenu className={colCss}>
        <ul className="nav flex-column">
            <li className="nav-item" data-parent="#sidebar">
                <MenuItem className="nav-link d-flex align-items-center py-2 pr-1" href="#">
                    <i className="fa fa-heart"></i>
                    <MenuTitle className="collapse show drawerdesk ml-2">Item 1
                        <span className="badge badge-success float-right mr-1">6</span>
                        <span className="badge badge-info float-right mr-1">12</span>
                    </MenuTitle>
                </MenuItem>
            </li>
            <li className="nav-item" data-parent="#sidebar">
                <MenuItem className="nav-link collapsed d-flex align-items-center py-2 pr-1" href="#submenu2"
                        data-toggle="collapse" data-target="#submenu2">
                    <i className="fa fa-list"></i>
                    <MenuTitle className="collapse show drawerdesk ml-2">Item 2</MenuTitle>
                </MenuItem>
                <SubMenu className="collapse fade" id="submenu2" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li className="nav-item">
                            <SubMenuItem className="nav-link d-flex align-items-center py-1 pr-1" href="#" data-parent="#submenu2">
                                <i className="fa fa-circle-o"></i>
                                <span className="ml-2">Item 1a</span>
                            </SubMenuItem>
                        </li>
                    </ul>
                </SubMenu>
            </li>
        </ul>
            </SideMenu>
    )
}

// -----------------------------------------------------------------
// Experimental Drawer using Bootstrap CSS
// -----------------------------------------------------------------
const DrawerBs = () => (
    // A collapse class would normally mean that this item is collapsed and therefore
    // not visible. However it gets overriden by the d-sm-block class and so it
    // is shown on devices of size sm and larger. On phone sizes smaller than sm, that
    // class doesn't apply and hence the collapse becomes effective. Hence on phones
    // the sidebar is not shown initially. Also, we could have used a d-flex class
    // instead of the d-block class, but that caused the child <ul> element below it
    // to not be full width
    <SideMenu className="col-sm-3 col-6 collapse d-sm-block bg-faded p-0 drawermobile" id="sidebar">
        <ul className="nav flex-column">
            <li className="nav-item" data-parent="#sidebar">
                <MenuItem className="nav-link d-flex align-items-center py-2 pr-1" href="#">
                    <i className="fa fa-heart"></i>
                    <MenuTitle className="collapse show drawerdesk ml-2">Item 1
                        <span className="badge badge-success float-right mr-1">6</span>
                        <span className="badge badge-info float-right mr-1">12</span>
                    </MenuTitle>
                </MenuItem>
            </li>
            <li className="nav-item" data-parent="#sidebar">
                <MenuItem className="nav-link collapsed d-flex align-items-center py-2 pr-1" href="#submenu2"
                        data-toggle="collapse" data-target="#submenu2">
                    <i className="fa fa-list"></i>
                    <MenuTitle className="collapse show drawerdesk ml-2">Item 2</MenuTitle>
                </MenuItem>
                <SubMenu className="collapse fade" id="submenu2" aria-expanded="false">
                    <ul className="flex-column nav">
                        <li className="nav-item">
                            <SubMenuItem className="nav-link d-flex align-items-center py-1 pr-1" href="#" data-parent="#submenu2">
                                <i className="fa fa-circle-o"></i>
                                <span className="ml-2">Item 1a</span>
                            </SubMenuItem>
                        </li>
                    </ul>
                </SubMenu>
            </li>
        </ul>
    </SideMenu>
)


// -----------------------------------------------------------------
// Experimental Drawer using Nav classes
// -----------------------------------------------------------------
const DrawerNav = () => (
        <SideMenu className="col-2 collapse d-md-flex bg-faded pt-2" id="sidebarnav">
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link" href="#">
                        <i className="fa fa-laptop"></i>Overview
                    </a>
                </li>
                <li className="nav-item">
                    <NavLinkMenu className="collapsed" href="#submenu1" data-toggle="collapse" data-target="#submenu1">
                        <i className="fa fa-circle-o"></i>Reports
                    </NavLinkMenu>
                    <div className="collapse fade" id="submenu1" aria-expanded="false">
                        <ul className="flex-column pl-2 nav">
                            <li className="nav-item"><a className="nav-link py-0" href="#">Orders</a></li>
                            <li className="nav-item">
                                <NavLinkMenu className="nav-link collapsed py-0" href="#submenu1sub1" data-toggle="collapse" data-target="#submenu1sub1">Customers</NavLinkMenu>
                                <div className="collapse small" id="submenu1sub1" aria-expanded="false">
                                    <ul className="flex-column nav pl-4">
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-clock-o"></i> Daily
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-dashboard"></i> Dashboard
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-bar-chart"></i> Charts
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link p-0" href="">
                                                <i className="fa fa-fw fa-compass"></i> Areas
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="nav-item"><a className="nav-link" href="#">Analytics</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Export</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
                <li className="nav-item"><a className="nav-link" href="#">Link</a></li>
            </ul>
        </SideMenu>
)

// -----------------------------------------------------------------
// Experimental Drawer using List classes
// -----------------------------------------------------------------
const DrawerList = () => (
        <div className="col-md-3 col-xs-1 p-l-0 p-r-0 collapse d-md-flex" id="sidebarlist">
            <div className="list-group panel">
                <a href="#menu1" className="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebarlist" aria-expanded="false"><i className="fa fa-dashboard"></i> <span className="d-none d-md-block">Item 1</span> </a>
                <div className="collapse" id="menu1">
                    <a href="#menu1sub1" className="list-group-item" data-toggle="collapse" aria-expanded="false">Subitem 1 </a>
                    <div className="collapse" id="menu1sub1">
                        <a href="#" className="list-group-item" data-parent="#menu1sub1">Subitem 1 a</a>
                        <a href="#" className="list-group-item" data-parent="#menu1sub1">Subitem 2 b</a>
                        <a href="#menu1sub1sub1" className="list-group-item" data-toggle="collapse" aria-expanded="false">Subitem 3 c </a>
                        <div className="collapse" id="menu1sub1sub1">
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub1">Subitem 3 c.1</a>
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub1">Subitem 3 c.2</a>
                        </div>
                        <a href="#" className="list-group-item" data-parent="#menu1sub1">Subitem 4 d</a>
                        <a href="#menu1sub1sub2" className="list-group-item" data-toggle="collapse"  aria-expanded="false">Subitem 5 e </a>
                        <div className="collapse" id="menu1sub1sub2">
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub2">Subitem 5 e.1</a>
                            <a href="#" className="list-group-item" data-parent="#menu1sub1sub2">Subitem 5 e.2</a>
                        </div>
                    </div>
                    <a href="#" className="list-group-item" data-parent="#menu1">Subitem 2</a>
                    <a href="#" className="list-group-item" data-parent="#menu1">Subitem 3</a>
                </div>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-film"></i> <span className="hidden-sm-down">Item 2</span></a>
                <a href="#menu3" className="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebarlist" aria-expanded="false"><i className="fa fa-book"></i> <span className="d-none d-md-block">Item 3 </span></a>
                <div className="collapse" id="menu3">
                    <a href="#" className="list-group-item" data-parent="#menu3">3.1</a>
                    <a href="#menu3sub2" className="list-group-item" data-toggle="collapse" aria-expanded="false">3.2 </a>
                    <div className="collapse" id="menu3sub2">
                        <a href="#" className="list-group-item" data-parent="#menu3sub2">3.2 a</a>
                        <a href="#" className="list-group-item" data-parent="#menu3sub2">3.2 b</a>
                        <a href="#" className="list-group-item" data-parent="#menu3sub2">3.2 c</a>
                    </div>
                    <a href="#" className="list-group-item" data-parent="#menu3">3.3</a>
                </div>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-heart"></i> <span className="d-none d-md-block">Item 4</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-list"></i> <span className="d-none d-md-block">Item 5</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-clock-o"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-th"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-gear"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-calendar"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-envelope"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-bar-chart-o"></i> <span className="d-none d-md-block">Link</span></a>
                <a href="#" className="list-group-item collapsed" data-parent="#sidebarlist"><i className="fa fa-star"></i> <span className="d-none d-md-block">Link</span></a>
            </div>
        </div>    
)

// -----------------------------------------------------------------
// Primary content area
// -----------------------------------------------------------------
const Content = ({toggleCB, toggleMode}) => (
    <main className="col-sm-9 col-6 pt-3" role="main">
        <DrawerControl toggleCB={toggleCB} toggleMode={toggleMode}/>
        {/* Sidebar toggle button for desktop only */}
        <a href=".drawerdesk" data-toggle="collapse"><i className="fa fa-desktop fa-lg"></i></a>
        {/* Sidebar toggle button for mobile only */}
        <a href=".drawermobile" data-toggle="collapse"><i className="fa fa-mobile fa-lg"></i></a>
        <a href="#sidebarlist" data-toggle="collapse"><i className="fa fa-navicon fa-lg"></i></a>
        <h1>Dashboard</h1>
    </main>
)

const Aside = () => (
    <div></div>
)

class AppBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerMode: true, // drawer mode
        } ;
        
        // This binding is necessary to make `this` work in the handleDayClick callback
        // Without it, 'this' will be undefined in the callback and calling this.setState 
        // in the callback will give an error
        // See https://facebook.github.io/react/docs/handling-events.html
        this.handleToggleMode = this.handleToggleMode.bind(this);
    }

    handleToggleMode () {
        this.setState ( {drawerMode: !this.state.drawerMode});
    }
    
    render() {
        const { drawerMode } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <Drawer mode={drawerMode} />
                    <Content toggleCB={this.handleToggleMode} toggleMode={drawerMode}/>
                    <Aside />
                </div>
            </div>
        )
    }
}

const AppBodyOld = () => (
    <div className="container-fluid">
        <DrawerControl />
        <div className="row">
            <Drawer />
            <Content />
            <Aside />
        </div>
    </div>
)

AppBody.propTypes = {
}

export default AppBody
