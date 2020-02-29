import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Form, Input } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import {commonActions} from '../../../../../store/action';
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

class Step3Item extends React.Component {

    constructor(props, context){
        super(props); 
    }

    componentDidMount() {
        this.props.onRef(this);     
    }

    cancel = () => {
        this.props.form.setFieldsValue({itemName: ''})
    }

    handleItemChange = e => {   
        let name  = '';
        let value = '';

        if(e.target){ 
            name  = e.target.name;     
            value = e.target.value;     
        } 

        if(name.length > 0 && value){
            this.props.setSelectedItemField(name, value);
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { selectedItem } = this.props;

        return (
            <React.Fragment>
                <Row className="step2-content">
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Name">           
                                {getFieldDecorator('docName', {
                                        initialValue: selectedItem ? selectedItem.docName : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input document name!',
                                        },
                                        { min: 4, message: 'Name must be minimum 4 characters.' }
                                        ],
                                    })
                                (<Input name="docName" onChange={this.handleItemChange}/>)}
                            </Form.Item>

                            <Form.Item label="Picture">           
                                {getFieldDecorator('docPicture', {
                                        initialValue: selectedItem ? selectedItem.docPicture : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input picture name!',
                                        },
                                        { min: 4, message: 'Picture must be minimum 4 characters.' }
                                        ],
                                    })
                                (<Input name="docPicture" onChange={this.handleItemChange}/>)}
                            </Form.Item>
                            
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

Step3Item.propTypes = {    
};

const mapDispatchToProps = {  
    ...commonActions     
}; 

function mapStateToProps(state) {
    return {
        selectedItem: state.common.selectedItem
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step3Item));