import React from 'react';
import { itemActions, userActions } from '../../../store/action';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import { PublicHeader } from '../../../components/public';
import { Row, Form, Input, Button } from 'antd';
import AppFooter from '../../../components/common/AppFooter';
import './index.css';
import JoinUs from '../../../components/common/join/JoinCommunity';
import { commonConstants } from '../../../constants';
import {withRouter, Link} from 'react-router-dom';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const { TextArea } = Input;  
class AddNewRetreatPage extends React.Component {

    /*
    constructor(props) {
        super(props);
    }
    */

    onFinish = values => {
        console.log('Success:', values);
    };

    onFinishFailed = errorInfo => {
     console.log('Failed:', errorInfo);
    };    
        
    render() {
        const { retreatByCountries } = this.props;        
        return (            
        <React.Fragment>
            <Row className="section1">
                <PublicHeader />                
                <div className="main">
                    <h1>250,000 people book a retreat through Retreat In Mind every year</h1>
                    <div className="content">Our all-in-one retreat management software helps you save precious time, fill your events, build relationships with your participants, manage your bookings and finances, and run smooth retreats so you can focus on what you do best – delivering programs that impact lives.</div>
                    <div className="register">
                        <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                    </div>
                </div>                
            </Row>            

            <Row className="main-content gray">
                <div className="lead container">
                    <h2>How It Works</h2>
                    <p>We make it easy to scale your team - on demand. Using our proven process, typical time from first convo to the ideal new hire is days, rather than months.</p>
                </div>

                <div className="lead container">
                    <h2>What We Offer</h2>
                    <p>Market Your Event With Us, We Will Take Care Of Marketing To The Right Audience.</p>
                    <p>Manage bookings and rooms, communicate with your guests, and free up time to focus on your retreat with Retreat Guru's registration, event management, payment processing and guest communication and analytics solutions.</p>
                </div>
            </Row>

            <Row className="section2">
                <div className="main space-top">
                    <h1>Seamless integration with your Retreat</h1>
                    <div className="content">We make it easy to scale your team - on demand. Using our proven process, typical time from first convo to the ideal new hire is days, rather than months.</div>
                    <div className="register">
                        <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                    </div>
                </div>              
            </Row>

            <Row className="main-content gray">
                <div className="bottom-form">
                    <h1>How Can We Help You</h1>
                    <Form
                        layout="vertical"
                        className="contact-form"                        
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}>
                            <Form.Item label="Name"
                                       name="name"
                                       rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input />
                            </Form.Item>                
                            <Form.Item label="Email"
                                       name="email"
                                       rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input />
                            </Form.Item>                
                            <Form.Item label="Details"
                                       name="details"
                                       rules={[{ required: true, message: 'Please input your details!' }]}>
                                <TextArea rows={5} name="details" />
                            </Form.Item>                

                            <Form.Item>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>                            
                    </Form>
                </div>
            </Row>

            <AppFooter title="@2019 Retreat In Mind Inc." countries={retreatByCountries}/>
        </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
      retreatByCountries: state.items.retreatByCountries,
    };
}

const mapDispatchToProps = {    
    ...itemActions, 
    ...userActions
};
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNewRetreatPage));