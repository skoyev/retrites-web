import React, { useEffect, useState } from 'react';
import { Row, Layout, Col, Input, Button } from 'antd';
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import './index.css'
import { commonActions } from '../../store/action';
import maintenance from '../../assets/images/maintenance.jpg';
import { validateEmail } from '../../helpers';

const { Header, Footer, Content } = Layout;

const Maintenance = props => {
                      
    useEffect(()=> {        
    }, []);

    const [email, setEmail] = useState('');
    const [name, setName]   = useState('');
    const [show, setShow]   = useState(false);

    const handleSubscribe = () => {
        // send subscribe
        if(name && email && validateEmail(email)) {
            props.subscribe(name, email);

            setName('');
            setEmail('');

            setShow(true);
            setTimeout(() => setShow(false), 3000);    
        }
    }

    return (
        <>
            <Row style={{backgroundImage: `url('${maintenance}')`, height: '100%'}}>
                <Col span={3}></Col>
                <Col span={18}>
                    <Row className="title" style={{marginTop:35}}>
                        <h2>MAINTENANCE MODE</h2>
                        <h3>'Retreat Your Mind' is in undergoing scheduled maintenance.</h3>
                        <h4>Sorry for the inconnvinience.</h4>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Row style={{marginTop:150, marginBottom: 10}}>
                                <Col>
                                    <span className="notify">Notify me when it is available</span>
                                </Col>                                
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <Input type='text' value={name} onChange={({target:{value:data}})=>setName(data)} placeholder="Your Name"/>
                                </Col>
                                <Col span={10} offset={1}>
                                    <Input type='email' value={email} onChange={({target:{value:data}})=>setEmail(data)} placeholder="Your Email"/>
                                </Col>
                                <Col span={6} offset={1}>
                                    <Button type="primary" onClick={handleSubscribe}>Subscribe</Button>
                                </Col>                                
                            </Row>
                            <Row style={{marginTop:10}}>
                                <Col className="red">
                                    { show && 
                                        <span>You have been subscribed successfully.</span>
                                    }
                                </Col>
                            </Row>
                        </Col>
                        <Col span={13}></Col>
                    </Row> 
                </Col>
                <Col span={3}></Col>
            </Row>
        </>
    )
}

const mapDispatchToProps = { 
    ...commonActions
}; 

function mapStateToProps(state) {
    return {
        isLoading: state.common.isLoading
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Maintenance));