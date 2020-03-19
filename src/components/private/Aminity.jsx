import React from 'react';
import PropTypes from 'prop-types'
import { Row, Card, Icon } from 'antd';
import { chunk } from '../../helpers/';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions } from '../../store/action';

const Aminity = ({items, handleAminityDetails, handleAminityDelete, numItemsPerRow, selectedItem}) => {
    const itemsInRow = chunk(items, numItemsPerRow);
    return (
        <React.Fragment>
            <Row style={{marginBottom: 20}}>
                <div>
                    <Translate>{({ translate }) =><button onClick={()=>handleAminityDetails(selectedItem)} className="btn btn-primary">+{translate("button.item")}</button>}</Translate>                                        
                </div>
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
    ...commonActions   
}; 

function mapStateToProps(state) {
    return {
        selectedItem: state.common.selectedItem
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(Aminity));