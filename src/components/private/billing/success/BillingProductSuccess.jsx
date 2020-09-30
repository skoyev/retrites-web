import React, { useEffect } from 'react';
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import './index.css'

const BillingProductSuccess = props => {

    useEffect(()=> {
    }, []);

    return (
        <React.Fragment>
            Success
        </React.Fragment>
    )
}

const mapDispatchToProps = { 
}; 

function mapStateToProps(state) {
    return {
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(BillingProductSuccess));