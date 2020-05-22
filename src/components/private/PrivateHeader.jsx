import React from 'react';
import * as Redux from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../store/action';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { history } from '../../helpers';
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

    render() {
        const { loggingIn, user } = this.props;
        return (
            <div className="col-md-12"> 
                <Row>
                    <Col span={16}></Col>
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