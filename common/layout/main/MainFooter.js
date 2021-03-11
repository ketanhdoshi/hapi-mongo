/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Container } from "react-bootstrap";

import s from './scss/MainFooter.scss'

class MainFooter extends Component {
  render() {
    return (
      <footer className={s.footer + " px-0 px-lg-3"}>
        <Container fluid>
          <nav>
            <ul className={s.footerMenu}>
              <li className={s.footerItemFirst}>
                <a href="#pablo" className={s.footerLink} onClick={(e) => e.preventDefault()}>
                  Home
                </a>
              </li>
              <li className={s.footerItem}>
                <a href="#pablo" className={s.footerLink} onClick={(e) => e.preventDefault()}>
                  Company
                </a>
              </li>
              <li className={s.footerItem}>
                <a href="#pablo" className={s.footerLink} onClick={(e) => e.preventDefault()}>
                  Portfolio
                </a>
              </li>
              <li className={s.footerItem}>
                <a href="#pablo" className={s.footerLink} onClick={(e) => e.preventDefault()}>
                  Blog
                </a>
              </li>
            </ul>
            <p className={s.copyright + " text-center"}>
              © {new Date().getFullYear()}{" "}
              <a href="http://www.creative-tim.com">Creative Tim</a>, made with
              love for a better web
            </p>
          </nav>
        </Container>
      </footer>
    );
  }
}

export default MainFooter;