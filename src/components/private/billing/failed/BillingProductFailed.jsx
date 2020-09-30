import React, { useEffect } from 'react';
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import './index.css'

const BillingProductFailed = props => {

    useEffect(()=> {
    }, []);

    return (
        <React.Fragment>
            Failed
        </React.Fragment>
    )
}

const mapDispatchToProps = { 
}; 

function mapStateToProps(state) {
    return {
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(BillingProductFailed));