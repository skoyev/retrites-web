import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { Button, Modal, Form, Input, Checkbox } from 'antd';
import { Translate } from "react-localize-redux";
import "./style/SubscriptionModal.css";
import { chunk } from '../../helpers/';
import CheckboxGroup from 'antd/lib/checkbox/Group';

const SubscriptionModal = props => {
    const {visible, title, description, handleSubscriptionChange, handleSubscriptionSubmit, 
        handleSubscriptionCancel, subscriptionName, subscriptionEmail, categoryList, handleSubscriptionCheckboxChange,
        selectedCategoryList, showSuccessMessage, successMessage, invalidEmail} = props;

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

    const { getFieldDecorator, getFieldsError, isFieldTouched } = props.form;
    const isSubscFieldTouched = isFieldTouched('subscriptionName');
    const isEmailFieldTouched = isFieldTouched('subscriptionEmail');

    return (
        <Modal  visible={visible}
                title={title}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={handleSubscriptionCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" disabled={!isSubscFieldTouched || !isEmailFieldTouched || hasErrors(getFieldsError(),isFieldTouched)} onClick={handleSubscriptionSubmit}>Submit</Button>
                ]}>
                <div>
                    <div style={{marginBottom: 15}}>{description}</div>

                    <div>
                        <Form {...formItemLayout} onSubmit={this.handleSubscriptionSubmit}>                            
                            <Form.Item label="Name">           
                                {getFieldDecorator('subscriptionName', {
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input your Name!',
                                        },
                                        { min: 2, message: 'Name must be minimum 3 characters.' }
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
                            {invalidEmail ? <div style={{color: '#FF5733', marginBottom: 10}}>Invalid Email</div> : ''}
                        </Form>
                    </div>

                    <div>
                        <CheckboxGroup
                            style={{ width: '100%' }}
                            options={categoryList}
                            value={selectedCategoryList}
                            onChange={handleSubscriptionCheckboxChange}/>
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
    subscriptionName: PropTypes.string.isRequired,
    subscriptionEmail: PropTypes.string.isRequired,
    handleSubscriptionChange: PropTypes.func.isRequired,
    handleSubscriptionSubmit: PropTypes.func.isRequired,    
    handleSubscriptionCancel: PropTypes.func.isRequired,
    handleSubscriptionCheckboxChange: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,    
    selectedCategoryList: PropTypes.array.isRequired,
    showSuccessMessage: PropTypes.bool.isRequired,
    successMessage: PropTypes.string.isRequired,
    invalidEmail: PropTypes.bool.isRequired
}


export default SubscriptionModal;