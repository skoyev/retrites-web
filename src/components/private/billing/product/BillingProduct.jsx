import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { Radio } from 'antd';
//import Icon from '@ant-design/icons';
import { withLocalize } from "react-localize-redux";
import { Translate } from "react-localize-redux";
import { connect } from 'react-redux';
import { commonActions } from '../../../../store/action';
import './index.css'

const BillingProduct = props => {

    useEffect(()=> {
        props.fetchBillingProducts();
    }, []);

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const [selectedProduct, setSelectedProduct] = useState(0);

    return (
        <React.Fragment>
            {
                props.products
                    &&
                <Radio.Group onChange={(e) => {
                    setSelectedProduct(e.target.value);
                    props.setBillingProduct(e.target.value);
                }} value={selectedProduct}>
                    {
                        props.products.map(prd => 
                            <Radio key={prd.priceSysId} style={radioStyle} value={prd.priceSysId}>{prd.name} - {`${prd.price} ${prd.currency}`}</Radio>    
                        )
                    }
                </Radio.Group>
            }
        </React.Fragment>
    )
}

const mapDispatchToProps = { 
    ...commonActions
}; 

function mapStateToProps(state) {
    return {
        isLoading: state.common.isLoading,
        products: state.common.billingProducts
    };
}

export default withLocalize(connect(mapStateToProps, mapDispatchToProps)(BillingProduct));