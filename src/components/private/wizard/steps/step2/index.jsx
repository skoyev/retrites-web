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

const Step2Item = props => {    
    const { getFieldDecorator, getFieldsError, isFieldTouched } = props.form;
    const { handleItemChange, countries, fetchCountries, handleCountryClick, selectedItem } = props;

    useEffect(()=> fetchCountries(), []);

    const [selectedCountry, setSelectedCountry] = useState(selectedItem ? selectedItem.country : {});
    const onSetSelectedCountry = (value) => {
        setSelectedCountry(value.item.props.data[value.key]), handleCountryClick(value)
    };

    return (
        <React.Fragment>
            <Row className="step2-content">
                <Col span={12}>
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
                                              name="itemCountry" 
                                              overlay={menu(countries, onSetSelectedCountry, 'selectedCountry')}>
                                {selectedCountry && selectedCountry.name ? selectedCountry.name : 'Select Country'}
                            </Dropdown.Button>)}
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
                            (<Input name="itemAddress" onChange={handleItemChange}/>)}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

Step2Item.propTypes = {  
    handleItemChange: PropTypes.func.isRequired,
    handleCountryClick: PropTypes.func.isRequired
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