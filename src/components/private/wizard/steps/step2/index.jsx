import React from 'react';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import { Row, Form, Input, Col, Dropdown, Menu } from 'antd';
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
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index} id={d.id}>{d.name}</Menu.Item>)}            
        </Menu>  
    )
}

class Step2Item extends React.Component {

    constructor(props) {
        super(props); 
    }

    componentDidMount() {
        this.props.fetchCountries();
        this.props.onRef(this);    
        this.props.setIsNextStepValid(this.props.selectedItem.country); 
    }

    cancel = () => {
        this.props.form.setFieldsValue({itemAddress: ''})
    }

    handleItemChange = e => {   
        let name  = '';
        let value = '';

        if(e.target){ 
            name  = e.target.name;     
            value = e.target.value;     
        } else if(e.item && e.item.props) {
            name  = e.item.props.name;     
            value = e.item.props.data.find(v => v.id === e.item.props.id);     
        }

        if(name.length > 0 && value){
            this.props.setSelectedItemField(name, value);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedItem.country !== prevProps.selectedItem.country ||
                this.props.selectedItem.city !== prevProps.selectedItem.city ||
                    this.props.selectedItem.address !== prevProps.selectedItem.address) {
            const { selectedItem } = this.props;
            this.checkIsStepValid();                        
            this.props.form.setFieldsValue({itemCountry: selectedItem ? selectedItem.country : ''})
            this.props.form.setFieldsValue({city: selectedItem ? selectedItem.city : ''})
            this.props.form.setFieldsValue({itemAddress: selectedItem ? selectedItem.address : ''})    
        }
    }
    
    checkIsStepValid = () => {
        const { getFieldsError, isFieldTouched, getFieldDecorator } = this.props.form;

        // check itemCountry error validation
        let hasCountryErrors = !( (isFieldTouched('itemCountry') === true || this.props.selectedItem.country) 
                                    && getFieldsError().itemCountry === undefined);
        // check city error validation
        let hasCityErrors = !( (isFieldTouched('city') === true || this.props.selectedItem.city) 
                                    && getFieldsError().city === undefined);

        // check address error validation
        let hasAddressErrors = !( (isFieldTouched('itemAddress') === true || this.props.selectedItem.address) 
                                    && getFieldsError().itemAddress === undefined);

        this.props.setIsNextStepValid(!hasCountryErrors && !hasCityErrors && !hasAddressErrors);            
    }

    /*
    useEffect(()=> {
        fetchCountries();
        this.props.onRef(this);     
    }, []);


    */

    render() {
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { countries, selectedItem, setSelectedItemField } = this.props;

        return (
            <React.Fragment>
                <Row className="step2-content">
                    <Col span={12}>
                        <div style={{marginBottom:20}}>Address Of The Amenity:</div>
                        <Form {...formItemLayout}>
                            <Form.Item label="Country" className="country">           
                                    {getFieldDecorator('itemCountry', {
                                            rules: [
                                            {
                                                required: true
                                            }
                                            ],
                                        })
                                (<Dropdown.Button className="itemCountry-btn" 
                                                name="country" 
                                                overlay={menu(countries, this.handleItemChange, 'country')}>
                                    {selectedItem && selectedItem.country ? selectedItem.country.name : 'Select Country'}
                                </Dropdown.Button>)}
                            </Form.Item>

                            <Form.Item label="City">           
                                {getFieldDecorator('city', {
                                        initialValue: selectedItem ? selectedItem.city : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input city!',
                                        },
                                        { min: 4, message: 'City must be minimum 4 characters.' }
                                        ],
                                    })
                                (<Input name="city" onChange={this.handleItemChange}/>)}
                            </Form.Item>

                            <Form.Item label="Address">           
                                {getFieldDecorator('itemAddress', {
                                        initialValue: selectedItem ? selectedItem.address : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input address!',
                                        },
                                        { min: 4, message: 'Address must be minimum 4 characters.' }
                                        ],
                                    })
                                (<Input name="address" onChange={this.handleItemChange}/>)}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

Step2Item.propTypes = {  
};

const mapDispatchToProps = {   
    ...commonActions   
}; 

function mapStateToProps(state) {
    return {
        countries: [...state.common.countries],
        selectedItem: state.common.selectedItem
    };
}


export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step2Item));