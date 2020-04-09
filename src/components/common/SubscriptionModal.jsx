import React from 'react';
import PropTypes from 'prop-types'
import { Button, Modal, Form, Input, Checkbox } from 'antd';
import { Translate } from "react-localize-redux";
import "./style/SubscriptionModal.css";
import CheckboxGroup from 'antd/lib/checkbox/Group';
import ReCAPTCHA from "react-google-recaptcha";
import { configConstants } from '../../constants';

window.recaptchaRef = React.createRef();

const SubscriptionModal = props => {
    const {visible, title, description, handleSubscriptionChange, handleSubscriptionSubmit, 
        handleSubscriptionCancel, categoryList, handleSubscriptionCheckboxChange,
        selectedCategoryList, showSuccessMessage, successMessage,
        captchaOnChange, isCaptchaValid} = props;

    const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
    };

    const hasErrors = function(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }

    const handleOk = function(value){

    }

    const { getFieldDecorator, getFieldsError, isFieldTouched } = props.form;
    const isSubscFieldTouched = isFieldTouched('subscriptionName');
    const isEmailFieldTouched = isFieldTouched('subscriptionEmail');

    const isDisabledSubmit = !isSubscFieldTouched || 
                                !isEmailFieldTouched || 
                                    hasErrors(getFieldsError(),isFieldTouched) ||
                                        selectedCategoryList.length == 0 ||
                                            !isCaptchaValid;
    return (
        <Modal  visible={visible}
                title={title}
                onOk={handleOk}
                onCancel={()=>handleSubscriptionCancel(props.form)}
                footer={[
                    <Button key="back" onClick={()=>handleSubscriptionCancel(props.form)}>Cancel</Button>,
                    <Button key="submit" type="primary" 
                            disabled={isDisabledSubmit} 
                            onClick={() => handleSubscriptionSubmit(props.form)}>Submit</Button>
                ]}>
                <div>
                    <div style={{marginBottom: 15}}>{description}</div>

                    <div>
                        <Form {...formItemLayout} onSubmit={handleSubscriptionSubmit}>                            
                            <Form.Item label="Name">           
                                {getFieldDecorator('subscriptionName', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input your Name!',
                                        },
                                        { min: 2, message: 'Name must be minimum 2 characters.' }
                                        ],
                                    })
                                (<Input name="subscriptionName" onChange={handleSubscriptionChange}/>)}
                            </Form.Item>
                            
                            <Form.Item label="E-mail">
                                {getFieldDecorator('subscriptionEmail', {
                                        rules: [
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                        ],
                                    })
                                    (<Input name="subscriptionEmail" onChange={handleSubscriptionChange}/>)}
                            </Form.Item>
                        </Form>
                    </div>

                    <div style={{marginBottom:20}}>
                        <CheckboxGroup
                            style={{ width: '100%' }}
                            options={categoryList}
                            value={selectedCategoryList}
                            onChange={handleSubscriptionCheckboxChange}/>
                    </div>

                    <div>                            
                        <ReCAPTCHA
                            ref={window.recaptchaRef}
                            sitekey={configConstants.CAPTCHA_KEY}
                            onChange={captchaOnChange}/>                            
                    </div>

                    {showSuccessMessage ? <div style={{color: '#FF5733', marginTop: 10}}>{successMessage}</div> : ''}
                </div>
        </Modal>    
    )
}

SubscriptionModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    handleSubscriptionChange: PropTypes.func.isRequired,
    handleSubscriptionSubmit: PropTypes.func.isRequired,    
    handleSubscriptionCancel: PropTypes.func.isRequired,
    handleSubscriptionCheckboxChange: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,    
    selectedCategoryList: PropTypes.array.isRequired,
    showSuccessMessage: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
    captchaOnChange: PropTypes.func.isRequired
}


export default SubscriptionModal;