import React from 'react';
import { Row, Col, Form, Input, Menu, Dropdown, InputNumber } from 'antd';
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

const menu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index}>{d}</Menu.Item>)}            
        </Menu>  
    )
}

class Step5Item extends React.Component {

    constructor(props, context){
        super(props); 
        this.state = {
        }
    }

    componentDidMount() {
        this.props.onRef(this);  
        this.checkIsStepValid();
    }

    cancel = () => {
        this.props.form.setFieldsValue({currency: ''})
    }

    handleItemChange = e => {   
        let name  = '';
        let value = '';

        if(e.target){ 
            name  = e.target.name;     
            value = e.target.value;     
        } else if(e.item) {
            name  = e.item.props.name;     
            value = e.item.props.data[e.key];     
        } 

        this.props.setSelectedItemField(name, value);
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedItem.currency !== prevProps.selectedItem.currency ||
                this.props.selectedItem.price !== prevProps.selectedItem.price){
            this.checkIsStepValid(); 
        }
    }

    checkIsStepValid = () => {
        const {selectedItem} = this.props;

        // check currency error validation
        let hasCurrencyErrors = !selectedItem.currency;

        // check price error validation
        let hasPriceErrors = !selectedItem.price;

        this.props.setIsNextStepValid(!hasCurrencyErrors && !hasPriceErrors);            
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedItem, currency } = this.props;

        return (
            <React.Fragment>
                <Row className="step2-content">
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Currency">           
                                <Dropdown.Button className="" 
                                                name="currency" 
                                                overlay={menu(currency, this.handleItemChange, 'currency')}>
                                    {selectedItem && selectedItem.currency ? selectedItem.currency : 'Select Currency'}
                                </Dropdown.Button>
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Price Per Course">           
                                {getFieldDecorator('price', {
                                        initialValue: selectedItem ? selectedItem.price : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input price!',
                                        }
                                        ],
                                    })
                                (<InputNumber name="price" onChange={(e) => this.handleItemChange({target:{name:'price', value:e}})}/>)}$
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
        selectedItem: state.common.selectedItem,
        currency: ['USD','CAD']
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step5Item));