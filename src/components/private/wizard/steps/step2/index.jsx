import React from 'react';
import PropTypes from 'prop-types'
import { Row, Form, Input } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import './style.css';

const formItemLayout = {
    labelCol: {
      xs: { span: 28 },
      sm: { span: 12 },
    },
    wrapperCol: {
      xs: { span: 28 },
      sm: { span: 18 },
    },
};

const Step2Item = props => {    
    const { getFieldDecorator, getFieldsError, isFieldTouched } = props.form;
    const { handleItemChange, title } = props;
    return (
        <React.Fragment>
            <Row>
                <h4>{title}</h4>
                <Form {...formItemLayout}>
                    <Form.Item label="Country">           
                        {getFieldDecorator('country', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please input Retreat Country!',
                                },
                                { min: 4, message: 'Country must be minimum 4 characters.' }
                                ],
                            })
                        (<Input name="country" onChange={handleItemChange}/>)}
                    </Form.Item>
                </Form>
            </Row>
        </React.Fragment>
    )
}

Step2Item.propTypes = {  
    handleItemChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
};

const mapDispatchToProps = {    
}; 

export default withLocalize(connect(null, mapDispatchToProps)(Step2Item));