import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { Row, Input, Form, InputNumber, Col, Menu, Icon, Dropdown } from 'antd';
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

const menu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index}>{d}</Menu.Item>)}            
        </Menu>  
    )
}

const { TextArea } = Input;

const Step1Item = props => {    
    const { getFieldDecorator, getFieldsError, isFieldTouched } = props.form;
    const { handleItemChange, handleCategoryClick, handleSubCategoryClick, 
            categories, subCategories } = props;

    const [selectedCategory, setSelectedCategory] = useState('');
    const onSetSelectedCategory = (value) => {
        setSelectedCategory(value.item.props.data[value.key]), handleCategoryClick(value)
    };
        
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const onSetSelectedSubCategory = (value) => {
        setSelectedSubCategory(value.item.props.data[value.key]), handleSubCategoryClick(value)
    };

    return (
        <React.Fragment>
            <Row className="step1-content">
                <Col span={12}>
                    <Form {...formItemLayout}>
                        <Form.Item label="Name">           
                            {getFieldDecorator('itemName', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Please input Retreat Name!',
                                    },
                                    { min: 4, message: 'Name must be minimum 4 characters.' }
                                    ],
                                })
                            (<Input name="itemName" onChange={handleItemChange}/>)}
                        </Form.Item>
                        <Form.Item label="Title">           
                            {getFieldDecorator('itemTitle', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Please input Retreat Title!',
                                    },
                                    { min: 4, message: 'Title must be minimum 4 characters.' }
                                    ],
                                })
                            (<Input name="itemTitle" onChange={handleItemChange}/>)}
                        </Form.Item>
                        <Form.Item label="Category" className="category">           
                                {getFieldDecorator('itemCategory', {
                                        rules: [
                                        {
                                            required: true
                                        }
                                        ],
                                    })
                            (<Dropdown.Button className="itemCategory-btn" name="itemCategory" overlay={menu(categories, onSetSelectedCategory, 'selectedCategory')}>{selectedCategory && selectedCategory.length > 0 ? selectedCategory : 'Select Item Category'}</Dropdown.Button>)}
                        </Form.Item>
                    </Form>
                </Col>

                <Col span={12}>
                    <Form {...formItemLayout}>
                        <Form.Item label="Description" className="description">           
                            {getFieldDecorator('itemDescription', {
                                    rules: [
                                    {
                                        required: true,
                                        message: 'Please input Retreat Description!',
                                    },
                                    { min: 10, message: 'Description must be minimum 10 characters.' }
                                    ],
                                })
                            (<TextArea rows={5} name="itemDescription" onChange={handleItemChange} />)}
                        </Form.Item>

                        <Form.Item label="SubCategory" className="subcategory">           
                                {getFieldDecorator('itemSubCategory', {
                                        rules: [
                                        {
                                            required: true
                                        }
                                        ],
                                    })
                                (<Dropdown.Button name="itemSubCategory" overlay={menu(subCategories, onSetSelectedSubCategory, 'selectedSubCategory')}>{selectedSubCategory && selectedSubCategory.length > 0 ? selectedSubCategory : 'Select Subcategory'}</Dropdown.Button>)}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </React.Fragment>
    )
}

Step1Item.propTypes = {  
    handleItemChange: PropTypes.func.isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
    handleSubCategoryClick: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    subCategories: PropTypes.array.isRequired
};

const mapDispatchToProps = {    
}; 

export default withLocalize(connect(null, mapDispatchToProps)(Step1Item));