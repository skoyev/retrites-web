import React from 'react';
import PropTypes from 'prop-types'
import { Row, Card, Icon } from 'antd';
import { chunk } from '../../helpers/';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';

const Aminity = ({items, handleAminityDetails}) => {
    let numItemsPerRow = 4;
    const itemsInRow = chunk(items, numItemsPerRow);
    return (
        <div>
            <Row style={{marginBottom: 20}}>
                <div>
                    <Translate>{({ translate }) =><button onClick={()=>handleAminityDetails({})} className="btn btn-primary">+{translate("button.item")}</button>}</Translate>                                        
                </div>
            </Row>
            {itemsInRow.map((items, index) => ( 
                <Row key={index} style={{marginBottom: 20}}>
                     {items.map((item, index) => (
                        <div key={index} style={{display: 'inline-block', marginRight: 20, maxWidth: 250}}>
                            <Card title={<a href="#" onClick={()=>handleAminityDetails(item)}>{item.name}</a>}
                                  actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="delete" />]}>
                                <p>{item.description}</p>
                            </Card>                            
                        </div>
                     ))}
                </Row>
            ))}
        </div>
    )
}

Aminity.propTypes = {    
    items: PropTypes.array.isRequired,
    handleAminityDetails: PropTypes.func.isRequired
}

const mapDispatchToProps = {    
}; 

/*
function mapStateToProps(state) {
}
*/


export default withLocalize(connect(null, mapDispatchToProps)(Aminity));