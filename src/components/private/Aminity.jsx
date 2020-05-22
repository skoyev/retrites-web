import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Row, Card, Input, Col, Menu, Dropdown, Icon } from 'antd';
//import Icon from '@ant-design/icons';
import { chunk } from '../../helpers/';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions, itemActions } from '../../store/action';
import { Loader } from '../common';
import './style/Aminity.css'
//import debounce from 'lodash.debounce';

const typeMenu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index} id={d.id}>{d.name}</Menu.Item>)}            
        </Menu>  
    )
}

const WAIT_INTERVAL = 1500;

const Aminity = props => {

    let timer;
    const {items, handleAminityDetails, handleAminityDelete, numItemsPerRow} = props;

    let onChangeDebounced = () => {
        props.fetchItemsByNameStatus(selectedItem, selectedType.id);
    };
                      
    useEffect(()=> {
        props.fetchItemTypes();
        //this.props.onRef(this);   
    }, []);

    const [selectedItem, setSelectedItem] = useState('');
    const [selectedType, setSelectedType] = useState({});   

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
    }, [selectedItem, selectedType]);    

    const itemsInRow = chunk(items, numItemsPerRow);
    const {types, isLoading} = props;

    return (
        <React.Fragment>
            <Row className="search-row">
                <Row>
                    <Col span={2} className="label">
                        <Translate>{({ translate }) => <span>{translate("label.name")}</span>}</Translate>                                        
                    </Col>
                    <Col span={4}>                        
                        <Input onChange={(v) => setSelectedItem(v.target.value)}/>
                    </Col>
                    <Col span={2} className="label">
                        <Translate>{({ translate }) => <span>{translate("label.type")}</span>}</Translate>                                        
                    </Col>
                    <Col span={4} span={4}>                        
                        <Dropdown.Button id="type" overlay={typeMenu(types, (v) => setSelectedType(v.item.props.data[v.key]))}>
                            <span>{selectedType.name}</span>
                        </Dropdown.Button>
                    </Col>
                    <Col span={4}>
                        <Translate>{({ translate }) =><button onClick={()=>handleAminityDetails(props.selectedItem)} className="btn btn-primary">{translate("button.item")}</button>}</Translate>                                        
                    </Col>                    
                </Row>
            </Row>
            {itemsInRow.map((items, index) => ( 
                <Row key={index} style={{marginBottom: 20}}>
                     {items.map((item, index) => (
                        <div key={`row-${index}`} style={{display: 'inline-block', marginRight: 20, maxWidth: 250, minWidth: 135}}>
                            <Card title={<a href="#" onClick={()=>handleAminityDetails(item)}>{item.name}</a>}
                                  actions={[<Icon type="setting" />, <Icon onClick={()=>handleAminityDetails(item)} type="edit" />, <Icon onClick={()=>handleAminityDelete(item)} type="delete" />]}>
                                <p>{item.description}</p>
                            </Card>                            
                        </div>
                     ))}
                </Row>
            ))}
            {
                isLoading && <Loader text=""/>
            }
        </React.Fragment>
    )
}

Aminity.propTypes = {    
    items: PropTypes.array.isRequired,
    handleAminityDetails: PropTypes.func.isRequired,
    handleAminityDelete: PropTypes.func.isRequired,
    numItemsPerRow: PropTypes.number.isRequired
}

const mapDispatchToProps = { 
    ...commonActions,
    ...itemActions
}; 

function mapStateToProps(state) {
    return {
        selectedItem: state.common.selectedItem,
        types: state.common.itemTypes,
        isLoading: state.common.isLoading
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Aminity));