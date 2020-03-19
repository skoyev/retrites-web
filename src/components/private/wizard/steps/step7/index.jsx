import React from 'react';
import { Row, Col, Form, Upload, message, Button } from 'antd';
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

class Step7Item extends React.Component {

    constructor(props){
        super(props); 
        this.state = {
            fileList: [],
            uploading: false
        }
    }

    componentDidMount() {
        this.props.onRef(this);  
    }

    cancel = () => {
        //this.props.form.setFieldsValue({itemName: ''})
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
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { selectedItem } = this.props;
        const { index, uploading, fileList } = this.state;

        const props = {
            onRemove: file => {
              this.props.setSelectedItemField('picture', {});
              this.setState(state => {
                const index = state.fileList.indexOf(file);
                const newFileList = state.fileList.slice();
                newFileList.splice(index, 1);
                return {
                  fileList: newFileList,
                };
              });
            },
            beforeUpload: file => {        
                this.props.setSelectedItemField('picture', file);
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));

                return false;
            },
            fileList,
        };        

        return (
            <React.Fragment>
                <Form {...formItemLayout}>
                    <Row className="step2-content">
                        <Col span={12}>                        
                            <Form.Item label="Picture">           
                                <Upload {...props}>
                                    <Button>
                                        <UploadOutlined /> Select Picture File
                                    </Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        { selectedItem.picture &&
                            <Col span={12}>
                                <Form.Item label="Existing Picture">           
                                    <img src={selectedItem.picture} style={{width: '150px'}}/>
                                </Form.Item>
                            </Col>
                        }
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

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step7Item));