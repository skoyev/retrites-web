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
import moment from 'moment';

const typeMenu = (data, handleMenuClick, name) => {
    return (
        <Menu onClick={handleMenuClick}>
            {data.map((d, index) => <Menu.Item data={data} name={name} key={index} id={d.id}>{d.name}</Menu.Item>)}            
        </Menu>  
    )
}

const WAIT_INTERVAL = 1500;

const Aminity = props => {
    const {types, isLoading} = props;
    let timer;
    const {items, handleAminityDetails, handleAminityDelete, numItemsPerRow} = props;
    const DEFAULT_ITEM = {accomodation: {}, document:{}, facilitators: [{}], events:[{duration:1, from: moment().format('YYYY-MM-DD'), to: moment().add(1,'days').format('YYYY-MM-DD')}]};

    let onChangeDebounced = () => {
        props.fetchItemsByNameStatus(selectedItem, selectedType.id);
    };
                      
    useEffect(()=> {
        props.fetchItemTypes();
        //this.props.onRef(this); 
    }, []);

    useEffect(()=> {
        if(types.length > 0){
            setSelectedType(types[0]);  
        }
    }, [types]);

    const [selectedItem, setSelectedItem] = useState('');
    const [selectedType, setSelectedType] = useState({});   

    useEffect(() => {
        clearTimeout(timer);
        timer = setTimeout(onChangeDebounced, WAIT_INTERVAL);
    }, [selectedItem, selectedType]);    

    const itemsInRow = chunk(items, numItemsPerRow);    

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
                        <Translate>{({ translate }) => <div style={{width:80, margin: 'auto'}}><button onClick={()=>handleAminityDetails(DEFAULT_ITEM)} className="btn btn-primary">+ {translate("button.item")} </button></div>}</Translate>                                        
                    </Col>                    
                </Row>
            </Row>
            <Row className="item-scroll">
            {itemsInRow.map((items, index) => ( 
                <Row key={index} style={{marginBottom: 20}}>
                     {items.map((item, index) => (
                        <div key={`row-${index}`} style={{display: 'inline-block', marginRight: 20, maxWidth: 250, minWidth: 245}}>
                            <Card title={<h4 className="title" href="#" onClick={()=>handleAminityDetails(item)}>{item.name}</h4>}
                                  actions={[<Icon type="setting" />, <Icon onClick={()=>handleAminityDetails(item)} type="edit" />, <Icon onClick={()=>handleAminityDelete(item)} type="delete" />]}>
                                <p>{`Price: ${item.events.find(v=>v).price} ${item.events.find(v=>v).currency}`}</p>
                                <p>{`Event From: ${moment(item.events.find(v=>v).from).format('L')}`}</p>
                                <p>{`Event To: ${moment(item.events.find(v=>v).to).format('L')}`}</p>
                                <p>{`Country: ${item.country.name}`}</p>
                            </Card>                            
                        </div>
                     ))}
                </Row>            
            ))}
            </Row>
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