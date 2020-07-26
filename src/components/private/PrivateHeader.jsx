import React from 'react';
import { userActions } from '../../store/action';
import { isExpiredUser } from '../../components/common/CommonUtil';
import { connect } from 'react-redux'
import { Row, Col, Icon } from 'antd';
import './style/PrivateHeader.css';
//import Icon from '@ant-design/icons';

class PrivateHeader extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            logedOut: false
        };
    }    

    checkIsBillingExpired = (billing_expires_at) => {
        if(billing_expires_at) {
            // check if date is withing next 7 days.
            let expDate = Date.parse(billing_expires_at);
            var today   = new Date();
            var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7).getTime();             
            return nextweek >= expDate
        } else {
            return false;
        }        
    }

    render() {
        const { loggingIn, user } = this.props;
        let isExpiredBilling = isExpiredUser(user);
        return (
            <div className="col-md-12"> 
                <Row>
                    {
                        isExpiredBilling && 
                        <>
                            <Col span={2}></Col>
                            <Col span={12} className="warning">Your subscription is about to expire. Please renew it.</Col>
                        </>
                    }
                    {
                        !isExpiredBilling &&
                        <Col span={16}></Col>
                    }
                    <Col span={6} className="right">{user && <span>Welcome, {`${user.firstName} ${user.lastName}`}</span>}</Col>
                    <Col span={2}><button className="btn btn-primary custom-button left-space" onClick={this.props.handleMenu}><Icon type="menu" /></button></Col>
                </Row> 
            </div>
        );
    }
} 

const mapDispatchToProps = {    
    ...userActions
};  
  
export default connect(null, mapDispatchToProps)(PrivateHeader);