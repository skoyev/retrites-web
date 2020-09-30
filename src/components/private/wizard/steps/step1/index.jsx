import React from 'react';
import { Row, Input, Form, Col, Menu, Dropdown } from 'antd';
import { withLocalize } from "react-localize-redux";
import { connect } from 'react-redux';
import {commonActions, itemActions} from '../../../../../store/action'
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
        this.checkIsStepValid = this.checkIsStepValid.bind(this);
        this.state = {
            itemNameError: ''
        }
    }

    componentDidMount() {
        //this.props.fetchCategories();
        //this.props.fetchSubCategories();   
        this.props
        .fetchCategories()
        .then(({data:{data:[{id}]}}) => this.props.fetchSubCategories(id));    

        this.props.onRef(this);  
        this.checkIsStepValid();                           
    }

    cancel = () => {
        this.props.form.setFieldsValue({itemName: ''})
        this.props.form.setFieldsValue({itemTitle: ''})
        this.props.form.setFieldsValue({itemDescription: ''})
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
        if (this.props.selectedItem.name !== prevProps.selectedItem.name ||
                this.props.selectedItem.title !== prevProps.selectedItem.title ||
                this.props.selectedItem.category !== prevProps.selectedItem.category ||
                    this.props.selectedItem.description !== prevProps.selectedItem.description) {
            const { selectedItem } = this.props;
            this.checkIsStepValid();                        
            this.props.form.setFieldsValue({itemName: selectedItem ? selectedItem.name : ''})
            this.props.form.setFieldsValue({itemTitle: selectedItem ? selectedItem.title : ''})
            this.props.form.setFieldsValue({itemDescription: selectedItem ? selectedItem.description : ''})    
        }
    }  
    
    checkIsStepValid = () => {
        const { getFieldsError, isFieldTouched, getFieldDecorator } = this.props.form;
        let {selectedItem} = this.props;

        // check name error validation
        let hasNameErrors = !( (isFieldTouched('itemName') === true || selectedItem.name) 
                                    && getFieldsError().itemName === undefined);
        // check title error validation
        let hasTitleErrors = !( (isFieldTouched('itemTitle') === true || selectedItem.title) 
                                    && getFieldsError().itemTitle === undefined);

        // check description error validation
        let hasDescriptionErrors = !( (isFieldTouched('itemDescription') === true || selectedItem.description) 
                                    && getFieldsError().itemDescription === undefined);

        // check category error validation
        let hasCategoryErrors = !(isFieldTouched('itemCategory') === true || selectedItem.category);

        //check if same item name is already exist - give warning
        if(!hasNameErrors && isFieldTouched('itemName') && isFieldTouched('itemName') == true){
            this.props.isItemExistWithName(selectedItem.name)
                .then(({data:{items:[item]}}) => {
                    if(item){
                        this.setState({itemNameError:'This item name is already exist!'})
                    } else {
                        this.setState({itemNameError:''})
                    }
                    hasNameErrors = item != undefined;
                    this.props.setIsNextStepValid(!hasNameErrors && !hasTitleErrors && !hasDescriptionErrors && !hasCategoryErrors);            
                });
        } else {       
            this.props.setIsNextStepValid(!hasNameErrors && !hasTitleErrors && !hasDescriptionErrors && !hasCategoryErrors);            
        }
    }

    render() {
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { categories, subCategories, selectedItem } = this.props;
        const { itemNameError } = this.state;

        /*
        const pageObj = { name: '', title: '', category: '', description: '', subCategory: {}, category: {} };
        const [pageState, setPageState] = useState(pageObj);

        const handleItemChange = e => {   
            const { name, value } = e.target;     
            setPageState(prevState => ({...prevState, [name]: value}));
        }
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
                                (<Input name="name" onChange={this.handleItemChange}/>)}
                                <span className="error">{itemNameError}</span>
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
                                (<Input name="title" onChange={this.handleItemChange}/>)}
                            </Form.Item>
                            <Form.Item label="Category" className="category">           
                                    {getFieldDecorator('itemCategory', {
                                            rules: [
                                            {
                                                required: true
                                            }
                                            ],
                                        })
                                (<Dropdown.Button className="itemCategory-btn" name="category" overlay={menu(categories, this.handleItemChange, 'category')}>{selectedItem && selectedItem.category ? selectedItem.category.name : 'Select Item Category'}</Dropdown.Button>)}
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
                                (<TextArea rows={5} name="description" onChange={this.handleItemChange} />)}
                            </Form.Item>

                            <Form.Item label="SubCategory" className="subcategory">           
                                    {getFieldDecorator('itemSubCategory', {
                                            rules: [
                                            {
                                                required: true
                                            }
                                            ],
                                        })
                                    (<Dropdown.Button name="subCategory" overlay={menu(subCategories, this.handleItemChange, 'subCategory')}>{selectedItem && selectedItem.subCategory ? selectedItem.subCategory.name : 'Select Item Sub Category'}</Dropdown.Button>)}
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

Step1Item.propTypes = {  
};

const mapDispatchToProps = {  
    ...commonActions,
    ...itemActions  
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