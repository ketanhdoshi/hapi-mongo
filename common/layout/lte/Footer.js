// -----------------------------------------------------------------
// Presentational component for the Footer
// -----------------------------------------------------------------
import React from 'react'
import PropTypes from 'prop-types'

import s from '../../scss/Footer.scss'

const Footer = ({msg}) => (
    <footer className={s.footer}>
        <p className="text-muted">{msg}</p>
    </footer>
)

Footer.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Footer
