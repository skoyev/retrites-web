import React from 'react';
import { itemActions } from '../../../store/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import { PublicHeader } from '../../../components/public';

class AddNewRetreatPage extends React.Component {

    constructor(props) {
        super(props);
    }
        
    render() {
        return (
        <div>
            <PublicHeader shouldShowAdd={false}/>
            <div className="container">                
                <div className="d-inline-block">
                    <Translate>
                        {({ translate }) =>
                            <Link to="/register" className="btn btn-link d-inline">{translate('public.links.join')}</Link>}                        
                    </Translate>
                    OR
                    <Translate>
                        {({ translate }) =>
                                <Link to="/login" className="btn btn-link d-inline">{translate('public.links.login_community')}</Link>}
                    </Translate>
                </div>
            </div>
        </div>
        )
    }
}

const mapDispatchToProps = {    
    ...itemActions
};  
  
export default connect(null, mapDispatchToProps)(AddNewRetreatPage);