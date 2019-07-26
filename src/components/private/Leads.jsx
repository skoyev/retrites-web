import React from 'react';
import PropTypes from 'prop-types'
import { Row, Table } from 'antd';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
];
  
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
};

const Leads = ({items}) => {

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
    items: PropTypes.array.isRequired  
}

export default Leads;