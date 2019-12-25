import React from 'react';
import PropTypes from 'prop-types'

const Loading = ({text}) => {
    return (
        <div className="container">
            <div className="row">
                <div style={{margin: 'auto', width: '20%', marginTop: '25px'}}><h3 style={{textAlign:'center'}}>{text}</h3></div>
            </div>
        </div>
    )
}

Loading.propTypes = {
    text: PropTypes.string.isRequired
}

export default Loading;