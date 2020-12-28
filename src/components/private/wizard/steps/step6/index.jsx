import React from 'react';
import { Row, Col, Form, Button, Upload, Input } from 'antd';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
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

const { TextArea } = Input;
class Step6Item extends React.Component {

    constructor(props, context){
        super(props); 
        this.state = {
            fileList: [],
            uploading: false,
            pictureSelected: false
        }
    }

    componentDidMount() {
        this.props.onRef(this);  
        this.checkIsStepValid(this.props.selectedItem.accomodation);
    }

    checkIsStepValid = (accomodation) => {
        const { getFieldsError, isFieldTouched } = this.props.form;

        // check document details error validation
        let hasdetailsErrors = !( accomodation && accomodation.details && accomodation.details.length >= 4 && getFieldsError().details === undefined );

        this.props.setIsNextStepValid( !hasdetailsErrors && 
                                            (this.state.pictureSelected || accomodation.picture));            
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

        const {accomodation} = this.props.selectedItem;

        accomodation[name] = value;

        if(name.length > 0 && value){
            this.props.setSelectedItemField('accomodation', accomodation);
        }

        this.checkIsStepValid(accomodation);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { selectedItem } = this.props;
        const { fileList } = this.state;

        const props = {
            onRemove: file => {
              const {accomodation} = this.props.selectedItem;
              accomodation.picture = undefined;
        
              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                  pictureSelected: false
                };
              }, () => this.checkIsStepValid(this.props.selectedItem.accomodation));
            },
            beforeUpload: file => {
                const isValidType = file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("gif")
                if(isValidType) {
                    const {accomodation} = this.props.selectedItem;
                    accomodation.picture = file;
      
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                        pictureSelected: true
                    }), () => this.checkIsStepValid(this.props.selectedItem.accomodation));
                }    
                
                return false;
                
            },
            fileList,
        }; 
        const pic = selectedItem.accomodation.picture;

        return (
            <React.Fragment>
                <Form {...formItemLayout}>
                    <Row className="step2-content">
                        <Col span={12}>                        
                            <Form.Item label="Details" className="full-width">           
                                {getFieldDecorator(`details`, {
                                        initialValue: selectedItem.accomodation && selectedItem.accomodation.details ? selectedItem.accomodation.details : '',
                                        rules: [
                                        {
                                            required: true,
                                            message: 'Please details!',
                                        },
                                        { min: 10, message: 'details must be minimum 10 characters.' }
                                        ],
                                    })
                                (<TextArea rows={5} name="details" onChange={(v) => this.handleItemChange({target:{name:'details', value:v.target.value}})} />)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={18}>  
                            <Form.Item label="Picture" className="ant-form-item">
                                { selectedItem.accomodation &&
                                <Row>
                                    <Col span={12}>
                                        <img src={pic instanceof File ? window.URL.createObjectURL(pic) : pic} style={{width:'60%'}}/>
                                    </Col>
                                </Row>
                                }
                                <Row>
                                    <Col span={12}>

                                        <Upload {...props}>
                                            <Button>
                                                <UploadOutlined /> <label>Select Picture File (jpeg, gif, png)</label>
                                            </Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Form.Item>                                            
                        </Col>
                    </Row>
                </Form>
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