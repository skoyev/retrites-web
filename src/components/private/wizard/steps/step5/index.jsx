import React from 'react';
import { Row, Col, Form, Input, Menu, Dropdown, InputNumber, Button, DatePicker } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions } from '../../../../../store/action';
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

const menu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index}>{d}</Menu.Item>)}            
        </Menu>  
    )
}

const { TextArea } = Input;
class Step5Item extends React.Component {

    constructor(props, context){
        super(props); 
        this.state = {
            events: [{}]
        }
        this.deleteEvent = this.deleteEvent.bind(this);
        this.addEvent = this.addEvent.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);  
        this.checkIsStepValid(this.props.selectedItem.events);
    }

    cancel = () => {
        this.props.form.setFieldsValue({currency: ''})
    }

    handleItemChange = e => {   
        let name  = '';
        let value = '';
        let index = 0;

        if(e.target){ 
            name  = e.target.name;     
            value = e.target.value;     
            index = e.target.index;     
        } else if(e.item) {
            index = e.item.index;     
            name  = e.item.value.item.props.name;     
            value = e.item.value.item.props.data[e.item.value.key];     
        } 

        const {events} = this.props.selectedItem;

        events[index][name] = value;

        this.props.setSelectedItemField('events', events);

        this.checkIsStepValid(events);
    }

    checkIsStepValid = (events) => {
        let isValid = events.every(e => {
            return e.from && e.to && (moment(e.from) < moment(e.to)) && 
                    (e.description && e.description.length > 9) && 
                        e.currency && (e.price && e.price > 0) && 
                            (e.duration && e.duration > 0);
        });

        let isValidDatesOverlap = events.length > 1 ? events.every((e, i) => {
            var isValid = true;
            for (let y = (i + 1); y <= (events.length - 1); y++ ){
                if(moment(events[y].from) < moment(e.to)){
                    isValid = false;
                    break;
                }
            }
            return isValid;
        }) : true;

        this.props.setIsNextStepValid(isValid && isValidDatesOverlap);            
    }

    addEvent = () => {
        let {events} = this.props.selectedItem;
        events.push({});
        this.props.setSelectedItemField('events', events);
        this.checkIsStepValid(events);
    }

    deleteEvent = (index) => {
        this.props.setSelectedItemField('events', this.props.selectedItem.events.filter((e, i) => i != index));
        this.checkIsStepValid(this.props.selectedItem.events);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedItem, currency } = this.props;
        const { events } = this.props.selectedItem;

        return (
            <React.Fragment>
                <Row className="step2-content">
                    <div>Add Course Schedule For The Periods</div>                    
                        {events.map((v, i) => 
                            <Form key={i} {...formItemLayout} className="form">
                                <Row className="border-row">                                                                 
                                    <Row>
                                        <Col span={12}>
                                            <div>Event {i + 1}</div>
                                        </Col>
                                        <Col span={12}>
                                            {i > 0 && <CloseOutlined className="close" onClick={() => this.deleteEvent(i) } style={{float:'right'}}/>}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={8}>
                                            <Form.Item label="Start Date" className="full-width">           
                                                <DatePicker name="from" 
                                                            onChange={(e, value) => this.handleItemChange({target:{name:'from', value:value, index: i}})} 
                                                            defaultValue={selectedItem.events[i].from ? moment(selectedItem.events[i].from, 'YYYY-MM-DD') : moment()}
                                                            placeholder="Start Date"  
                                                            style={{ marginLeft: '5px' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="End Date" className="full-width">           
                                                <DatePicker name="to" 
                                                            onChange={(e, value) => this.handleItemChange({target:{name:'to', value:value, index: i}})} 
                                                            defaultValue={selectedItem.events[i].to ? moment(selectedItem.events[i].to, 'YYYY-MM-DD') : moment()}
                                                            placeholder="End Date"  
                                                            style={{ marginLeft: '5px' }} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={8}>
                                            <Form.Item label="Duration" className="full-width">           
                                                {getFieldDecorator(`duration-${i}`, {
                                                        initialValue: selectedItem.events[i].duration ? selectedItem.events[i].duration : '',
                                                        rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input duration!',
                                                        }
                                                        ],
                                                    })
                                                (<InputNumber name="duration" onChange={(e) => this.handleItemChange({target:{name:'duration', value:e, index: i}})}/>)}
                                            </Form.Item>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col span={8}>                                    
                                            <Form.Item label="Currency" className="full-width">           
                                                <Dropdown.Button className="" 
                                                                name="currency" 
                                                                overlay={menu(currency, (v) => this.handleItemChange({item:{index: i, value: v}}), 'currency')}>
                                                    {selectedItem.events[i].currency ? selectedItem.events[i].currency : 'Select Currency'}
                                                </Dropdown.Button>
                                            </Form.Item>
                                        </Col>
                                        <Col span={5}>
                                            <Form.Item label="Price" className="full-width">           
                                                {getFieldDecorator(`price-${i}`, {
                                                        initialValue: selectedItem.events[i].price ? selectedItem.events[i].price : '',
                                                        rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please input price!',
                                                        }
                                                        ],
                                                    })
                                                (<InputNumber name="price" onChange={(e) => this.handleItemChange({target:{name:'price', value:e, index: i}})}/>)}$
                                            </Form.Item>
                                        </Col>
                                        <Col span={11}>
                                            <Form.Item label="Description" className="full-width">           
                                                {getFieldDecorator(`description-${i}`, {
                                                        initialValue: selectedItem.events[i].description ? selectedItem.events[i].description : '',
                                                        rules: [
                                                        {
                                                            required: true,
                                                            message: 'Please Description!',
                                                        },
                                                        { min: 10, message: 'Description must be minimum 10 characters.' }
                                                        ],
                                                    })
                                                (<TextArea rows={5} name="description" onChange={(v) => this.handleItemChange({target:{name:'description', value:v.target.value, index: i}})} />)}
                                            </Form.Item>
                                        </Col>
                                    </Row>                             
                                </Row>                        
                            </Form>
                        )}                    
                    <Row>
                        <Button style={{float:'right'}} onClick={this.addEvent}>Add More Events</Button>
                    </Row>                    
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