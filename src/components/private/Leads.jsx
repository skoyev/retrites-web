import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Table, Divider, Col, Input, Dropdown, Menu, Icon } from 'antd';
//import Icon from '@ant-design/icons';
import moment from 'moment';
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { withLocalize } from "react-localize-redux";
import './style/Leads.css'
  
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
};

const typeMenu = (data, handleMenuClick, name) => {
  return (
      <Menu onClick={handleMenuClick}>
          {data.map((d, index) => <Menu.Item data={data} name={name} key={index} id={d.id}>{d.name}</Menu.Item>)}            
      </Menu>  
  )
}

const WAIT_INTERVAL = 1500;

const Leads = props => {
    const {items, handleLeadDelete, handleLeadEdit} = props;
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

    let timer;
    const {states} = props;
    const [leadName, setLeadName] = useState('');
    const [selectedState, setSelectedState] = useState({});   

    let onChangeDebounced = () => {
      console.log(leadName);
        //props.fetchItemsByNameStatus(selectedItem, selectedType.id);
    };    

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
    }, [leadName, selectedState]); 

    return (
        <div>
          <Fragment>
            <Row style={{marginBottom: 20}}>
              <Col span={2} className="label">
                <Translate>{({ translate }) => <span>{translate("label.leadname")}</span>}</Translate>                                        
              </Col>
              <Col span={2}>
                <Input onChange={(v) => setLeadName(v.target.value)}/>
              </Col>
              <Col span={2} className="label">
                <Translate>{({ translate }) => <span>{translate("label.name")}</span>}</Translate>
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
                       key="leadsData"
                       dataSource={items} />
            </Row>
          </Fragment>
        </div>
    )
}

Leads.propTypes = {  
    items: PropTypes.array.isRequired,
    handleLeadDelete:  PropTypes.func.isRequired,
    handleLeadEdit:  PropTypes.func.isRequired
}

const mapDispatchToProps = { 
}; 

function mapStateToProps(state) {
  return {
      //selectedItem: state.common.selectedItem,
      states: []
  };
}

//export default Leads;
export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Leads));