import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Menu, Dropdown, Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
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

const { TextArea } = Input;

class Step4Item extends React.Component {

    constructor(props, context){
        super(props); 
        this.state = {
            index: 0,
            fileList: [],
            uploading: false
        }
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);  
        this.props.fetchFacilitatorTypes();   
        const {selectedItem} = this.props;
        this.setState({
                facilitators: selectedItem && selectedItem.facilitators ? selectedItem.facilitators : []}, 
            () => {
                const {index} = this.state;
                const {facilitators} = this.props.selectedItem;        
                this.checkIsStepValid(facilitators[index])
            });
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
        } else if(e.item) {
            name  = e.item.props.name;     
            value = e.item.props.data[e.key];     
        } 

        const {index} = this.state;
        const {facilitators} = this.props.selectedItem;

        facilitators[index][name] = value;

        this.props.setSelectedItemField('facilitators', facilitators);

        this.checkIsStepValid(facilitators[index]);
    }

    checkIsStepValid = (facilitator) => {
        const { getFieldsError, isFieldTouched, getFieldDecorator } = this.props.form;

        // check facilitator name error validation
        let hasNameErrors = !( facilitator.name && facilitator.name.length > 4 );

        // check description error validation
        let hasDescriptionErrors = !( facilitator.description && facilitator.description.length >= 10 );

        // check type error validation
        let hasTypeErrors = !( facilitator.type );

        this.props.setIsNextStepValid(!hasNameErrors && 
                                        !hasDescriptionErrors && 
                                            !hasTypeErrors &&
                                                ((this.state.fileList && this.state.fileList.length > 0) || facilitator.picture));            
    }

    /*
    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        fileList.forEach(file => {
          formData.append('files[]', file);
        });
    
        this.setState({
          uploading: false
        });

        message.success('upload successfully.'); 
        
        console.log(formData);

        const {index, facilitators} = this.state;

        facilitators[index]['picture'] = formData;

        this.props.setSelectedItemField('facilitators', facilitators);
    } 
    */   

    render() {
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { selectedItem, types } = this.props;
        const { index, uploading, fileList } = this.state;

        const props = {
            onRemove: file => {
              const {index} = this.state;
              const {facilitators} = this.props.selectedItem;
              facilitators[index]['picture'] = undefined;

              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList
                };
              }, () => this.checkIsStepValid(facilitators[index]));
            },
            beforeUpload: file => {
                const {index} = this.state;
                const {facilitators} = this.props.selectedItem;
                const isValidType = file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("gif")

                if(isValidType) {
                    facilitators[index]['picture'] = file;        
                    this.props.setSelectedItemField('facilitators', facilitators);
                    this.setState(state => ({
                        fileList: [...state.fileList, file]
                    }), () => this.checkIsStepValid(facilitators[index]));
                }

                return false;
            },
            fileList,
        };      
        
        const pic = selectedItem.facilitators[index].picture;

        return (
            <React.Fragment>
                <Row className="step2-content">
                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Name">           
                                {getFieldDecorator('name', {
                                        initialValue: selectedItem.facilitators && selectedItem.facilitators.length > 0 ? selectedItem.facilitators[index].name : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please input fascilitator name!',
                                        },
                                        { min: 4, message: 'Name must be minimum 4 characters.' }
                                        ],
                                    })
                                (<Input name="name" onChange={this.handleItemChange}/>)}
                            </Form.Item>
                            
                            <Form.Item label="Type">           
                                    {getFieldDecorator('type', {
                                            rules: [
                                            {
                                                required: true
                                            }
                                            ],
                                        })
                                (<Dropdown.Button className="itemCountry-btn" 
                                                name="type" 
                                                overlay={menu(types, this.handleItemChange, 'type')}>
                                    {selectedItem && selectedItem.facilitators 
                                                  && selectedItem.facilitators.length > 0 
                                                  && selectedItem.facilitators[index].type ? 
                                        selectedItem.facilitators[index].type.name : 'Select Type'}
                                </Dropdown.Button>)}
                            </Form.Item>

                            <Form.Item label="Picture">
                                <Row>
                                    <Col span={12}>
                                        <Upload {...props}>
                                            <Button>
                                                <UploadOutlined /> Select File (jpeg, gif, png)
                                            </Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Form.Item>

                        </Form>
                    </Col>

                    <Col span={12}>
                        <Form {...formItemLayout}>
                            <Form.Item label="Description" className="description">           
                                {getFieldDecorator('description', {
                                        initialValue: selectedItem && selectedItem.facilitators && selectedItem.facilitators.length > 0 ? selectedItem.facilitators[index].description : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please Description!',
                                        },
                                        { min: 10, message: 'Description must be minimum 10 characters.' }
                                        ],
                                    })
                                (<TextArea rows={5} name="description" onChange={this.handleItemChange} />)}
                            </Form.Item>

                            {
                                selectedItem && 
                                selectedItem.facilitators && 
                                selectedItem.facilitators[index] &&
                                selectedItem.facilitators[index].picture &&
                                <Form.Item label="Selected Picture" className="picture">
                                    <Row>
                                        <img src={pic instanceof File ? window.URL.createObjectURL(pic) : pic} style={{width:'60%'}}/>
                                    </Row>
                                </Form.Item>
                            }
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
        types: [...state.common.fascilitatorTypes]
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step4Item));