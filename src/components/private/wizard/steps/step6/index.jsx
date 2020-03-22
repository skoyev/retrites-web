import React from 'react';
import { Row, Col, Form, DatePicker, InputNumber, Input } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import {commonActions} from '../../../../../store/action';
import './style.css';
import moment from 'moment';

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

class Step6Item extends React.Component {

    constructor(props, context){
        super(props); 
        this.state = {
        }
    }

    componentDidMount() {
        this.props.onRef(this);  
        this.checkIsStepValid();
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedItem.startDate !== prevProps.selectedItem.startDate ||
                this.props.selectedItem.duration !== prevProps.selectedItem.duration){
            this.checkIsStepValid(); 
        }
    }

    checkIsStepValid = () => {
        const {selectedItem} = this.props;

        // check startDate error validation
        let hasStartDateErrors = !selectedItem.startDate;

        // check duration error validation
        let hasDurationErrors = !selectedItem.duration;

        this.props.setIsNextStepValid(!hasStartDateErrors && !hasDurationErrors);            
    }

    cancel = () => {
        this.props.form.setFieldsValue({startDate: ''})
        this.props.form.setFieldsValue({duration: ''})
    }

    handleItemChange = e => {   
        let name  = '';
        let value = '';

        if(e.target){ 
            name  = e.target.name;     
            value = e.target.value;     
        } 

        this.props.setSelectedItemField(name, value);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedItem } = this.props;

        return (
            <React.Fragment>
                <Row className="step2-content">
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Start Date">           
                                <DatePicker name="startDate" 
                                            onChange={(e, value) => this.handleItemChange({target:{name:'startDate', value:value}})} 
                                            defaultValue={selectedItem.startDate ? moment(selectedItem.startDate, 'YYYY-MM-DD') : moment()}
                                            placeholder="Start Date"  
                                            style={{ marginLeft: '5px' }} />
                            </Form.Item>

                            <Form.Item label="Duration">           
                                {getFieldDecorator('duration', {
                                        initialValue: selectedItem ? selectedItem.duration : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input duration!',
                                        }
                                        ],
                                    })
                                (<InputNumber name="duration" style={{width:100}} onChange={(e) => this.handleItemChange({target:{name:'duration', value:e}})}/>)}
                            </Form.Item>

                            <Form.Item label="Frequency:">           
                                {getFieldDecorator('frequency', {
                                        initialValue: selectedItem ? selectedItem.frequency : '',
                                        rules: [
                                        {
                                            //required: true,
                                            //message: 'Please input duration!',
                                        }
                                        ],
                                    })
                                (<Input name="frequency" style={{width:200}} onChange={this.handleItemChange}/>)}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = {  
    ...commonActions     
}; 

function mapStateToProps(state) {
    return {
        selectedItem: state.common.selectedItem
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step6Item));