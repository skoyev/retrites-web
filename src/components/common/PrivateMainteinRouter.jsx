import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { commonActions } from '../../store/action';
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PrivateMainteinRouter = props => {
    const location = useLocation(); 
    const { component: Component, isMainteinMode, ...rest } = props;

    useEffect(()=> {
        props.isMaintenance();
    }, []);

    if(isMainteinMode == undefined) {
        return null;
    }
    
    return (
            <Route {...rest} render={props => {
                    return (                
                        !isMainteinMode
                            ? <Component {...props} />
                            : <Redirect to={{ pathname: '/maintenance', state: { from: props.location } }} />
                )}} />
    )
}
const mapDispatchToProps = { 
    ...commonActions
}; 

function mapStateToProps(state) {
    return {
        isMainteinMode: state.common.isMainteinMode
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(PrivateMainteinRouter));
