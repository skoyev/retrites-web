import React, {useState} from 'react';
import PropTypes from 'prop-types'
import { Row, Input, Form, InputNumber, Col, Menu, Icon, Dropdown } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import {commonActions} from '../../../../../store/action'
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

const { TextArea } = Input;

class Step1Item extends React.Component {

    constructor(props, context){
        super(props); 
        this.state = {
            selectedCategory: this.props.selectedItem && this.props.selectedItem.category 
                                ? this.props.selectedItem.category.name : '',
            selectedSubCategory: this.props.selectedItem && this.props.selectedItem.subCategory 
                                ? this.props.selectedItem.subCategory.name : ''
        }
    }

    componentDidMount() {
        this.props.fetchCategories();
        this.props.fetchSubCategories();
    }

    onSetSelectedCategory = (e) => {
        const{categories} = this.props;
        this.setState({selectedCategory : categories.filter(s => s.id === e.item.props.id)[0].name})
        this.props.handleCategoryClick(e);
    }

    onSetSelectedSubCategory = (e) => {
        const{subCategories} = this.props;
        this.setState({selectedSubCategory : subCategories.filter(s => s.id === e.item.props.id)[0].name})
        this.props.handleSubCategoryClick(e);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedItem !== this.props.selectedItem){
            this.setState({ selectedCategory : nextProps.selectedItem && nextProps.selectedItem.category 
                                                ? nextProps.selectedItem.category.name : '', 
                            selectedSubCategory : nextProps.selectedItem && nextProps.selectedItem.subCategory 
                                                ? nextProps.selectedItem.subCategory.name : ''})
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { handleItemChange, handleCategoryClick, handleSubCategoryClick, 
                categories, subCategories, selectedItem } = this.props;
        const {selectedCategory, selectedSubCategory} = this.state;

        //console.log(selectedItem);

        /*
        const [selectedCategory, setSelectedCategory] = useState('');
        const onSetSelectedCategory = (value) => {
            setSelectedCategory(value.item.props.data[value.key]), handleCategoryClick(value)
        };
            
        const [selectedSubCategory, setSelectedSubCategory] = useState('');
        const onSetSelectedSubCategory = (value) => {
            setSelectedSubCategory(value.item.props.data[value.key]), handleSubCategoryClick(value)
        };
        */

        return (
            <React.Fragment>
                <Row className="step1-content">
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Name">           
                                {getFieldDecorator('itemName', {
                                        initialValue: selectedItem ? selectedItem.name : '',
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
                                        initialValue: selectedItem ? selectedItem.title : '',
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
                                (<Dropdown.Button className="itemCategory-btn" name="itemCategory" overlay={menu(categories, this.onSetSelectedCategory, 'selectedCategory')}>{selectedCategory && selectedCategory.length > 0 ? selectedCategory : 'Select Item Category'}</Dropdown.Button>)}
                            </Form.Item>
                        </Form>
                    </Col>

                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Description" className="description">           
                                {getFieldDecorator('itemDescription', {
                                        initialValue: selectedItem ? selectedItem.description : '',
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
                                    (<Dropdown.Button name="itemSubCategory" overlay={menu(subCategories, this.onSetSelectedSubCategory, 'selectedSubCategory')}>{selectedSubCategory && selectedSubCategory.length > 0 ? selectedSubCategory : 'Select Subcategory'}</Dropdown.Button>)}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

Step1Item.propTypes = {  
    handleItemChange: PropTypes.func.isRequired,
    handleCategoryClick: PropTypes.func.isRequired,
    handleSubCategoryClick: PropTypes.func.isRequired,
    categories: PropTypes.array.isRequired,
    subCategories: PropTypes.array.isRequired
};

const mapDispatchToProps = {  
    ...commonActions  
}; 

function mapStateToProps(state) {
    return {
        user : JSON.parse(sessionStorage.getItem('user')),
        categories: [...state.common.categories],
        subCategories: [...state.common.subCategories],
        selectedItem: state.common.selectedItem
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step1Item));