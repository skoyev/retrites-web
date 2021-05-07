import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Input, Dropdown, Table, Button } from 'antd';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions, messageActions } from '../../../store/action';
import { withLocalize } from "react-localize-redux";
import './index.css'
import { typeMenu } from '../../common';

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
  const { states, messageGroups, handleViewMessage, handleDeleteMessage, messagePageNum, user } = props;

  const [name, setName] = useState('');
  const [selectedState, setSelectedState] = useState({});
  const [pageNum, setPageNum] = useState(0);
  const getRecipientName = (record) => {
    return user.firstName == record.recipient.firstName &&
      user.lastName == record.recipient.lastName ?
      `${record.owner.firstName} ${record.owner.lastName}` :
      `${record.recipient.firstName} ${record.recipient.lastName}`;
  }

  const columns = [
    {
      title: 'Recipient Name',
      dataIndex: '',
      render: record => <a>{getRecipientName(record)}</a>,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
    },
    {
      title: <Translate>{({ translate }) => <span>{translate("label.total_messages")}</span>}</Translate>,
      render: record => (
        <Row style={{ paddingLeft: 20 }}>
          <span>{record.message_total_count}</span> {record.message_new_count && '/' + <span style={{ color: 'red' }}>{record.message_new_count}</span>}
        </Row>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Row>
          <Col span={6}>
            <Button key={record.id} type="link" onClick={() => handleViewMessage({ id: record.id, pageNum: pageNum, recipient: getRecipientName(record), itemID: record.item.id })}>View</Button>
          </Col>
          <Col span={6}>
            <Button key={record.id} type="link" onClick={() => handleDeleteMessage(record.id, getRecipientName(record))}>Delete</Button>
          </Col>
        </Row>
      )
    }
  ];

  /*
  let onChangeDebounced = () => {
    props.fetchMessageGroups();
  };*/

  useEffect(() => {
    props.fetchMessageGroups();
    const interval = setInterval(() => props.fetchMessageGroups(), WAIT_INTERVAL);
    return () => clearInterval(interval)
  }, []);

  useEffect(() => {
    //clearTimeout(timer);
    //timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
  }, [selectedState, name]);

  return (
    <Fragment>
      <Row className="msg-header">
        <Col span={2} className="label">
          <Translate>{({ translate }) => <span>{translate("label.name")}</span>}</Translate>
        </Col>
        <Col span={3}>
          <Input onChange={(v) => setName(v.target.value)} />
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
          className="message"
          onChange={(page, pageSize) => { setPageNum(page.current) }}
          pagination={{ defaultPageSize: 5, hideOnSinglePage: true, simple: true, defaultCurrent: messagePageNum }}
          dataSource={messageGroups} />
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
    states: state.common.messageStates,
    messageGroups: state.message.messageGroups,
    user: JSON.parse(sessionStorage.getItem('user'))
  };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Message));