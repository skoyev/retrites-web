import React from 'react';
import PropTypes from 'prop-types'

const RetreatDetailHeader = ({text}) => {
    return (
        <div className="row">
            <div>{text}</div>
        </div>
    )
}

RetreatDetailHeader.propTypes = {
    text: PropTypes.string.isRequired
}


export default RetreatDetailHeader;