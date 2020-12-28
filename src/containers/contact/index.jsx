import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './index.css'
import { commonActions } from '../../store/action';
import { validateEmail } from '../../helpers';
import { Row, Form, Input, Button, notification, Col } from 'antd';
import { withLocalize } from "react-localize-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { PublicHeader } from '../../components/public';
import { Link} from 'react-router-dom';
import { commonConstants, configConstants } from '../../constants';

const { TextArea } = Input;  

window.recaptchaRef = React.createRef();

const ContactUs = props => {
    const [isValid, setIsValid] = useState(false);
    const [isCaptchaValid, setIsCaptchaValid] = useState(false);
    const [name, setName]       = useState('');
    const [email, setEmail]     = useState('');
    const [details, setDetails] = useState('');
    const [error, setError]     = useState('');

    const validate = () => {
        let isValidEmail = validateEmail(email);
        let isValid = isCaptchaValid && name.length > 0 && isValidEmail && details.length > 0;
        setIsValid(isValid)
    }    

    useEffect(()=> {    
        validate();    
    }, [isCaptchaValid]);

    const handleCaptchaOnChange = (e) => {
        setIsCaptchaValid(true)
    }

    const openNotification = () => {
        const args = {
            message: 'Retreat Request',
            description:
                `Thank you for your request. We will get back to you withing 24 hours!`,
            duration: 4,
        };
        notification.open(args);
    };    

    const submitRequest = () => {
        props.sendEmail(details, "Contact Us", email);  
        openNotification();

        setTimeout(()=> {
            props.history.push(`/home`);
        },5000);
    
        window.recaptchaRef.current.reset();
        setError('');    
    }

    return (
        <>
            <Row className="section1">
                <PublicHeader />                
                <div className="main" style={{marginTop:-50}}>
                    <div className="content">Our all-in-one wellness management software helps you save time, streemline service to the right audience, fill up your event, manage your booking which would let you focus on delivering programs that impact humans.</div>
                    <div className="register">
                        <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                    </div>
                </div>                
            </Row>            

            <Row className="main-content">
                <div className="lead container">
                    <h2>HOW IT WORKS</h2>
                    <Col offset={3} span={18}>
                        <p>We make it easy to scale your team - on demand. Using our proven process, typical time from first convo to the ideal new hire is days, rather than months.</p>
                    </Col>                    
                </div>

            </Row>

            <Row className="main-content space-bottom gray">
                <div className="lead container">
                    <h2>What We Offer</h2>
                    <Col offset={3} span={18}>
                        <p>Market Your Event With Us, We Will Take Care Of Marketing To The Right Audience.
                        Manage bookings and rooms, communicate with your audience, and free up time to focus on your event with Retreat In Mind registration, event management, payment processing and guest communication and analytics solutions.</p>
                    </Col>
                </div>
            </Row>

            <Row className="main-content space-padding-top">
                <div className="bottom-form">
                    <h1>HOW CAN WE HELP YOU</h1>
                    <Form
                        layout="vertical"
                        className="contact-form">                       
                            <Form.Item label="NAME OR ORGANIZATION"
                                       name="name"
                                       className="wide-label"                                       
                                       rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input required name="name" onChange={({target:{value:data}}) => setName(data)}/>
                            </Form.Item>                
                            <Form.Item label="EMAIL"
                                       name="email"
                                       className="wide-label" 
                                       rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input required name="email" type="email" onChange={({target:{value:data}}) => setEmail(data)}/>
                            </Form.Item>                
                            <Form.Item label="DETAILS"
                                       name="details"
                                       className="wide-label" 
                                       rules={[{ required: true, message: 'Please input your details!' }]}>
                                <TextArea required rows={5} name="details" onChange={({target:{value:data}}) => setDetails(data)}/>
                            </Form.Item>                

                            <Form.Item>

                            <Form.Item>
                                <ReCAPTCHA
                                    ref={window.recaptchaRef}
                                    sitekey={configConstants.CAPTCHA_KEY}
                                    onChange={handleCaptchaOnChange}/>                            
                                </Form.Item>

                            </Form.Item>

                            <Form.Item>                                
                                <Button disabled={isValid ? '' : 'disabled'} style={{float:'right', marginTop: -50}} type="primary" onClick={submitRequest} htmlType="submit">SUBMIT</Button>
                            </Form.Item>                            
                    </Form>
                </div>
            </Row>            
        </>
    )
}

const mapDispatchToProps = { 
    ...commonActions
}; 

function mapStateToProps(state) {
    return {        
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(ContactUs));