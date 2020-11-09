import React, { useEffect, useState } from 'react';
import { Row, Col, Input, Table, Button } from 'antd';
import { commonActions } from '../../../store/action';
import './index.css'
import { connect } from 'react-redux';
import { Translate } from "react-localize-redux";
import { getRoleByID } from '../../../helpers';
import moment from 'moment';

const Users = props => {

    const WAIT_INTERVAL = 1500;

    const changeStatus = (id, status) => {
        props.updateUser(id, status)
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
          title: 'First Name',
          dataIndex: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'emailAddress'
        },
        {
            title: 'Created',
            dataIndex: 'createdAt',
            render: createdAt => <span>{moment(createdAt).format("YYYY-MM-DD")}</span>
        },
        {
            title: 'Billing Created',
            dataIndex: 'billing.createdAt',
            render: createdAt => <span>{moment(createdAt).format("YYYY-MM-DD")}</span>
        },
        {
            title: 'Billing Expired',
            dataIndex: 'billing.expiresAt',
            render: expiresAt => <span>{moment(expiresAt).format("YYYY-MM-DD")}</span>
        },
        {
            title: 'Status',
            dataIndex: 'active',
            render: active => <span className={`${active ? '' : 'warn'}`}>{active ? 'Active' : 'Inactive'}</span>
        },
        {
            title: 'Role',
            dataIndex: 'roleId',
            render: roleId => <span>{getRoleByID(roleId) ? getRoleByID(roleId).role : 'admin'}</span>
        },
        {
            title: 'Action',
            dataIndex: 'active',
            key: 'ActionKey',
            render: (text, record, index) => <Row>
                            {
                                record.active && 
                                <Col span={12}>
                                    <Button onClick={()=>changeStatus(record.id, 0)}>Inactivate</Button>
                                </Col>
                            }
                            {
                                !record.active && 
                                <Col span={12}>
                                    <Button onClick={()=>changeStatus(record.id, 1)}>Activate</Button>
                                </Col>
                            }
                        </Row>
        } 
    ];
                      
    useEffect(()=> {
        props.fetchUsers();
    }, []);

    let timer;

    const [name, setName] = useState('');

    let onChangeDebounced = () => {
        props.fetchUsersByName(name);
    };

    useEffect(()=> {        
        clearTimeout(timer);
        timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
    }, [name]);

    let {users} = props;

    return (
        <>
            <h4> Users </h4>
            <Row>
                <Col span={1}>
                    <Translate>{({ translate }) => <div style={{marginTop:5}}>{translate("label.name")}</div>}</Translate>                                       
                </Col>
                <Col span={5}>
                    <Input value={name} onChange={(v) => setName(v.target.value)}/>
                </Col>
            </Row>

            <Row style={{marginTop:20}}>
                <Table columns={columns} dataSource={users} rowKey={record => record.id}/>
            </Row>
        </>
    )
}

const mapDispatchToProps = { 
    ...commonActions
}; 

function mapStateToProps(state) {
    return {
        users: state.common.users
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
