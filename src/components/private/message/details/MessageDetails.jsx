import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Col, Button, Table, Input } from 'antd';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions, messageActions, itemActions } from '../../../../store/action';
import { withLocalize } from "react-localize-redux";
import './index.css'
import { Loader } from '../../../common';
import moment from 'moment';
import RetreatPhotoAlbum from '../../../public/retreat/RetreatPhotoAlbum';
  
const MessageDetails = props => {
  
    const columns = [
      {
        key: 'action1',
        render: (text, record) => (
          <Row>
            <Col span={3}>
              <img style={{borderRadius:'50%', width: 35}} src="https://a0.muscache.com/defaults/user_pic-225x225.png?v=3"/>
            </Col>
          </Row>
        )
      },
      {
        title: (text, record) => <Row><Col span={24}>Details</Col></Row>,
        className: ['wide', 'center'],
        key: 'action2',
        render: (text, record) => (
          <>
            <Row>
              <Col style={{textAlign:'left'}}>
                <b>{`${record.owner.firstName} ${record.owner.lastName}`}</b>
                <span style={{marginLeft:10}}><b>{moment(record.createdAt).format('DD-MM-YYYY HH:mm')}</b></span>
              </Col>
            </Row>

            <Row>
              <Col span={6} style={{textAlign:'left'}}>
                {record.content}
              </Col>
            </Row>
          </>
        )
      }
    ];

    useEffect(()=> {
        // initial data load
        props.fetchMessagesByGroupID(props.messageGroupId);

        if(props.itemID && (typeof parseInt(props.itemID) === "number")){
          // load item details
          props.fetchByID(parseInt(itemID));
        }

        // update every 1.5 min
        const interval = setInterval(() => 
          props.fetchMessagesByGroupID(props.messageGroupId), 5000);

        return () => {
          clearInterval(interval);
        };
    }, []);

    const [message, setMessage] = useState('');
    const reply = () => {
      if(message && message.length > 0){
        setMessage(''); // clear messages
        props.createMessage(message, props.messageGroupId);        
      }      
    };

    const footerSection = () => 
      <Row>
        <Col span={4}>
          <span>Reply Message:</span>
        </Col>       

        <Col span={12}>
          <Input placeholder="Type Your Message Here" value={message} onChange={(e) => setMessage(e.target.value)}/>
        </Col>       

        <Col span={2} offset={1}>
          <Button onClick={() => reply()}>Send</Button>
        </Col> 
      </Row>

    const headerSection = () => 
      <Row>
        <Col span={24} className="center">
            <span>Communication With: <b>{props.recipient}</b></span>
        </Col>
      </Row>

    const {isLoading, itemID, item} = props;

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
                  { item 
                      &&
                    <>
                      <Row>
                        <Col span={24}>
                          <img src={item ? item.picture : ''} style={{width:'90%'}}/>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="center">
                          <h3>{item.name}</h3>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="left">
                          <h4>{`Description: ${item.description}`}</h4>
                        </Col>
                      </Row>
                    </>
                  }
                </Col>             
            </Row>
            {
                isLoading && <Loader text=""/>
            }
        </Fragment>
    )
}

const mapDispatchToProps = { 
  ...itemActions,
  ...commonActions,
  ...messageActions
}; 

function mapStateToProps(state) {
  return {
      states  : state.common.messageStates,
      messageDetails: state.message.messages,
      isLoading: state.common.isLoading,
      item: state.items.item
  };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(MessageDetails));