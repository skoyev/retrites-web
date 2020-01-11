import React from 'react';
import PropTypes from 'prop-types'
import { Row, Table, Icon, Divider } from 'antd';
import moment from 'moment';
  
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
};

const Leads = ({items, handleLeadDelete, handleLeadEdit}) => {

  const columns = [
    {
      title: '#',      
      render: (text,record) => items.indexOf(record) > -1 ? items.indexOf(record) + 1 : '',
    },

    {
      title: 'Lead Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Message Date Posted',
      dataIndex: 'createdAt',
      render: text => moment(text).format('MMMM Do YYYY, h:mm:ss a'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span style={{textAlign: 'center'}}>
          <Icon onClick={()=>handleLeadEdit(record)} type="edit" />        
          <Divider type="vertical" />
          <Icon onClick={()=>handleLeadDelete(record)} type="delete" />        
        </span>
      ),
    }
  ];


    return (
        <div>
            <Row>
                <Table rowSelection={rowSelection} 
                       columns={columns} 
                       dataSource={items} />
            </Row>
        </div>
    )
}

Leads.propTypes = {  
    items: PropTypes.array.isRequired,
    handleLeadDelete:  PropTypes.func.isRequired,
    handleLeadEdit:  PropTypes.func.isRequired
}

export default Leads;