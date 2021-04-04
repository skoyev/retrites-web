import React from 'react';
import { itemActions, userActions, commonActions } from '../../../store/action';
import { connect } from 'react-redux'
import { Translate } from "react-localize-redux";
import { PublicHeader } from '../../../components/public';
import { Row, Form, Input, Button, notification, Col } from 'antd';
import AppFooter from '../../../components/common/AppFooter';
import './index.css';
import JoinUs from '../../../components/common/join/JoinCommunity';
import { commonConstants } from '../../../constants';
import { withRouter, Link } from 'react-router-dom';
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
        this.setState({ isCaptchaValid: true }, () => this.validate())
    }

    submitRequest = () => {
        let { details, name, email } = this.state;
        this.props.sendEmail(details, "Info", email);
        this.openNotification();

        setTimeout(() => {
            this.props.history.push(`/home`);
        }, 5000);

        window.recaptchaRef.current.reset();
        this.setState({ error: '' });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => this.validate())
    }

    validate = () => {
        const { isCaptchaValid, name, email, details } = this.state;
        let isValidEmail = validateEmail(email);
        let isValid = isCaptchaValid && name.length > 0 && isValidEmail && details.length > 0;
        this.setState({ isValid: isValid })
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

        const root = document.querySelector(':root');
        const rs = getComputedStyle(root);

        const addRetreat1 = rs.getPropertyValue('--add-retreat-1').trim().replaceAll('"', '');
        const addRetreat2 = rs.getPropertyValue('--add-retreat-2').trim().replaceAll('"', '');
        const addRetreat3 = rs.getPropertyValue('--add-retreat-3').trim().replaceAll('"', '');
        const addRetreat4 = rs.getPropertyValue('--add-retreat-4').trim().replaceAll('"', '');
        const addRetreat5 = rs.getPropertyValue('--add-retreat-5').trim().replaceAll('"', '');
        const addMatched = rs.getPropertyValue('--add-matched').trim().replaceAll('"', '');
        const addRiskFree = rs.getPropertyValue('--add-risk-free').trim().replaceAll('"', '');

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

                <Row className="main-content">
                    <div className="lead container">
                        <h2>HOW IT WORKS</h2>
                        <Col offset={3} span={18}>
                            <p>We make it easy to scale your team - on demand. Using our proven process, typical time from first convo to the ideal new hire is days, rather than months.</p>
                        </Col>
                    </div>

                </Row>

                <Row className="main-content gray">
                    <div className="lead container text-white">
                        <h2>The Best Wellness Organization Software</h2>
                        <h4>IT HAS ALL TO MAKE YOUR RETRITE RUNNING SUCCESSFULY</h4>
                        <Row>
                            <Col className="img-container wide" offset={2} span={10}>
                                <article>
                                    <div className="img">
                                        <div className="animate">
                                            <img id="pair-1" src={addRetreat1} alt="pair1" className="animated" />
                                            <img id="pair-2" src={addRetreat2} alt="pair2" className="animated" />
                                            <img id="pair-3" src={addRetreat3} alt="pair1" className="animated" />
                                            <img id="pair-4" src={addRetreat4} alt="pair1" className="animated" />
                                            <img id="pair-5" src={addRetreat5} alt="pair1" className="animated" />
                                        </div>
                                    </div>
                                    <p>Discuss students goals with a dedicated instant messaging tool</p>
                                </article>
                            </Col>

                            <Col className="img-container" offset={1} span={10}>
                                <article>
                                    <div className="img">
                                        <img id="matched-1" src={addMatched} alt="pair1" className="animated" />
                                    </div>
                                    <p>Get intelligently know your audience so you can deliver best sessions to them</p>
                                </article>
                            </Col>

                            <Col className="img-container" offset={1} span={10}>
                                <article>
                                    <div className="img">
                                        <img id="pair-1" src={addRiskFree} alt="pair1" className="animated" />
                                    </div>
                                    <p>Start risk-free to use our software ensure it's a right fit</p>
                                </article>
                            </Col>

                        </Row>
                        <Row className="space-top-bottom">
                            <Col className="register" span={8} offset={8}>
                                <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                            </Col>
                        </Row>
                    </div>
                </Row>

                <Row className="main-content space-bottom">
                    <div className="lead container">
                        <h2>What We Offer</h2>
                        <Col offset={3} span={18}>
                            <p>Market Your Event With Us, We Will Take Care Of Marketing To The Right Audience.
                        Manage bookings and rooms, communicate with your audience, and free up time to focus on your event with Retreat In Mind registration, event management, payment processing and guest communication and analytics solutions.</p>
                        </Col>
                    </div>
                </Row>

                <Row className="section2">
                    <div className="main space-top">
                        <h1>Easy Integration With Your Platform</h1>
                        <div className="content" style={{ color: '#27282b' }}>We make it easy to scale your team on demand. Using our proven process.</div>
                        <div className="register">
                            <div className="btn custom"><Link className="btn" to={commonConstants.REGISTER_PAGE_LINK}>JOIN OUR COMMUNITY</Link></div>
                        </div>
                    </div>
                </Row>

                <Row className="main-content space-padding-top gray">
                    <div className="bottom-form">
                        <h1>HOW CAN WE HELP YOU</h1>
                        <Form
                            layout="vertical"
                            className="contact-form">
                            <Form.Item label="NAME OR ORGANIZATION"
                                name="name"
                                className="wide-label"
                                rules={[{ required: true, message: 'Please input your name!' }]}>
                                <Input required name="name" onChange={this.handleChange} />
                            </Form.Item>
                            <Form.Item label="EMAIL"
                                name="email"
                                className="wide-label"
                                rules={[{ required: true, message: 'Please input your email!' }]}>
                                <Input required name="email" type="email" onChange={this.handleChange} />
                            </Form.Item>
                            <Form.Item label="DETAILS"
                                name="details"
                                className="wide-label"
                                rules={[{ required: true, message: 'Please input your details!' }]}>
                                <TextArea required rows={5} name="details" onChange={this.handleChange} />
                            </Form.Item>

                            <Form.Item>

                                <Form.Item>
                                    <ReCAPTCHA
                                        ref={window.recaptchaRef}
                                        sitekey={configConstants.CAPTCHA_KEY}
                                        onChange={this.handleCaptchaOnChange} />
                                </Form.Item>

                            </Form.Item>

                            <Form.Item>
                                <Button disabled={isValid ? '' : 'disabled'} style={{ float: 'right', marginTop: -50 }} type="primary" onClick={this.submitRequest} htmlType="submit">SUBMIT</Button>
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