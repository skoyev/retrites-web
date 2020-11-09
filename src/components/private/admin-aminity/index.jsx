import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Table, Button } from 'antd';
import { commonActions, itemActions } from '../../../store/action';
import './index.css'
import { connect } from 'react-redux';
import { Translate } from "react-localize-redux";

const AdminAminity = props => {

    const changeStatus = (id, statusID) => {
        props.updateItemStatus(id, statusID);
    }

    const getItemStatus = (status) => {
        let statusStr = '';
        switch (status) {
            case 1:
                statusStr = 'Created';
                break;
            case 2:
                statusStr = 'Published';
                break;
            case 3:
                statusStr = 'Rejected';
                break;
                    
        }
        return statusStr;
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => <span>{getItemStatus(status)}</span>
        },
        {
            title: 'Owner',
            render: (text, record, index) => <span>{`ID: ${record.owner.id} - ${record.owner.firstName} ${record.owner.lastName}`}</span>
        },
        {
            title: 'Action',
            key: 'ActionKey',
            render: (text, record, index) => <Row>
                            {
                                record.status != 2 && 
                                <Col span={6}>
                                    <Button onClick={()=>changeStatus(record.id, 2)}>Publish</Button>
                                </Col>
                            }
                            {
                                record.status != 3 && 
                                <Col span={6}>
                                    <Button onClick={()=>changeStatus(record.id, 3)}>Reject</Button>
                                </Col>
                            }
                        </Row>
        }
    ];

    const WAIT_INTERVAL = 1500;

    let timer;
    const [name, setName] = useState('');
                      
    useEffect(()=> {
        props.fetchAllItems();
    }, []);

    let onChangeDebounced = () => {
        props.fetchItemsByName(name);
    };

    useEffect(()=> {        
        clearTimeout(timer);
        timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
    }, [name]);

    let {items} = props;

    return (
        <>
            <h4> Items </h4>
            <Row>
                <Col span={1}>
                    <Translate>{({ translate }) => <div style={{marginTop:5}}>{translate("label.name")}</div>}</Translate>                                       
                </Col>
                <Col span={5}>
                    <Input value={name} onChange={(v) => setName(v.target.value)}/>
                </Col>
            </Row>

            <Row style={{marginTop:20}}>
                <Table columns={columns} dataSource={items} rowKey={record => record.id}/>
            </Row>
        </>
    )
}

const mapDispatchToProps = { 
    ...commonActions,
    ...itemActions
}; 

function mapStateToProps(state) {
    return {
        items: state.items.items
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAminity);
