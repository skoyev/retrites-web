import React from 'react';
import PropTypes from 'prop-types'

const Footer = ({text}) => {
    return (
        <div className="row">
            <div>{text}</div>
        </div>
    )
}

Footer.propTypes = {
    text: PropTypes.string.isRequired
}


export default Footer;