import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Button, Table, Input } from 'antd';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions, messageActions } from '../../../../store/action';
import { withLocalize } from "react-localize-redux";
import './index.css'
  
const MessageDetails = props => {
  
    const columns = [
      {
        key: 'action1',
        render: (text, record) => (
          <Row>
            <Col span={3}>
              {record.id}
            </Col>
          </Row>
        )
      },
      {
        title: () => <Row><Col span={24}>Details</Col></Row>,
        className: ['wide', 'center'],
        key: 'action2',
        render: (text, record) => (
          <Row>
            <Col span={6}>
              {record.content}
            </Col>
          </Row>
        )
      }
    ];

    useEffect(()=> {
        props.fetchMessagesByGroupID(props.messageGroupId);
    }, []);

    const footerSection = () => 
      <Row>
        <Col span={4}>
          <span>Reply Message:</span>
        </Col>       

        <Col span={12}>
          <Input placeholder="Type Your Message Here"/>
        </Col>       

        <Col span={2} offset={1}>
          <Button>Send</Button>
        </Col> 
      </Row>

    const headerSection = () => 
      <Row>
        <Col span={24} className="center">
            <span>Communication Details With: <b>{props.recipient}</b></span>
        </Col>
      </Row>


    return (
        <Fragment>
            <Row className="header">
              <Col span={2} className="label">
                <Translate>{({ translate }) => <Button onClick={() => props.backToMessageFromDetails()}>{translate("label.back")}</Button>}</Translate>
              </Col>
            </Row>
            <Row>
                <Col span={16}>
                  <Table
                        columns={columns} 
                        key="message-details"
                        rowKey="id"
                        title={ headerSection }
                        footer={ footerSection }
                        pagination={{defaultPageSize:5, hideOnSinglePage: true, simple: true}}
                        dataSource={props.messageDetails} />
                </Col>
                <Col span={8}>
                   Section 2
                </Col>             
            </Row>
        </Fragment>
    )
}

const mapDispatchToProps = { 
  ...commonActions,
  ...messageActions
}; 

function mapStateToProps(state) {
  return {
      states  : state.common.messageStates,
      messageDetails: state.message.messages
  };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(MessageDetails));