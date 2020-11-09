import React from 'react';
import { itemActions, userActions, commonActions } from '../../../store/action';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import { PublicHeader } from '../../../components/public';
import { Row, Form, Input, Button, notification } from 'antd';
import AppFooter from '../../../components/common/AppFooter';
import './index.css';
import JoinUs from '../../../components/common/join/JoinCommunity';
import { commonConstants } from '../../../constants';
import {withRouter, Link} from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import { configConstants } from '../../../constants';
import { validateEmail } from '../../../helpers';
import { withLocalize } from "react-localize-redux";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

const { TextArea } = Input;  

window.recaptchaRef = React.createRef();
class AddNewRetreatPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCaptchaValid: false,
            details: '',
            name: '',
            email: '',
            isValid: false,
            error: ''
        }
    }

    handleCaptchaOnChange = () => {
        this.setState({isCaptchaValid: true}, () => this.validate())    
    }

    submitRequest = () => {
        let {details, name, email} = this.state;
        this.props.sendEmail(undefined,details, name, email);  
        this.openNotification();

        setTimeout(()=> {
            this.props.history.push(`/home`);
        },5000);
    
        window.recaptchaRef.current.reset();
        this.setState({error: ''});    
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value}, () => this.validate())        
    }

    validate = () => {
        const {isCaptchaValid, name, email, details} = this.state;
        let isValidEmail = validateEmail(email);
        let isValid = isCaptchaValid && name.length > 0 && isValidEmail && details.length > 0;
        this.setState({isValid:isValid})
    }

    openNotification = () => {
        const args = {
            message: 'Retreat Request',
            description:
                `Thank you for your request. We will get back to you withing 24 hours!`,
            duration: 4,
        };
        notification.open(args);
    };    

    render() {
        const { retreatByCountries } = this.props;        
        const { isValid } = this.state;        

        return (            
        <React.Fragment>
            <Row className="section1">
                <PublicHeader />                
                <div className="main">
                    <h1>150,000 people book a wellness session through Retreat In Mind every year</h1>
                    <div className="content">Our all-in-one wellness management software helps you save time, streemline service to the right audience, fill up your event, manage your booking which would let you focus on delivering programs that impact humans.</div>
                    <div className="register">
                        <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                    </div>
                </div>                
            </Row>            

            <Row className="main-content gray">
                <div className="lead container">
                    <h2>HOW IT WORKS</h2>
                    <p>We make it easy to scale your team - on demand. Using our proven process, typical time from first convo to the ideal new hire is days, rather than months.</p>
                </div>

                <div className="lead container">
                    <h2>WHAT WE OFFER</h2>
                    <p>Market Your Event With Us, We Will Take Care Of Marketing To The Right Audience.</p>
                    <p>Manage bookings and rooms, communicate with your guests, and free up time to focus on your retreat with Retreat Guru's registration, event management, payment processing and guest communication and analytics solutions.</p>
                </div>
            </Row>

            <Row className="section2">
                <div className="main space-top">
                    <h1>EASY INTEGRATION WITH YOUR PLATFORM</h1>
                    <div className="content" style={{color: '#27282b'}}>We make it easy to scale your team on demand. Using our proven process.</div>
                    <div className="register">
                        <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                    </div>
                </div>              
            </Row>

            <Row className="main-content gray space-padding-top">
                <div className="bottom-form">
                    <h1>HOW CAN WE HELP YOU</h1>
                    <Form
                        layout="vertical"
                        className="contact-form">                       
                            <Form.Item label="NAME OR ORGANIZATION"
                                       name="name"
                                       className="wide-label"                                       
                                       rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input required name="name" onChange={this.handleChange}/>
                            </Form.Item>                
                            <Form.Item label="EMAIL"
                                       name="email"
                                       className="wide-label" 
                                       rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input required name="email" type="email" onChange={this.handleChange}/>
                            </Form.Item>                
                            <Form.Item label="DETAILS"
                                       name="details"
                                       className="wide-label" 
                                       rules={[{ required: true, message: 'Please input your details!' }]}>
                                <TextArea required rows={5} name="details" onChange={this.handleChange}/>
                            </Form.Item>                

                            <Form.Item>

                            <Form.Item>
                                <ReCAPTCHA
                                    ref={window.recaptchaRef}
                                    sitekey={configConstants.CAPTCHA_KEY}
                                    onChange={this.handleCaptchaOnChange}/>                            
                                </Form.Item>

                            </Form.Item>

                            <Form.Item>                                
                                <Button disabled={isValid ? '' : 'disabled'} style={{float:'right'}} type="primary" onClick={this.submitRequest} htmlType="submit">SUBMIT</Button>
                            </Form.Item>                            
                    </Form>
                </div>
            </Row>            
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
    ...commonActions
};
  
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(withRouter(AddNewRetreatPage)));