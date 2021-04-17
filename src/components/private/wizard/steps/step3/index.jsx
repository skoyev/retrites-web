import React from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Form, Input, Upload, Button, } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions } from '../../../../../store/action';
import './style.css';
import globalTranslations from "../../../../../translations/global.json";

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

class Step3Item extends React.Component {

    constructor(props, context) {
        super(props);
        this.state = {
            fileList: [],
            uploading: false,
            docPictureSelected: false
        }
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    componentDidMount() {
        this.props.onRef(this);
        this.setState({ document: this.props.selectedItem.document ? this.props.selectedItem.document : {} })
        this.props.setIsNextStepValid(this.props.selectedItem.document && this.props.selectedItem.document.name);
    }

    checkIsStepValid = (document) => {
        const { getFieldsError, isFieldTouched, getFieldDecorator } = this.props.form;

        // check document name error validation
        let hasNameErrors = !((isFieldTouched('name') === true && document.name.length > 4 && getFieldsError().name === undefined));

        // check document details error validation
        let hasDetailsErrors = !(document && document.details && document.details.length >= 4 && getFieldsError().details === undefined);

        this.props.setIsNextStepValid(!hasNameErrors &&
            !hasDetailsErrors &&
            this.state.docPictureSelected);
    }

    cancel = () => {
        this.props.form.setFieldsValue({ name: '' })
        this.props.form.setFieldsValue({ details: '' })
    }

    handleItemChange = e => {
        let name = '';
        let value = '';

        if (e.target) {
            name = e.target.name;
            value = e.target.value;
        }

        const { document } = this.props.selectedItem;

        document[name] = value;

        this.setState({ document: document })

        if (name.length > 0 && value) {
            this.props.setSelectedItemField('document', document);
        }

        this.checkIsStepValid(document);
    }

    handleUpload = () => {
    }

    render() {
        const { getFieldDecorator, getFieldsError, isFieldTouched } = this.props.form;
        const { selectedItem } = this.props;
        const { uploading, fileList } = this.state;

        const props = {
            onRemove: file => {
                const { document } = this.props.selectedItem;
                document.picture = undefined;

                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                        docPictureSelected: false
                    };
                }, () => this.checkIsStepValid(this.props.selectedItem.document));
            },
            beforeUpload: file => {
                const isValidType = file.type.includes("png") || file.type.includes("jpeg") || file.type.includes("gif")
                if (isValidType) {
                    const { document } = this.props.selectedItem;
                    document.picture = file;

                    this.setState(state => ({
                        //fileList: [...state.fileList, file], // multiple files
                        fileList: [...new Array(file)], // just 1 file
                        docPictureSelected: true
                    }), () => this.checkIsStepValid(this.props.selectedItem.document));
                }

                return false;

            },
            fileList,
        };
        const pic = selectedItem.document ? selectedItem.document.picture : "";

        return (
            <React.Fragment>
                <Row className="step3-content">
                    <Row className="description">
                        <Col span={12}>
                            <Translate>{({ translate }) => <span className="font-description">{translate("wizard.step3")}</span>}</Translate>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={12}>
                            <Form {...formItemLayout}>
                                <Form.Item label="Name">
                                    {getFieldDecorator('name', {
                                        initialValue: selectedItem && selectedItem.document ? selectedItem.document.name : '',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input document name!',
                                            },
                                            { min: 4, message: 'Name must be minimum 4 characters.' }
                                        ],
                                    })
                                        (<Input name="name" onChange={this.handleItemChange} />)}
                                </Form.Item>

                                <Form.Item label="Details">
                                    {getFieldDecorator('details', {
                                        initialValue: selectedItem && selectedItem.document ? selectedItem.document.details : '',
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input document details!',
                                            },
                                            { min: 4, message: 'Details must be minimum 4 characters.' }
                                        ],
                                    })
                                        (<Input name="details" onChange={this.handleItemChange} />)}
                                </Form.Item>
                            </Form>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Document Picture" className="ant-form-item-required upload-text">
                                {selectedItem.document &&
                                    <Row>
                                        <Col span={12}>
                                            <img className="upload-image" src={pic instanceof File ? window.URL.createObjectURL(pic) : pic} />
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
                </Row>
            </React.Fragment>
        )
    }
}

Step3Item.propTypes = {
};

const mapDispatchToProps = {
    ...commonActions
};

function mapStateToProps(state) {
    return {
        selectedItem: state.common.selectedItem,
        translation: globalTranslations
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Step3Item));