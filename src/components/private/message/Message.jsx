import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Input, Dropdown, Table, Button } from 'antd';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions, messageActions } from '../../../store/action';
import { withLocalize } from "react-localize-redux";
import './index.css'
import { typeMenu } from '../../common';
import { Link } from 'react-router-dom';
import { page } from '../../../store/reducer/page.reducer';

const WAIT_INTERVAL = 2500;

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
  
const Message = props => {
    let timer;  
    const {states, messages, handleViewMessage, messagePageNum} = props;  

    const [name, setName] = useState('');
    const [selectedState, setSelectedState] = useState({});   
    const [pageNum, setPageNum] = useState(0);   

    const handleDeleteMessage = (e) => {
    }

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Age',
        dataIndex: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Row>
            <Col span={6}>
              <Button key={record.id} type="link" onClick={() => handleViewMessage({id:record.id, pageNum:pageNum})}>View</Button>
            </Col>
            <Col span={6}>
              <Button key={record.id} type="link" onClick={() => handleDeleteMessage()}>Delete</Button>
            </Col>
          </Row>
        )
      }
    ];    

    let onChangeDebounced = () => {
        //props.fetchItemsByNameStatus(selectedItem, selectedType.id);
    };
                      
    useEffect(()=> {
        //props.fetchItemTypes();
    }, []);

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
    }, [selectedState, name]);    

    return (
        <Fragment>
            <Row className="header">
              <Col span={2} className="label">
                <Translate>{({ translate }) => <span>{translate("label.name")}</span>}</Translate>                                        
              </Col>
              <Col span={3}>
                <Input onChange={(v) => setName(v.target.value)}/>
              </Col>
              <Col span={2} className="label">
                <Translate>{({ translate }) => <span>{translate("label.status")}</span>}</Translate>
              </Col>
              <Col span={2}>
                <Dropdown.Button id="type" overlay={typeMenu(states, (v) => setSelectedState(v.item.props.data[v.key]))}>
                    <span>{selectedState.name}</span>
                </Dropdown.Button>
              </Col>
            </Row>
            
            <Row>
              <Table rowSelection={rowSelection} 
                     columns={columns} 
                     key="messages"
                     rowKey="id"
                     onChange={(page, pageSize) => {setPageNum(page.current)}}
                     pagination={{defaultPageSize:5, hideOnSinglePage: true, simple: true, defaultCurrent:messagePageNum}}
                     dataSource={messages} />
            </Row>
        </Fragment>
    )
}

Message.propTypes = {  
}

const mapDispatchToProps = { 
  ...commonActions,
  ...messageActions
}; 

function mapStateToProps(state) {
  return {
      states  : state.common.messageStates,
      messages: state.message.messages
  };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Message));