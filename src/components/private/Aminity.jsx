import React from 'react';
import PropTypes from 'prop-types'
import { Row, Layout, Menu, Icon, Breadcrumb, Card } from 'antd';

const Aminity = ({}) => {

    return (
        <div>
            <Row>
                <Card size="small" title="Small size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>            
            </Row>
        </div>
    )
}

Aminity.propTypes = {    
}

export default Aminity;