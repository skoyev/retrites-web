import React from 'react';
import PropTypes from 'prop-types'
import { Row } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import './style.css';

const Step3Item = props => {    
    return (
        <React.Fragment>
            Step3Item
        </React.Fragment>
    )
}

Step3Item.propTypes = {    
};

const mapDispatchToProps = {    
}; 

export default withLocalize(connect(null, mapDispatchToProps)(Step3Item));